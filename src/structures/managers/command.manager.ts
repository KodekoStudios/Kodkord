import type { Dictionary } from "@common/dictionary";
import type { Client } from "@core/client";
import { Message } from "@structures/message/message";
import type { GatewayMessageCreateDispatchData } from "discord-api-types/v10";
import { BaseManager } from "./base.manager";

export class CommandManager extends BaseManager<unknown> {
	public declare store: Dictionary<string, unknown>;

	constructor(client: Client) {
		super(client, "command manager");
	}

	async message(rawMessage: GatewayMessageCreateDispatchData) {
		const client = this.client;

		const message = new Message(rawMessage, this.client);

		const prefixes = client.options.defaultPrefix ?? [];
		if (client.options.handlers?.prefix)
			prefixes.push(...(await client.options.handlers.prefix(message)));

		const sorted_prefixes = prefixes.sort((a, b) => b.length - a.length);
		const prefix = sorted_prefixes.find((x) => rawMessage.content.startsWith(x));

		if (!(prefix !== undefined && rawMessage.content.startsWith(prefix))) return;

		const content = rawMessage.content.slice(prefix.length).trimStart();

		this.logger.info("Command Detected.\n", `Content: ${content}\n`, `Prefix: ${prefix}`);
	}
}
