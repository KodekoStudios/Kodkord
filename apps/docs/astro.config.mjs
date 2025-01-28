// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import { ion } from "starlight-ion-theme";

import { createStarlightTypeDocPlugin } from 'starlight-typedoc'

const [kodkordTypeDoc, kodkordTypeDocSidebarGroup] = createStarlightTypeDocPlugin()
const [classesTypeDoc, classesTypeDocSidebarGroup] = createStarlightTypeDocPlugin()

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'My Docs',
			social: {
				github: 'https://github.com/withastro/starlight',
			},
			plugins: [
				ion({
					icons: { iconDir: './src/assets/icons' },
					overrides: {
						Sidebar: false
					},
					footer: {
						text: '©️ Kodeko Studios 2025',
						links: [{
							text: 'Homepage',
							href: 'https://kodkord.dev',
						}],
						icons: [{
							name: 'github',
							href: 'https://github.com/KodekoStudios/Kodkord'
						}]
					}
				}),
				kodkordTypeDoc({
					entryPoints: ['../../packages/kodkord/src/index.ts'],
					output: "api-kodkord",
					tsconfig: '../../packages/kodkord/tsconfig.json',
					sidebar: {
						label: "Kodkord",
						collapsed: true
					},
					typeDoc: {
						sort: ["enum-value-ascending", "source-order"],
						parametersFormat: "table",
						enumMembersFormat: "table",
						skipErrorChecking: true,
					}
				}),
				classesTypeDoc({
					entryPoints: ['../../packages/classes/src/index.ts'],
					output: "api-classes",
					tsconfig: '../../packages/classes/tsconfig.json',
					sidebar: {
						label: "Classes",
					},
					typeDoc: {
						sort: ["enum-value-ascending", "source-order"],
						parametersFormat: "table",
						enumMembersFormat: "table",
						skipErrorChecking: true,
					}
				}),
			],
			sidebar: [
				{
					// label: '[home] Home',
					label: 'Home',
					link: '/'
				},
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					// label: '[book] Reference',
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
				{
					label: 'API',
					items: [
						kodkordTypeDocSidebarGroup,
						classesTypeDocSidebarGroup,
					],
				},
			],
		}),
	],
});
