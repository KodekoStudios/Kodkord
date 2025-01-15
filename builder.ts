import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import type { BuildConfig } from "unbuild";

export interface Alias {
	find: string | RegExp;
	replacement: string;
}

export function createBuildConfig(
	entries: BuildConfig["entries"],
	alias?: readonly Alias[],
): BuildConfig[] {
	return [
		{
			entries,
			outDir: "lib/",
			declaration: true,
			rollup: {
				esbuild: { minifySyntax: true },
				emitCJS: true,
				alias: {
					entries: alias,
				},
			},
			failOnWarn: false,
		},
	];
}

export function findFiles(dir: string, list: string[] = []): string[] {
	const FILES = readdirSync(dir);

	for (const FILE of FILES) {
		const FILE_PATH = join(dir, FILE);
		const FILE_STAT = statSync(FILE_PATH);

		if (FILE_STAT.isDirectory()) {
			findFiles(FILE_PATH, list);
		} else if (FILE === "index.ts") {
			list.push(FILE_PATH);
		}
	}

	return list;
}
