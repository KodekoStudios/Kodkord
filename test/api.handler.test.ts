import type { APIGuild } from "discord-api-types/v10";
import { APIHandler } from "../src/core/api.handler";
import { describe, expect, it } from "bun:test";

describe("APIHandler", () => {
	const apiHandler = new APIHandler({
		token: "your_discord_token_here",
		type: "Bot",
	});

	it("should fetch guild details successfully", async () => {
		const guildId = "your_guild_id_here";
		try {
			const response = await apiHandler.get<APIGuild>(`/guilds/${guildId}`);
			console.log("Server details:", { id: response.id, name: response.name });

			expect(response).toBeDefined(); // Verify that the response is defined

			expect(response.id).toBe(guildId); // Verify that the guild ID in the response matches
		} catch (error) {
			console.error("Error fetching guild details:", error);
			expect(error).toBeNull(); // Ensure there are no errors
		}
	});

	it("should handle error when fetching guild details", async () => {
		try {
			await apiHandler.get("/guilds/THIS_IS_NOT_VALID");
			// If no error is thrown, fail the test since an error was expected
			throw new Error("Expected an error but none was thrown.");
		} catch (error) {
			console.error("Expected error fetching guild details:", error);
			expect(error).toBeDefined(); // Verify that an error was thrown
		}
	});
});
