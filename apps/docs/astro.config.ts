import type { PluginOptions } from "typedoc-plugin-markdown";
import type { TypeDocOptions } from "typedoc";

import { createStarlightTypeDocPlugin } from "starlight-typedoc";
import starlightSidebarTopics from "starlight-sidebar-topics";
// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { ion } from "starlight-ion-theme";

const [CoreStableTypeDoc, CoreStableTypeDocSidebarGroup] =
	createStarlightTypeDocPlugin();
const [ClassesStableTypeDoc, ClassesStableTypeDocSidebarGroup] =
	createStarlightTypeDocPlugin();
const [CoreDevTypeDoc, CoreDevTypeDocSidebarGroup] =
	createStarlightTypeDocPlugin();
const [ClassesDevTypeDoc, ClassesDevTypeDocSidebarGroup] =
	createStarlightTypeDocPlugin();

const TypeDocConfig: Partial<
	Omit<TypeDocOptions, "entryPoints" | "tsconfig"> & PluginOptions
> = {
	sort: ["enum-value-ascending", "source-order"],
	parametersFormat: "table",
	enumMembersFormat: "table",
	skipErrorChecking: true,
	entryPointStrategy: "resolve",
	mergeReadme: true,
	fileExtension: ".mdx",
	useCodeBlocks: true,
	entryFileName: "reference",
	hidePageHeader: true,
	pageTitleTemplates: {
		index: "{projectName} {version}",
		member: "{kind}: {name}",
		module: "{name}"
	},
	plugin: ["typedoc-plugin-frontmatter", "./src/plugins/frontmatter.mjs"],
	sidebarLinks: {
		XD: "/api/core/overview"
	}
};

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: "Kodkord",
			logo: {
				replacesTitle: true,
				dark: "./src/assets/KodekoLight.svg",
				light: "./src/assets/KodekoDark.svg"
			},
			social: {
				github: "https://github.com/KodekoStudios/",
				discord: "https://discord.gg/RemnzgFN5a"
			},
			components: {
				ThemeSelect: "./src/components/ThemeSelect.astro"
			},
			customCss: ["/src/styles/global.css"],
			plugins: [
				ion({
					icons: { iconDir: "./src/assets/icons" },
					overrides: {
						SiteTitle: false,
						Sidebar: false,
						Head: false
					},
					footer: {
						text: "©️ Kodeko Studios 2025",
						links: [
							{
								text: "Homepage",
								href: "/"
							}
						],
						icons: [
							{
								name: "github",
								href: "https://github.com/KodekoStudios/Kodkord"
							}
						]
					}
				}),
				starlightSidebarTopics([
					{
						label: "Guides",
						link: "guide/introduction",
						icon: "open-book",
						id: "guide",
						items: [
							{
								label: "Introduction",
								slug: "guide/introduction"
							},
							{
								label: "Core",
								items: [
									{
										label: "Introduction",
										slug: "guide/core/introduction"
									},
									{
										label: "Getting Started",
										items: [
											{
												label: "First Steps",
												slug: "guide/core/getting-started/first-steps"
											},
											{
												label: "Handle Events",
												slug: "guide/core/getting-started/handling-events"
											},
											{
												label: "Your First Command",
												slug: "guide/core/getting-started/your-first-command"
											}
										]
									},
									{
										label: "Congratulations",
										slug: "guide/core/congratulations"
									}
								]
							},
							{
								label: "Classes",
								items: [
									{
										label: "Introduction",
										slug: "guide/classes/introduction"
									}
								]
							}
						]
					},
					{
						label: "API Reference",
						link: "/api/introduction",
						icon: "information",
						id: "api",
						items: [
							{
								label: "Stable",
								items: [
									CoreStableTypeDocSidebarGroup,
									ClassesStableTypeDocSidebarGroup
								]
							},
							{
								label: "Development",
								items: [
									CoreDevTypeDocSidebarGroup,
									ClassesDevTypeDocSidebarGroup
								]
							}
						]
					},
					{
						label: "Related Links",
						link: "/links",
						icon: "list-format",
						items: []
					}
				]),
				CoreStableTypeDoc({
					entryPoints: ["node_modules/kodkord/lib/index.d.ts"],
					output: "api/core/stable",
					tsconfig: "./tsconfig/tsconfig.core.json",
					sidebar: {
						label: "Core",
						collapsed: false
					},
					typeDoc: {
						...TypeDocConfig,
						name: "Stable Core Reference"
					}
				}),
				ClassesStableTypeDoc({
					entryPoints: ["node_modules/@kodkord/classes/lib/index.d.ts"],
					output: "api/classes/stable",
					tsconfig: "./tsconfig/tsconfig.classes.json",
					sidebar: {
						label: "Classes",
						collapsed: false
					},
					typeDoc: {
						...TypeDocConfig,
						name: "Stable Classes Reference"
					}
				}),
				CoreDevTypeDoc({
					entryPoints: ["node_modules/kodkord-dev/lib/index.d.ts"],
					output: "api/core/dev",
					tsconfig: "./tsconfig/tsconfig.core.json",
					sidebar: {
						label: "Core",
						collapsed: false
					},
					typeDoc: {
						...TypeDocConfig,
						name: "Development Core Reference"
					}
				}),
				ClassesDevTypeDoc({
					entryPoints: ["node_modules/@kodkord/classes-dev/lib/index.d.ts"],
					output: "api/classes/dev",
					tsconfig: "./tsconfig/tsconfig.classes.json",
					sidebar: {
						label: "Classes",
						collapsed: false
					},
					typeDoc: {
						...TypeDocConfig,
						name: "Development Classes Reference"
					}
				})
			]
		})
	]
});
