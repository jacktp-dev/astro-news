import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import { SITE } from "./src/lib/config";
import { modifiedTime, readingTime } from "./src/lib/utils/remarks.mjs";

import sitemap from "@astrojs/sitemap";

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  base: SITE.basePath,

  markdown: {
    remarkPlugins: [readingTime, modifiedTime],
  },

  integrations: [tailwind(), mdx(), sitemap()],

  output: "server",
  adapter: vercel({
    isr: {
      expiration: 60 * 60
    }
  }),
});