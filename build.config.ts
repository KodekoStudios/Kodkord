import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
	entries: [
		"src/",
		{
			input: "src/",
			outDir: "lib/",
			format: "esm",
		},
		{
			input: "src/",
			outDir: "lib/",
			format: "cjs",
			ext: "cjs",
			declaration: false,
		},
	],
	outDir: "lib/",
	declaration: true,
	rollup: {
		emitCJS: true,
	},
});
