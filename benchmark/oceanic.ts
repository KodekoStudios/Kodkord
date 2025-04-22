import { type Client, RESTManager } from "oceanic.js";

const rest = new RESTManager({ emit: () => { } } as unknown as Client);
const promises = [];

for (let i = 0; i < 10; i++) {
    promises.push(
        rest.request({
            method: "GET",
            path: "/users/@me",
            auth: `Bot ${Bun.env.TOKEN}`
        })
    );
}

for (let i = 0; i < 10; i++) {
    promises.push(
        rest.request({
            method: "GET",
            path: "/users/788869971073040454",
            auth: `Bot ${Bun.env.TOKEN}`
        })
    );
}

await Promise.all(promises);

