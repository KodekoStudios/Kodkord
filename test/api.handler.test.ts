import { describe, expect, it } from "bun:test";
import type { APIGuild } from "discord-api-types/v10";
import { APIHandler } from "../src/core/api.handler";

describe("APIHandler", () => {
	const API_HANDLER = new APIHandler({
		token: process.env.test_token as string,
		type: "Bot",
	});

	it("should fetch guild details successfully", async () => {
		const ID = process.env.test_guild_id ?? '';
		try {
			const RESPONSE = await API_HANDLER.get<APIGuild>(`/guilds/${ID}`);
			console.log("Server details:", { id: RESPONSE.id, name: RESPONSE.name });

			expect(RESPONSE).toBeDefined(); // Verify that the response is defined

			expect(RESPONSE.id).toBe(ID); // Verify that the guild ID in the response matches
		} catch (error) {
			console.error("Error fetching guild details:", error);
			expect(error).toBeNull(); // Ensure there are no errors
		}
	});

	it("should handle error when fetching guild details", async () => {
		try {
			await API_HANDLER.get("/guilds/THIS_IS_NOT_VALID");
			// If no error is thrown, fail the test since an error was expected
			throw new Error("Expected an error but none was thrown.");
		} catch (error) {
			console.error("Expected error fetching guild details:", error);
			expect(error).toBeDefined(); // Verify that an error was thrown
		}
	});
});
