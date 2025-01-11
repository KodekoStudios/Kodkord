/**
 * Calculates the shard Id for a guild based on its Id.
 * @param guildId The Id of the guild.
 * @param shards The number of shards to calculate the Id for.
 * @todo Make this a static method in a class like ShardManager.
 * @returns The shard Id.
 */
export function calculateShardId(guildId: string, shards?: number): number {
	return Number((BigInt(guildId) >> 22n) % BigInt(shards ?? 1));
}
