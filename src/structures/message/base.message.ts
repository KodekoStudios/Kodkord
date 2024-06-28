import { Base } from "@structures/base";
import type { APIMessage, APIUser } from "discord-api-types/v10";

export abstract class BaseMessage<T extends APIMessage> extends Base<T> {
	public get content(): string {
		return this.data.content;
	}

	public get author(): APIUser {
		return this.data.author;
	}

	public get channelId(): string {
		return this.data.channel_id;
	}
}
