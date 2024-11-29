import { describe, expect, it } from "bun:test";
import { Client } from "../src/core/client";
import { GuildTextChannel } from "../src/structures/channel/guild/text.channel";
import { User } from "../src/structures/user/user";

describe("Client", () => {
	const client = new Client({
		token: process.env.test_token ?? "", // Your bot token
		type: "Bot",
	});

	it("should fetch current user", async () => {
		const currentUser = await client.users.self();
		expect(currentUser).toBeInstanceOf(User);
		expect(currentUser.id).toBe(process.env.test_app_id);
	});

	it("should fetch a user by Id", async () => {
		const userId = "788869971073040454"; // Pavéz Discord Id
		const fetchedUser = await client.users.fetch(userId);
		expect(fetchedUser).toBeInstanceOf(User);
		expect(fetchedUser.id).toBe(userId);
	});

	it("should fetch a channel by Id", async () => {
		const channelId = "1212603668466241576";
		const fetchedChannel = await client.channels.fetch(channelId);
		console.log("fetchedChannel:", fetchedChannel.data);
		expect(fetchedChannel).toBeInstanceOf(GuildTextChannel);
		expect(fetchedChannel.id).toBe(channelId);
	});

	it("should set a command", () => {
		client.commands.set({
			name: "ping",
			execute: (message) => {
				message.reply("Pong!");
			},
		});
		expect(client.commands.storage.get("ping")).toBeDefined();
	});

	it("should execute a command", () => {
		const message = {
			content: "!ping",
			reply: (content: string) => {
				expect(content).toBe("Pong!");
			},
		};
		client.commands.storage.get("ping")?.execute(message);
	});
});
