import { parentPort, workerData } from "node:worker_threads";
import { Logger } from "@common/logger";
import { calculateShardId } from "@common/utils";
import { Bucket } from "@core/bucket";
import type { MakeRequired } from "@types";
import {
	type GatewayDispatchPayload,
	GatewayOpcodes,
	type GatewaySendPayload,
	type GatewayUpdatePresence,
	type GatewayVoiceStateUpdate,
} from "discord-api-types/v10";
import { PROPERTIES, Shard } from "./shard";
import { ConnectQueue } from "./shard.timeout";
import type { ShardData, ShardManagerOptions } from "./types";

const SHARD_MANAGER_DEFAULTS = {
	totalShards: 1,
	spawnShardDelay: 5300,
	debug: false,
	intents: 0,
	properties: PROPERTIES,
	version: 10,
	shardStart: 0,
	resharding: {
		interval: 8 * 60 * 60 * 1e3, // 8h
		percentage: 80,
	},
};

export class ShardManager extends Map<number, Shard> {
	protected connectQueue: ConnectQueue;
	public options: MakeRequired<ShardManagerOptions, keyof typeof SHARD_MANAGER_DEFAULTS>;
	public readonly debugger?: Logger;

	public constructor(options: ShardManagerOptions) {
		super();

		this.options = {
			...SHARD_MANAGER_DEFAULTS,
			totalShards: options.info.shards,
			...options,
		};

		this.connectQueue = new ConnectQueue(5.5e3, this.concurrency);

		if (this.options.debug) {
			this.debugger = new Logger({
				prefix: "SHARD MANAGER",
			});
		}
	}

	public get totalShards(): number {
		return this.options.totalShards ?? this.options.info.shards;
	}

	public get shardStart(): number {
		return this.options.shardStart ?? 0;
	}

	public get shardEnd(): number {
		return this.options.shardEnd ?? this.totalShards;
	}

	public get remaining(): number {
		return this.options.info.session_start_limit.remaining;
	}

	public get concurrency(): number {
		return this.options.info.session_start_limit.max_concurrency;
	}

	public get latency(): number {
		let acc = 0;

		for (const SHARD of this.values()) {
			acc += SHARD.latency;
		}

		return acc / this.size;
	}

	public calculateShardId(guildId: string): number {
		return calculateShardId(guildId, this.totalShards);
	}

	public create(shardId: number): Shard {
		this.debugger?.inform(`Creating shard ${shardId}`);
		let shard = this.get(shardId);

		shard ??= new Shard(shardId, {
			token: this.options.token,
			intents: this.options.intents,
			info: { ...this.options.info, shards: this.totalShards },
			handlePayload: this.options.handlePayload,
			properties: this.options.properties,
			compress: this.options.compress ?? false,
			presence: this.options.presence?.(shardId, -1),
		});

		this.set(shardId, shard);

		return shard;
	}

	public spawnBuckets(): Shard[][] {
		this.debugger?.inform("#0 Preparing buckets");
		const CHUNKS = Bucket.chunk(new Array(this.shardEnd - this.shardStart), this.concurrency);
		CHUNKS.forEach((arr: unknown[], index: number) => {
			for (let i = 0; i < arr.length; i++) {
				const ID = i + (index > 0 ? index * this.concurrency : 0) + this.shardStart;
				CHUNKS[index][i] = this.create(ID);
			}
		});
		this.debugger?.inform(`${CHUNKS.length} buckets created`);

		return CHUNKS;
	}

	public async spawnShards(): Promise<void> {
		const BUCKETS = this.spawnBuckets();

		this.debugger?.inform("Spawning shards");
		for (const BUCKET of BUCKETS) {
			for (const SHARD of BUCKET) {
				if (!SHARD) {
					break;
				}
				this.debugger?.inform(`${SHARD.id} add to connect queue`);
				this.connectQueue.push(SHARD.connect.bind(SHARD));
			}
		}
		await this.startResharder();
	}

	public async startResharder(): Promise<void> {
		if (this.options.resharding.interval <= 0) {
			return;
		}
		if (this.shardStart !== 0 || this.shardEnd !== this.totalShards) {
			return this.debugger?.debug("Cannot start resharder");
		}

		this.debugger?.debug("Resharder enabled");
		setInterval(async () => {
			this.debugger?.debug("Checking if reshard is needed");
			// @ts-expect-error fuck you
			const INFO = await this.options.resharding.getInfo();
			if (INFO.shards <= this.totalShards) {
				return this.debugger?.debug("Resharding not needed");
			}
			// https://github.com/discordeno/discordeno/blob/6a5f446c0651b9fad9f1550ff1857fe7a026426b/packages/gateway/src/manager.ts#L106C8-L106C94
			const PERCENTAGE = (INFO.shards / ((this.totalShards * 2500) / 1000)) * 100;
			if (PERCENTAGE < this.options.resharding.percentage) {
				return this.debugger?.debug(
					`Percentage is not enough to reshard ${PERCENTAGE}/${this.options.resharding.percentage}`,
				);
			}

			this.debugger?.inform("Starting resharding process");

			this.connectQueue.concurrency = INFO.session_start_limit.max_concurrency;
			this.options.info.session_start_limit.max_concurrency =
				INFO.session_start_limit.max_concurrency;

			let shards_connected = 0;
			const HANDLE_GUILDS = new Set<string>();

			let handle_payload = (
				sharder: ShardManager,
				_: number,
				packet: GatewayDispatchPayload,
				// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Yeah... this is complex :3
			): undefined | undefined => {
				if (packet.t === "GUILD_CREATE" || packet.t === "GUILD_DELETE") {
					HANDLE_GUILDS.delete(packet.d.id);
					if (shards_connected === INFO.shards && HANDLE_GUILDS.size === 0) {
						return CLEAN_PROCESS(sharder);
					}
				}

				if (packet.t !== "READY") {
					return;
				}

				for (const GUILD of packet.d.guilds) {
					HANDLE_GUILDS.add(GUILD.id);
				}

				if (++shards_connected < INFO.shards || HANDLE_GUILDS.size > 0) {
					return;
				}

				CLEAN_PROCESS(sharder);
			};

			const CLEAN_PROCESS = (sharder: ShardManager): void => {
				handle_payload = (): void => {
					// //
				};
				this.disconnectAll();
				this.clear();

				this.options.totalShards = this.options.shardEnd = INFO.shards;
				for (const [ID, SHARD] of sharder) {
					SHARD.options.handlePayload = (shardId, packet): unknown => {
						return this.options.handlePayload(shardId, packet);
					};
					this.set(ID, SHARD);
				}

				sharder.clear();
			};

			const OPTIONS = {
				...this.options,
				totalShards: INFO.shards,
				shardEnd: INFO.shards,
			} satisfies ShardManagerOptions;

			const RESHARDER = new ShardManager({
				...OPTIONS,
				resharding: {
					interval: 0,
					percentage: 0,
				},
				handlePayload: (shardId, packet): unknown => {
					return handle_payload(RESHARDER, shardId, packet);
				},
			});

			RESHARDER.connectQueue = this.connectQueue;

			await RESHARDER.spawnShards();
		}, this.options.resharding.interval);
	}

	public forceIdentify(shardId: number): Promise<void> {
		this.debugger?.inform(`Shard #${shardId} force identify`);
		return this.create(shardId).identify();
	}

	public disconnect(shardId: number): Promise<void> | undefined {
		this.debugger?.inform(`Shard #${shardId} force disconnect`);
		return this.get(shardId)?.disconnect();
	}

	public disconnectAll(): void {
		this.debugger?.inform("Disconnect all shards");
		for (const SHARD of this.values()) {
			SHARD.disconnect();
		}
	}

	public setShardPresence(
		shardId: number,
		payload: GatewayUpdatePresence["d"],
	): undefined | undefined {
		this.debugger?.inform(`Shard #${shardId} update presence`);
		return this.send<GatewayUpdatePresence>(shardId, {
			op: GatewayOpcodes.PresenceUpdate,
			d: payload,
		});
	}

	public setPresence(payload: GatewayUpdatePresence["d"]): void {
		for (const SHARD of this.values()) {
			this.setShardPresence(SHARD.id, payload);
		}
	}

	public joinVoice(
		guildId: string,
		channelId: string,
		options: Pick<GatewayVoiceStateUpdate["d"], "self_deaf" | "self_mute">,
	): undefined | undefined {
		const SHARD_ID = this.calculateShardId(guildId);
		this.debugger?.inform(`Shard #${SHARD_ID} join voice ${channelId} in ${guildId}`);

		return this.send<GatewayVoiceStateUpdate>(SHARD_ID, {
			op: GatewayOpcodes.VoiceStateUpdate,
			d: {
				guild_id: guildId,
				channel_id: channelId,
				...options,
			},
		});
	}

	public leaveVoice(guildId: string): undefined | undefined {
		const SHARD_ID = this.calculateShardId(guildId);

		return this.send<GatewayVoiceStateUpdate>(SHARD_ID, {
			op: GatewayOpcodes.VoiceStateUpdate,
			d: {
				guild_id: guildId,
				channel_id: null,
				self_mute: false,
				self_deaf: false,
			},
		});
	}

	public send<T extends GatewaySendPayload>(shardId: number, payload: T): undefined | undefined {
		if (workerData?.__USING_WATCHER__) {
			return parentPort?.postMessage({
				type: "SEND_TO_SHARD",
				shardId,
				payload,
			});
		}
		this.get(shardId)?.send(false, payload);
	}

	public resume(shardId: number, shardData: ShardData): unknown {
		if (this.has(shardId)) {
			throw new Error("Cannot override existing shard");
		}
		const SHARD = this.create(shardId);
		SHARD.data = shardData;
		return this.connectQueue.push(SHARD.connect.bind(SHARD));
	}
}
