// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import mermaid from "astro-mermaid";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://angelcorzo.dev",
  integrations: [
    mdx(),
    sitemap(),
    icon(),
    mermaid({ autoTheme: true, theme: "dark", mermaidConfig: {} }),
  ],
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),

  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          entryFileNames: "[name].[hash].js",
          chunkFileNames: "[name].[hash].js",
        },
      },
    },
  },
});
