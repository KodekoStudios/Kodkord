// this is no longer a part of the benchmark,
// just reuse the file to see if the client worked.

import { GatewayDispatchEvents, GatewayIntentBits, InteractionResponseType, InteractionType } from "discord-api-types/v10";
import { Method, Client, fail } from "../dist/index";
const { TOKEN } = Bun.env;

const client = new Client({
    rest: {
        authorization: `Bot ${TOKEN}` ,
        user_agent   : "Kaltsit/0.0.1",
    },
    socket: {
        intents: GatewayIntentBits.Guilds      | 
                 GatewayIntentBits.GuildMembers,
        token  : TOKEN!                        ,
        os     : "linux"                       ,
    }
});

client.events.set(GatewayDispatchEvents.InteractionCreate, async ({ type, data, id, token }) => {
    if (type !== InteractionType.ApplicationCommand) return;
    switch (data.name) {
        case "latency":
            const start = Bun.nanoseconds();
            await client.rest.request({ method: Method.GET, route: "v10/users/@me" });
            const nanos = Bun.nanoseconds() - start;

            await client.rest.request({
                method: Method.POST                                               ,
                route : `v10/interactions/${id}/${token}/callback`                   ,
                query : `{"with_response":false}`                                 ,
                body  : JSON.stringify({
                            type: InteractionResponseType.ChannelMessageWithSource,
                            data: { content: `${nanos}ns` }                       ,
                        })                                                        ,
            })//.then(p => echo("Rest", Bun.inspect(p))).catch((e) => fail("Rest", e.stack));

            client.rest.stop_scheduler();
            client.socket.disconnect();
    }
});


client.rest.start_scheduler().catch((error: Error) => fail("Rest", error.stack ?? "unknown error"));
client.socket.connect();

// const application = await client.rest.request<APIApplication>({
//     method: Method.GET,
//     route: "/applications/@me",
// });

// client.rest.request({
//     method: Method.POST,
//     route : `/applications/${application.id}/commands`,
//     body  : `{"name":"latency","description":"Gets the latency"}`,
// });