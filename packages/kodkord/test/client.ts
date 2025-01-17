import { GatewayDispatchEvents, GatewayIntentBits, type APIUser } from "discord-api-types/v10";
import { inspect } from "node:util";

import { Client, Note } from "../";

const CLIENT = new Client({
	intents: GatewayIntentBits.Guilds | GatewayIntentBits.GuildMessages,
	token: process.env.DISCORD_TOKEN!
});

CLIENT.shards.create(0);

const USER = await CLIENT.rest.get<APIUser>("/users/@me");
new Note("Client > User", inspect(USER, { depth: null })).note();

CLIENT.events.set(GatewayDispatchEvents.MessageCreate, (data) => {
	new Note("Client > MessageCreate", inspect(data, { depth: null })).note();
});

CLIENT.connect();
