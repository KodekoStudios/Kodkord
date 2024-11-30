import { readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { defineBuildConfig } from "unbuild";

/**
 * Recursively finds all files with the name "index.ts" in the specified directory.
 *
 * @param dir The directory to search in.
 * @param list An optional array to store the file paths. Defaults to an empty array.
 * @returns An array of file paths that match the criteria.
 */
function findFiles(dir: string, list: string[] = []): string[] {
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

// biome-ignore lint/style/noDefaultExport: lil biome linter, this is a config >:(
export default defineBuildConfig({
	entries: findFiles("src").map((file) => ({
		input: file,
		outDir: file.replace("src", "lib").replace("index.ts", ""),
		format: ["esm", "cjs"],
	})),
	outDir: "lib/",
	declaration: true,
	rollup: {
		esbuild: { minifySyntax: true },
		emitCJS: true,
		alias: {
			entries: [
				{
					find: "@common",
					replacement: resolve(__dirname, "./src/common"),
				},
				{
					find: "@core",
					replacement: resolve(__dirname, "./src/core"),
				},
				{
					find: "@structures",
					replacement: resolve(__dirname, "./src/structures"),
				},
				{
					find: "@types",
					replacement: resolve(__dirname, "./src/types.d.ts")
				}
			],
		},
	},
	failOnWarn: false,
});