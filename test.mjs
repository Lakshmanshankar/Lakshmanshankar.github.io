import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import mermaid from 'astro-mermaid';
import rehypeSlug from 'rehype-slug';

export default defineConfig({
  compressHTML: false,
  site: "https://lakshmanshankar.com",
  integrations: [
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
        "./src/components/mdx/Code.astro",
        "./src/components/mdx/Spacer.astro",
        "./src/components/mdx/Image.astro",
        "./src/components/mdx/Callout.astro",
      ],
    }),
    mdx(),
    tailwind(),
  ],
  markdown: {
    rehypePlugins: [rehypeSlug],
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark-high-contrast" },
    },
  },
});
