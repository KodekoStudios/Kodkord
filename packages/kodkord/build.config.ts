import { resolve } from "node:path";
import { createBuildConfig } from "../../builder";

// biome-ignore lint/style/noDefaultExport: <explanation>
export default createBuildConfig(
	["./src/index.ts"],
	[
		{
			find: "@common",
			replacement: resolve(__dirname, "./src/common"),
		},
		{
			find: "@core",
			replacement: resolve(__dirname, "./src/core"),
		},
		{
			find: "@api",
			replacement: resolve(__dirname, "./src/api"),
		},
	],
);
