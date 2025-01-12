import { Client, GatewayIntentBits, Logger } from "../src/index";
import { inspect } from "node:util";

const LOGGER = new Logger({ from: "CLIENT" });

const CLIENT = new Client({
	token: process.env.test_token as string,
	type: "Bot",
	defaultPrefix: ["k!"],
	intents:
		GatewayIntentBits.Guilds | GatewayIntentBits.GuildMessages | GatewayIntentBits.MessageContent,
});

CLIENT.commands.set({
	name: "ping",
	run(message): void {
		message.reply({
			content: "Pong!",
		});
	},
});

CLIENT.events.set("MESSAGE_CREATE", (message, _) => {
	LOGGER.debug("Message Receive:", inspect(message, { depth: 1 }));
});

await CLIENT.connect();
console.log(CLIENT.ws.keys());
