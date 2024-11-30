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
import { Shard, properties } from "./shard";
import { ConnectQueue } from "./shard.timeout";
import type { ShardData, ShardManagerOptions } from "./types";

const ShardManagerDefaults = {
	totalShards: 1,
	spawnShardDelay: 5300,
	debug: false,
	intents: 0,
	properties,
	version: 10,
	shardStart: 0,
	resharding: {
		interval: 8 * 60 * 60 * 1e3, // 8h
		percentage: 80,
	},
};

export class ShardManager extends Map<number, Shard> {
	connectQueue: ConnectQueue;
	options: MakeRequired<ShardManagerOptions, keyof typeof ShardManagerDefaults>;
	debugger?: Logger;

	constructor(options: ShardManagerOptions) {
		super();

		this.options = {
			...ShardManagerDefaults,
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

	get totalShards() {
		return this.options.totalShards ?? this.options.info.shards;
	}

	get shardStart() {
		return this.options.shardStart ?? 0;
	}

	get shardEnd() {
		return this.options.shardEnd ?? this.totalShards;
	}

	get remaining() {
		return this.options.info.session_start_limit.remaining;
	}

	get concurrency() {
		return this.options.info.session_start_limit.max_concurrency;
	}

	get latency() {
		let acc = 0;

		for (const shard of this.values()) {
			acc += shard.latency;
		}

		return acc / this.size;
	}

	calculateShardId(guildId: string) {
		return calculateShardId(guildId, this.totalShards);
	}

	create(shardId: number) {
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

	spawnBuckets(): Shard[][] {
		this.debugger?.inform("#0 Preparing buckets");
		const chunks = Bucket.chunk(new Array(this.shardEnd - this.shardStart), this.concurrency);
		chunks.forEach((arr: unknown[], index: number) => {
			for (let i = 0; i < arr.length; i++) {
				const id = i + (index > 0 ? index * this.concurrency : 0) + this.shardStart;
				chunks[index][i] = this.create(id);
			}
		});
		this.debugger?.inform(`${chunks.length} buckets created`);

		return chunks;
	}

	async spawnShards(): Promise<void> {
		const buckets = this.spawnBuckets();

		this.debugger?.inform("Spawning shards");
		for (const bucket of buckets) {
			for (const shard of bucket) {
				if (!shard) {
					break;
				}
				this.debugger?.inform(`${shard.id} add to connect queue`);
				this.connectQueue.push(shard.connect.bind(shard));
			}
		}
		await this.startResharder();
	}

	async startResharder() {
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
			const info = await this.options.resharding.getInfo();
			if (info.shards <= this.totalShards) {
				return this.debugger?.debug("Resharding not needed");
			}
			// https://github.com/discordeno/discordeno/blob/6a5f446c0651b9fad9f1550ff1857fe7a026426b/packages/gateway/src/manager.ts#L106C8-L106C94
			const percentage = (info.shards / ((this.totalShards * 2500) / 1000)) * 100;
			if (percentage < this.options.resharding.percentage) {
				return this.debugger?.debug(
					`Percentage is not enough to reshard ${percentage}/${this.options.resharding.percentage}`,
				);
			}

			this.debugger?.inform("Starting resharding process");

			this.connectQueue.concurrency = info.session_start_limit.max_concurrency;
			this.options.info.session_start_limit.max_concurrency =
				info.session_start_limit.max_concurrency;

			let shardsConnected = 0;
			const handleGuilds = new Set<string>();

			let handlePayload = async (
				sharder: ShardManager,
				_: number,
				packet: GatewayDispatchPayload,
				// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Yeah... this is complex :3
			) => {
				if (packet.t === "GUILD_CREATE" || packet.t === "GUILD_DELETE") {
					handleGuilds.delete(packet.d.id);
					if (shardsConnected === info.shards && !handleGuilds.size) {
						return cleanProcess(sharder);
					}
				}

				if (packet.t !== "READY") {
					return;
				}

				for (const guild of packet.d.guilds) {
					handleGuilds.add(guild.id);
				}

				if (++shardsConnected < info.shards || handleGuilds.size) {
					return;
				}

				cleanProcess(sharder);
			};

			const cleanProcess = (sharder: ShardManager) => {
				handlePayload = async () => {
					// //
				};
				this.disconnectAll();
				this.clear();

				this.options.totalShards = this.options.shardEnd = info.shards;
				for (const [id, shard] of sharder) {
					shard.options.handlePayload = (shardId, packet) => {
						return this.options.handlePayload(shardId, packet);
					};
					this.set(id, shard);
				}

				sharder.clear();
			};

			const options = {
				...this.options,
				totalShards: info.shards,
				shardEnd: info.shards,
			} satisfies ShardManagerOptions;

			const resharder = new ShardManager({
				...options,
				resharding: {
					interval: 0,
					percentage: 0,
				},
				handlePayload: (shardId, packet): unknown => {
					return handlePayload(resharder, shardId, packet);
				},
			});

			resharder.connectQueue = this.connectQueue;

			await resharder.spawnShards();
		}, this.options.resharding.interval);
	}

	forceIdentify(shardId: number) {
		this.debugger?.inform(`Shard #${shardId} force identify`);
		return this.create(shardId).identify();
	}

	disconnect(shardId: number) {
		this.debugger?.inform(`Shard #${shardId} force disconnect`);
		return this.get(shardId)?.disconnect();
	}

	disconnectAll() {
		this.debugger?.inform("Disconnect all shards");
		for (const shard of this.values()) {
			shard.disconnect();
		}
	}

	setShardPresence(shardId: number, payload: GatewayUpdatePresence["d"]) {
		this.debugger?.inform(`Shard #${shardId} update presence`);
		return this.send<GatewayUpdatePresence>(shardId, {
			op: GatewayOpcodes.PresenceUpdate,
			d: payload,
		});
	}

	setPresence(payload: GatewayUpdatePresence["d"]) {
		for (const shard of this.values()) {
			this.setShardPresence(shard.id, payload);
		}
	}

	joinVoice(
		guild_id: string,
		channel_id: string,
		options: Pick<GatewayVoiceStateUpdate["d"], "self_deaf" | "self_mute">,
	) {
		const shardId = this.calculateShardId(guild_id);
		this.debugger?.inform(`Shard #${shardId} join voice ${channel_id} in ${guild_id}`);

		return this.send<GatewayVoiceStateUpdate>(shardId, {
			op: GatewayOpcodes.VoiceStateUpdate,
			d: {
				guild_id,
				channel_id,
				...options,
			},
		});
	}

	leaveVoice(guild_id: string) {
		const shardId = this.calculateShardId(guild_id);

		return this.send<GatewayVoiceStateUpdate>(shardId, {
			op: GatewayOpcodes.VoiceStateUpdate,
			d: {
				guild_id,
				channel_id: null,
				self_mute: false,
				self_deaf: false,
			},
		});
	}

	send<T extends GatewaySendPayload>(shardId: number, payload: T) {
		if (workerData?.__USING_WATCHER__) {
			return parentPort?.postMessage({
				type: "SEND_TO_SHARD",
				shardId,
				payload,
			});
		}
		this.get(shardId)?.send(false, payload);
	}

	resume(shardId: number, shardData: ShardData) {
		if (this.has(shardId)) {
			throw new Error("Cannot override existing shard");
		}
		const shard = this.create(shardId);
		shard.data = shardData;
		return this.connectQueue.push(shard.connect.bind(shard));
	}
}
