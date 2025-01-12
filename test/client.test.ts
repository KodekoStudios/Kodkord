import { describe, expect, it } from "bun:test";
import { Client, GatewayIntentBits, GuildTextChannel, User } from "../src/index";

describe("Client", () => {
	const CLIENT = new Client({
		token: process.env.test_token as string,
		type: "Bot",
		defaultPrefix: ["k!"],
		intents:
			GatewayIntentBits.Guilds | GatewayIntentBits.GuildMessages | GatewayIntentBits.MessageContent,
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
		const ID = "913243741710594048";
		const CHANNEL = await CLIENT.channels.fetch(ID);
		console.log("Fetched Channel:", CHANNEL.data);
		expect(CHANNEL).toBeInstanceOf(GuildTextChannel);
		expect(CHANNEL.id).toBe(ID);
	});

	it("should set a command", () => {
		CLIENT.commands.set({
			name: "reply",
			run: async (message): Promise<void> => {
				const RES = await message.reply({
					content: "Testing!",
				});
				console.log(RES.data);
			},
		});

		expect(CLIENT.commands.get("ping")).toBeDefined();
	});

	it("should run a command", async () => {
		const MESSAGE = await CLIENT.messages.fetch("913243741710594048", "1327754552757452910");
		CLIENT.commands.get("reply")?.run(MESSAGE);
	});
});
