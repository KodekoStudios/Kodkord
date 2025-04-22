import { Method, Rest } from "../native";

const rest = new Rest({
    authorization: `Bot ${Bun.env.TOKEN}`,
    user_agent: "Kodkord Benchmarking",
});
const promises = [];

// Avoid await if scheduler must start non-blocking
rest.start_scheduler().catch(e => console.log(e));

// Ultra realistic request workload
for (let i = 0; i < 10; i++) {
    promises.push(
        rest.request({
            method: Method.GET,
            route: "/users/@me",
        })
    );
}
for (let i = 0; i < 10; i++) {
    promises.push(
        rest.request({
            method: Method.GET,
            route: "/users/788869971073040454",
        })
    );
}

await Promise.all(promises);
await rest.stop_scheduler();
