// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import { ion } from "starlight-ion-theme";

import { createStarlightTypeDocPlugin } from "starlight-typedoc";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

const [kodkordTypeDoc, kodkordTypeDocSidebarGroup] = createStarlightTypeDocPlugin();
const [classesTypeDoc, classesTypeDocSidebarGroup] = createStarlightTypeDocPlugin();

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
      title: "Kodkord",
      logo: {
          src: './src/assets/KodekoLight.svg',
    replacesTitle: true,
  },
      social: {
          github: "https://github.com/KodekoStudios/Kodkord",
          discord: "https://discord.gg/RemnzgFN5a",
      },
      customCss: ["./src/styles/global.css"],
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
              output: "api/kodkord",
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
              output: "api/classes",
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
              label: "Guide",
              items: [
                  { label: "Introduction", slug: "guide/introduction" },
                  {
                      label: "Getting Started",
                      items: [
                          {
                              label: "First Steps",
                              slug: "guide/getting-started/first-steps",
                          },
                          {
                              label: "Handle Events",
                              slug: "guide/getting-started/handling-events",
                          }, 
                          {
                              label: "Your First Command",
                              slug: "guide/getting-started/your-first-command",
                          },
                      ],
                  },
                  { label: "Congratulations", slug: "guide/congratulations" },
                  {
                      label: "Tips",
                      items: [
                          {
                              label: "TSConfig.json",
                              slug: "guide/tips/tsconfig",
                          },
                          {
                              label: "Global Types",
                              slug: "guide/tips/global-types",
                          },
                          {
                              label: "Env Variables",
                              slug: "guide/tips/env-variables",
                          },
                      ],
                  },
              ],
          },
          {
              label: "API",
              items: [
                  { label: "Introduction", slug: "api/introduction"},
                  kodkordTypeDocSidebarGroup,
                  classesTypeDocSidebarGroup
              ],
          },
      ],
	}), react()],

  vite: {
    // @ts-ignore
    plugins: [tailwindcss()],
  },
});