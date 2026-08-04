// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
// import partytown from "@astrojs/partytown";
import AutoImport from "astro-auto-import";
import { unified } from '@astrojs/markdown-remark'

export default defineConfig({
  compressHTML: false,
  site: "https://lakshmanshankar.com",
  integrations: [
    AutoImport({
      imports: [
        "./src/components/mdx/Chip.astro",
        "./src/components/mdx/Code.astro",
        "./src/components/mdx/Spacer.astro",
        "./src/components/mdx/Image.astro",
      ],
    }),
    mdx(),
    tailwind(),
    // partytown({
    // config:{
    //     forward: ['cf-beacon'],
    // }
    // }),
  ],
  markdown: {
    processor: unified(),
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark-high-contrast",
      },
    },
  },
});
