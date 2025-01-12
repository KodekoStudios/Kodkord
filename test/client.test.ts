import { describe, expect, it } from "bun:test";
import { Client, GuildTextChannel, type Message, User } from "../src/index";

describe("Client", () => {
	const CLIENT = new Client({
		token: process.env.test_token as string,
		type: "Bot",
	});

	it("should fetch current user", async () => {
		const CURRENT_USER = await CLIENT.users.self();
		expect(CURRENT_USER).toBeInstanceOf(User);
		expect(CURRENT_USER.id).toBe(process.env.test_app_id as string);
	});

	it("should fetch a user by Id", async () => {
		const ID = "788869971073040454"; // Pavéz Discord Id
		const USER = await CLIENT.users.fetch(ID);
		expect(USER).toBeInstanceOf(User);
		expect(USER.id).toBe(ID);
	});

	it("should fetch a channel by Id", async () => {
		const ID = "1212603668466241576";
		const CHANNEL = await CLIENT.channels.fetch(ID);
		console.log("fetchedChannel:", CHANNEL.data);
		expect(CHANNEL).toBeInstanceOf(GuildTextChannel);
		expect(CHANNEL.id).toBe(ID);
	});

	it("should set a command", () => {
		CLIENT.commands.set({
			name: "ping",
			run: (message): void => {
				// @ts-expect-error
				message.reply("Pong!");
			},
		});

		expect(CLIENT.commands.get("ping")).toBeDefined();
	});

	it("should run a command", () => {
		CLIENT.commands.get("ping")?.run({
			content: "!ping",
			reply: (content: string): void => {
				expect(content).toBe("Pong!");
			},
		} as unknown as Message);
	});
});
