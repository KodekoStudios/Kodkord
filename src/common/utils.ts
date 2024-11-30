/**
 * Calculates the shard ID for a guild based on its ID.
 * @param guildId The ID of the guild.
 * @param shards The number of shards to calculate the ID for.
 * @returns The shard ID.
 */
export function calculateShardId(guildId: string, shards?: number) {
	return Number((BigInt(guildId) >> 22n) % BigInt(shards ?? 1));
}
