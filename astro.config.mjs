import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "astro-auto-import";

import cloudflare from "@astrojs/cloudflare";
import mermaid from 'astro-mermaid';
import rehypeSlug from 'rehype-slug';
import pagewriteAstro from "pagewrite-astro"
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import { loadEnv } from "vite";
const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");

export default defineConfig({
  compressHTML: false,
  site: "https://lakshmanshankar.com",

  integrations: [
    pagewriteAstro({
      siteId: env.PAGEWRITE_SITE_ID || "c2da931d-dbe9-41c8-87e1-3e7cf21e0ea7",
      token: env.PAGEWRITE_BUILD_TOKEN,
      outputDir: "src/content",
      disabled: true
    }),
    mermaid({ autoTheme: true }),
    {
      name: 'fix-auto-import',
      hooks: {
        'astro:config:setup': ({ config }) => {
          if (config.markdown?.processor) {
            Object.defineProperty(config.markdown.processor, 'name', { value: 'unified' });
          }
        }
      }
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
    plugins: [tailwindcss()],
  },
  markdown: {
    rehypePlugins: [rehypeSlug, rehypeKatex],
    remarkPlugins: [remarkMath],
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark-high-contrast" },
    },
  },
  adapter: cloudflare()
});
