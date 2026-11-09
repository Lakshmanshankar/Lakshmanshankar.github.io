import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@tailwindcss/vite";
import AutoImport from "astro-auto-import";

import mermaid from "astro-mermaid";
import rehypeSlug from "rehype-slug";
import { pagewriteAstro } from "pagewrite-astro";
import { loadEnv } from "vite";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import cloudflare from "@astrojs/cloudflare";


const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");

export default defineConfig({
  adapter: cloudflare(),
  integrations: [
    pagewriteAstro({
      siteId: env.PAGEWRITE_SITE_ID || "c2da931d-dbe9-41c8-87e1-3e7cf21e0ea7",
      token: env.REMOTE_MDX_TOKEN,
      outputDir: "src/content",
    }),
    {
      name: "post-sync-links",
      hooks: {
        "astro:config:setup": () => {
          import("child_process").then(({ execSync }) => {
            console.log("[post-sync-links] Running pre-process script...");
            try {
              execSync("npx tsx scripts/preprocess-links.ts", { stdio: "inherit" });
            } catch (error) {
              console.error("[post-sync-links] Failed to run pre-process script", error);
            }
          });
        },
      },
    },
    mermaid({ autoTheme: true }),
    {
      name: "fix-auto-import",
      hooks: {
        "astro:config:setup": ({ config }) => {
          if (config.markdown?.processor) {
            Object.defineProperty(config.markdown.processor, "name", {
              value: "unified",
            });
          }
        },
      },
    },
    AutoImport({
      imports: [
        "./src/components/mdx/Chip.astro",
        "./src/components/mdx/FolderList.astro",
        {
          'pagewrite-ui/mdx': ['Callout', 'Spacer', 'Image', 'Columns', 'ColumnItem', 'ContactForm', 'Expand', 'Tabs', 'TabItem']
        }
      ],
    }),
    mdx(),
  ],

  vite: {
    plugins: [tailwind()],
  },

  markdown: {
    rehypePlugins: [rehypeSlug, rehypeKatex],
    remarkPlugins: [remarkMath],
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
    },
  },
})
