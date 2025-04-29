import { Client, GatewayIntentBits, InteractionType } from "discord.js";

const client = new Client({
    intents: GatewayIntentBits.Guilds      |
             GatewayIntentBits.GuildMembers,
});

client.on("interactionCreate", async (i) => {
    if (i.type !== InteractionType.ApplicationCommand) return;
    switch (i.commandName) {
        case "latency":
            const start = Bun.nanoseconds();
            await client.rest.get("/users/@me");
            const nanos = Bun.nanoseconds() - start;

            await i.reply({ content: `${nanos}ns`, withResponse: false });
            await client.destroy();
            break;
    }
});

client.login(Bun.env.TOKEN!);