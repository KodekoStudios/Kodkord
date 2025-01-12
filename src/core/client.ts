import { Rest, type RestSettings } from "@api/rest";
import { Dictionary } from "@common/dictionary";
import type { GatewayDispatchEvents, GatewayDispatchPayload } from "discord-api-types/v10";
import { Sharder } from "./sharder";

export type ClientSettings = RestSettings & { intents: number };
export type Events = Dictionary<GatewayDispatchEvents, (d: GatewayDispatchPayload["d"]) => unknown>;

export class Client {
	public readonly settings: ClientSettings;
	public readonly shards: Sharder;
	public readonly events: Events;
	public readonly rest: Rest;

	public constructor(settings: ClientSettings) {
		this.settings = settings;
		this.shards = new Sharder(this);
		this.events = new Dictionary();
		this.rest = new Rest(settings);
	}

	public connect(): void {
		this.shards.connect();
	}
}
