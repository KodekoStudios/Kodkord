import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);
const promises = [];

for (let i = 0; i < 10; i++) {
    promises.push(rest.get(Routes.user("@me")));
}

for (let i = 0; i < 10; i++) {
    promises.push(rest.get(Routes.user("788869971073040454")));
}

await Promise.all(promises);