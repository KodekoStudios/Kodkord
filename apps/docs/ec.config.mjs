import { defineEcConfig } from "astro-expressive-code";
import ecTwoSlash from "expressive-code-twoslash";

// biome-ignore lint/style/noDefaultExport:
export default defineEcConfig({
	plugins: [
		ecTwoSlash({
			explicitTrigger: true,
			includeJsDoc: true,
			allowNonStandardJsDocTags: false,
			languages: ["ts", "tsx", "js"],
			twoslashOptions: {},
		}),
	],
});
