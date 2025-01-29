// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import { ion } from "starlight-ion-theme";

import { createStarlightTypeDocPlugin } from "starlight-typedoc";

// biome-ignore lint/style/useNamingConvention:
const [kodkordTypeDoc, kodkordTypeDocSidebarGroup] = createStarlightTypeDocPlugin();
// biome-ignore lint/style/useNamingConvention:
const [classesTypeDoc, classesTypeDocSidebarGroup] = createStarlightTypeDocPlugin();

// https://astro.build/config
// biome-ignore lint/style/noDefaultExport:
export default defineConfig({
	integrations: [
		starlight({
			title: "Kodkord",
			social: {
				github: "https://github.com/KodekoStudios/Kodkord",
				discord: "https://discord.gg/RemnzgFN5a",
			},
			customCss: ["./src/styles.css"],
			plugins: [
				ion({
					icons: { iconDir: "./src/assets/icons" },
					overrides: {
						Sidebar: false,
					},
					footer: {
						text: "©️ Kodeko Studios 2025",
						links: [
							{
								text: "Homepage",
								href: "/",
							},
						],
						icons: [
							{
								name: "github",
								href: "https://github.com/KodekoStudios/Kodkord",
							},
						],
					},
				}),
				kodkordTypeDoc({
					entryPoints: ["../../packages/kodkord/src/index.ts"],
					output: "api-kodkord",
					tsconfig: "../../packages/kodkord/tsconfig.json",
					sidebar: {
						label: "Kodkord",
						collapsed: true,
					},
					typeDoc: {
						sort: ["enum-value-ascending", "source-order"],
						parametersFormat: "table",
						enumMembersFormat: "table",
						skipErrorChecking: true,
					},
				}),
				classesTypeDoc({
					entryPoints: ["../../packages/classes/src/index.ts"],
					output: "api-classes",
					tsconfig: "../../packages/classes/tsconfig.json",
					sidebar: {
						label: "Classes",
						collapsed: true,
					},
					typeDoc: {
						sort: ["enum-value-ascending", "source-order"],
						parametersFormat: "table",
						enumMembersFormat: "table",
						skipErrorChecking: true,
					},
				}),
			],
			sidebar: [
				{
					// label: '[home] Home',
					label: "Home",
					link: "/",
				},
				{
					label: "Guides",
					items: [
						{ label: "Introduction", slug: "guides/introduction" },
						{
							label: "Getting Started",
							items: [
								{
									label: "First Steps",
									slug: "guides/getting-started/first-steps",
								},
							],
						},
						{
							label: "Tips",
							items: [
								{
									label: "TSConfig.json",
									slug: "guides/tips/tsconfig",
								},
								{
									label: "Env Variables",
									slug: "guides/tips/env-variables",
								},
							],
						},
					],
					collapsed: true,
				},
				{
					// label: '[book] Reference',
					label: "Reference",
					autogenerate: { directory: "reference" },
				},
				{
					label: "API",
					items: [kodkordTypeDocSidebarGroup, classesTypeDocSidebarGroup],
				},
			],
		}),
	],
});
