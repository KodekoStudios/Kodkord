import {
  GatewayDispatchEvents, GatewayIntentBits, Routes, type APIUser
} from "discord-api-types/v10";
import { Client, Note } from "kodkord";
import { inspect } from "node:util";

const CLIENT = new Client({
	intents: GatewayIntentBits.Guilds | GatewayIntentBits.GuildMessages,
	token: process.env.DISCORD_TOKEN as string
});

CLIENT.shards.create(0);

const USER = await CLIENT.rest.get<APIUser>("/users/@me");
new Note("Client > User", inspect(USER, { depth: null })).note();

CLIENT.events.set(GatewayDispatchEvents.InteractionCreate, async (data) => {
	if (data.type === 2) {
		switch (data.data.name) {
			case 'ping': await CLIENT.rest.post(
				Routes.interactionCallback(data.id, data.token),
				{
					body: {
						content: "Pong!"
					},
					query: {
						with_response: "true"
					}
				}
			); break;
		}
	}
});

CLIENT.events.set(GatewayDispatchEvents.MessageCreate, async (data) => {
	if(data.author.bot) return;
	switch (data.content.toLowerCase()) {
		case "ping": await CLIENT.rest.post(Routes.channelMessages(data.channel_id), {
			body: {
				content: "Pong!"
			}
		})
  }
});

CLIENT.connect();
