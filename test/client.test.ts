import { describe, expect, it } from "bun:test";
import { User } from "../src/structures/user/user";
import { Client } from "../src/core/client";

describe("Client", () => {
	const client = new Client({
		token: process.env.test_token ?? '', // Your bot token
		type: "Bot",
	});

	it("should fetch current user", async () => {
		const currentUser = await client.users.self();
		expect(currentUser).toBeInstanceOf(User);
		expect(currentUser.id).toBe(process.env.test_app_id);
	});

	it("should fetch a user by Id", async () => {
		const userId = "788869971073040454"; // Pavéz Discord Id
		const fetchedUser = await client.users.fetch(userId);
		expect(fetchedUser).toBeInstanceOf(User);
		expect(fetchedUser.id).toBe(userId);
	});
});
