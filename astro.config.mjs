// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
// import partytown from "@astrojs/partytown";
import AutoImport from "astro-auto-import";

export default defineConfig({
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
    experimental: {
        responsiveImages: true,
        svg: true,
    },
    markdown: {
        shikiConfig: {
            themes: {
                light: "vitesse-light",
                dark: "dark-plus",
            },
        },
    },
});
