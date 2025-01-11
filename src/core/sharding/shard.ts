import { inflateSync } from "node:zlib";
import { Logger } from "@common/logger";
import { Bucket } from "@core/bucket";
import type { MakeRequired } from "@types";
import {
	type APIGatewayBotInfo,
	GatewayCloseCodes,
	GatewayDispatchEvents,
	type GatewayDispatchPayload,
	type GatewayIntentBits,
	GatewayOpcodes,
	type GatewayPresenceUpdateData,
	type GatewayReceivePayload,
	type GatewaySendPayload,
} from "discord-api-types/v10";
import { ConnectTimeout } from "./shard.timeout";

export interface IdentifyProperties {
	/**
	 * Operating system the shard runs on.
	 * @default "darwin" | "linux" | "windows"
	 */
	os: string;
	/**
	 * The "browser" where this shard is running on.
	 */
	browser: string;
	/**
	 * The device on which the shard is running.
	 */
	device: string;
}

export interface ShardHeart {
	interval: number;
	nodeInterval?: ReturnType<typeof setInterval>;
	lastAck?: number;
	lastBeat?: number;
	ack: boolean;
}

export interface ShardData {
	/** resume seq to resume connections */
	resume_seq: number | null;

	/**
	 * resume_gateway_url is the url to resume the connection
	 * @link https://discord.com/developers/docs/topics/gateway#ready-event
	 */
	resume_gateway_url?: string;

	/**
	 * session_id is the unique session id of the gateway
	 * do not mistake with the seyfert client which is named Client
	 */
	session_id?: string;
}

export interface ShardDetails {
	/** Bot token which is used to connect to Discord */
	token: string;
	/**
	 * The URL of the gateway which should be connected to.
	 * @default "wss://gateway.discord.gg"
	 */
	url?: string;
	/**
	 * The gateway version which should be used.
	 * @default 10
	 */
	version?: number;
	/**
	 * The calculated intent value of the events which the shard should receive.
	 */
	intents: GatewayIntentBits | number;
	/**
	 * Identify properties to use
	 */
	properties?: IdentifyProperties;
}

export interface ShardOptions extends ShardDetails {
	info: APIGatewayBotInfo;
	handlePayload(shardId: number, packet: GatewayDispatchPayload): unknown;
	ratelimitOptions?: {
		maxRequestsPerRateLimitTick: number;
		rateLimitResetInterval: number;
	};
	debug?: boolean;
	compress: boolean;
	presence?: GatewayPresenceUpdateData;
}

export enum ShardSocketCloseCodes {
	Shutdown = 3000,
	ZombiedConnection = 3010,
}

export const PROPERTIES = {
	os: process.platform,
	browser: "Kodcord",
	device: "Kodcord",
};

export class Shard {
	public readonly logger?: Logger;
	public data: ShardData | Partial<ShardData>;
	public connectTimeout: ConnectTimeout;
	public websocket: WebSocket | null = null;
	public heart: ShardHeart;
	public bucket: Bucket;
	public offlineSendQueue: ((_?: unknown) => void)[];
	public options: MakeRequired<ShardOptions, "properties" | "ratelimitOptions">;
	public id: number;

	public constructor(id: number, options: ShardOptions) {
		if (options.debug) {
			this.logger = new Logger({ prefix: "SHARD", from: `[Shard #${id}]` });
		}

		this.data = { resume_seq: null };
		this.connectTimeout = new ConnectTimeout();
		this.heart = { interval: 30e3, ack: true };
		this.offlineSendQueue = [];
		this.options = {
			properties: PROPERTIES,
			ratelimitOptions: {
				rateLimitResetInterval: 60_000,
				maxRequestsPerRateLimitTick: 120,
			},
			...options,
		};
		this.id = id;
		this.bucket = new Bucket(this.calculateSafeRequests());
	}

	/**
	 * Gets the calculated latency based on the last acknowledgment and heartbeat times.
	 *
	 * @returns The latency in milliseconds, or -1 if it cannot be calculated.
	 */
	public get latency(): number {
		const { lastAck, lastBeat } = this.heart;

		if (lastAck === undefined || lastBeat === undefined) {
			return -1;
		}

		return Math.max(-1, lastAck - lastBeat);
	}

	public get gatewayURL(): string {
		return this.options.info.url;
	}

	public get resumeGatewayURL(): string | undefined {
		return this.data.resume_gateway_url;
	}

	public get currentGatewayURL(): string {
		const GATEWAY_URL = new URL(this.resumeGatewayURL ?? this.options.info.url);
		GATEWAY_URL.searchParams.set("v", "10");
		return GATEWAY_URL.href;
	}

	public isWebSocketOpen(): this is { websocket: WebSocket & { readyState: 1 } } {
		return this.websocket?.readyState === 1;
	}

	public async ping(): Promise<number> {
		// ! This is horrible.
		// ! if (!this.websocket) {
		// ! 	return Promise.resolve(-1);
		// ! }
		// ! return this.websocket.ping() as unknown as Promise<number>;
		return (await this.websocket?.ping()) ?? -1;
	}

	public async connect(): Promise<void> {
		await this.connectTimeout.wait();
		if (this.isWebSocketOpen()) {
			this.logger?.debug(`[Shard #${this.id}] Attempted to connect while open`);
			return;
		}

		clearTimeout(this.heart.nodeInterval);

		this.logger?.debug(`[Shard #${this.id}] Connecting to ${this.currentGatewayURL}`);

		this.websocket = new WebSocket(this.currentGatewayURL);

		this.websocket.onmessage = ({ data }: { data: string | Buffer }): void => {
			this.handleMessage(data);
		};

		this.websocket.onclose = (event: { code: number; reason: string }): Promise<void> =>
			this.handleClosed(event);

		// @ts-expect-error
		this.websocket.onerror = (event: ErrorEvent): void => this.logger?.throw(`${event}`);

		this.websocket.onopen = (): void => {
			this.heart.ack = true;
		};
	}

	public async send<T extends GatewaySendPayload = GatewaySendPayload>(
		force: boolean,
		message: T,
	): Promise<void> {
		this.logger?.inform(
			`[Shard #${this.id}] Sending: ${GatewayOpcodes[message.op]} ${JSON.stringify(
				message.d,
				(_, value) => {
					if (typeof value === "string") {
						return value.replaceAll(this.options.token, (v) => {
							const SPLIT = v.split(".");
							return `${SPLIT[0]}.${"*".repeat(SPLIT[1].length)}.${"*".repeat(SPLIT[2].length)}`;
						});
					}
					return value;
				},
				1,
			)}`,
		);
		await this.checkOffline(force);
		this.bucket.process(force);
		await this.checkOffline(force);
		this.websocket?.send(JSON.stringify(message));
	}

	public identify(): Promise<void> {
		return this.send(true, {
			op: GatewayOpcodes.Identify,
			d: {
				token: `Bot ${this.options.token}`,
				compress: this.options.compress,
				properties: this.options.properties,
				shard: [this.id, this.options.info.shards],
				intents: this.options.intents,
				presence: this.options.presence,
			},
		});
	}

	public get resumable(): boolean {
		const { resume_gateway_url, session_id, resume_seq } = this.data;
		return Boolean(resume_gateway_url && session_id && resume_seq !== null);
	}

	public resume(): Promise<void> {
		return this.send(true, {
			op: GatewayOpcodes.Resume,
			d: {
				seq: this.data.resume_seq ?? 0,
				session_id: this.data.session_id ?? "",
				token: `Bot ${this.options.token}`,
			},
		});
	}

	public heartbeat(requested: boolean): void {
		this.logger?.debug(
			`[Shard #${this.id}] Sending ${requested ? "" : "un"}requested heartbeat (Ack=${this.heart.ack})`,
		);

		if (requested) {
			this.heart.lastBeat = Date.now();
			this.websocket?.send(
				JSON.stringify({
					op: GatewayOpcodes.Heartbeat,
					d: this.data.resume_seq ?? null,
				}),
			);

			return;
		}

		if (this.heart.ack) {
			this.heart.ack = false;
			return;
		}

		this.close(ShardSocketCloseCodes.ZombiedConnection, "Zombied connection");
	}

	public disconnect(): void {
		this.logger?.inform(`[Shard #${this.id}] Disconnecting`);
		this.close(ShardSocketCloseCodes.Shutdown, "Shard down request");
	}

	public reconnect(): Promise<void> {
		this.logger?.inform(`[Shard #${this.id}] Reconnecting`);
		this.disconnect();
		return this.connect();
	}

	public async onpacket(packet: GatewayReceivePayload): Promise<void> {
		if (packet.s !== null) {
			this.data.resume_seq = packet.s;
		}

		this.logger?.debug(packet.t ? packet.t : GatewayOpcodes[packet.op], this.data.resume_seq);

		switch (packet.op) {
			case GatewayOpcodes.Hello:
				clearInterval(this.heart.nodeInterval);

				this.heart.interval = packet.d.heartbeat_interval;

				this.heartbeat(false);
				this.heart.nodeInterval = setInterval(() => this.heartbeat(false), this.heart.interval);

				if (this.resumable) {
					return this.resume();
				}

				await this.identify();
				break;

			case GatewayOpcodes.HeartbeatAck:
				this.heart.ack = true;
				this.heart.lastAck = Date.now();
				break;

			case GatewayOpcodes.Heartbeat:
				this.heartbeat(true);
				break;

			case GatewayOpcodes.Reconnect:
				await this.reconnect();
				break;

			case GatewayOpcodes.InvalidSession:
				if (packet.d) {
					if (this.resumable) {
						await this.resume();
					} else {
						this.logger?.throw("This is a completely unexpected error message.");
					}
				} else {
					this.data.resume_seq = 0;
					this.data.session_id = undefined;
					await this.identify();
				}
				break;

			case GatewayOpcodes.Dispatch:
				switch (packet.t) {
					case GatewayDispatchEvents.Resumed:
						this.offlineSendQueue.map((resolve: () => unknown) => resolve());
						this.options.handlePayload(this.id, packet);
						break;

					case GatewayDispatchEvents.Ready:
						this.data.resume_gateway_url = packet.d.resume_gateway_url;
						this.data.session_id = packet.d.session_id;
						this.offlineSendQueue.map((resolve: () => unknown) => resolve());
						this.options.handlePayload(this.id, packet);
						break;

					default:
						this.options.handlePayload(this.id, packet);
						break;
				}
				break;
		}
	}

	protected async handleClosed(close: { code: number; reason: string }): Promise<void> {
		clearInterval(this.heart.nodeInterval);
		this.logger?.warn(
			`${ShardSocketCloseCodes[close.code] ?? GatewayCloseCodes[close.code] ?? close.code} (${close.code})`,
			close.reason,
		);

		switch (close.code) {
			case ShardSocketCloseCodes.Shutdown:
				break;

			case 1000:
			case GatewayCloseCodes.UnknownOpcode:
			case GatewayCloseCodes.InvalidSeq:
			case GatewayCloseCodes.SessionTimedOut:
				this.data.resume_seq = 0;
				this.data.session_id = undefined;
				this.data.resume_gateway_url = undefined;
				await this.reconnect();
				break;

			case 1001:
			case 1006:
			case ShardSocketCloseCodes.ZombiedConnection:
			case GatewayCloseCodes.UnknownError:
			case GatewayCloseCodes.DecodeError:
			case GatewayCloseCodes.NotAuthenticated:
			case GatewayCloseCodes.AlreadyAuthenticated:
			case GatewayCloseCodes.RateLimited:
				this.logger?.inform("Trying to reconnect");
				await this.reconnect();
				break;

			case GatewayCloseCodes.AuthenticationFailed:
			case GatewayCloseCodes.DisallowedIntents:
			case GatewayCloseCodes.InvalidAPIVersion:
			case GatewayCloseCodes.InvalidIntents:
			case GatewayCloseCodes.InvalidShard:
			case GatewayCloseCodes.ShardingRequired:
				this.logger?.throw("Cannot reconnect");
				break;

			default:
				this.logger?.warn("Unknown close code, trying to reconnect anyways");
				await this.reconnect();
				break;
		}
	}

	public close(code: number, reason: string): void {
		clearInterval(this.heart.nodeInterval);
		if (this.isWebSocketOpen()) {
			this.logger?.debug(`[Shard #${this.id}] Called close with reason:`, reason);
			this.websocket.close(code, reason);
			return;
		}

		this.logger?.warn(`[Shard #${this.id}] Is not open, reason:`, reason);
		return;
	}

	protected handleMessage(data: string | Buffer): Promise<void> | void {
		let packet: GatewayDispatchPayload;

		if (data instanceof Buffer) {
			try {
				// biome-ignore lint/style/noParameterAssign: shut up.
				data = inflateSync(data);
			} catch (e) {
				this.logger?.throw("Failed to inflate data", e);
				return; // Unreachable
			}
		}

		try {
			packet = JSON.parse(data as string);
		} catch (e) {
			this.logger?.throw("Failed to parse data", e);
			return; // Unreachable
		}

		return this.onpacket(packet);
	}

	public checkOffline(force: boolean): Promise<unknown> {
		if (this.isWebSocketOpen()) {
			return Promise.resolve();
		}
		return new Promise((resolve) => this.offlineSendQueue[force ? "unshift" : "push"](resolve));
	}

	public calculateSafeRequests(): number {
		const SAFE_REQUESTS =
			this.options.ratelimitOptions.maxRequestsPerRateLimitTick -
			Math.ceil(this.options.ratelimitOptions.rateLimitResetInterval / this.heart.interval) * 2;

		// ? For cases like this, use Math.max();
		// ? if (SAFE_REQUESTS < 0) {
		// ? 	return 0;
		// ? }

		return Math.max(0, SAFE_REQUESTS);
	}
}
