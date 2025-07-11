// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
    site: "https://lakshmanshankar.github.io",
    integrations: [
        mdx(),
        tailwind(),
        partytown({
            // config:{
            //     forward: ['cf-beacon'],
            // }
        }),
    ],
    experimental: {
        responsiveImages: true,
        svg: true,
    },
    markdown: {
        shikiConfig: {
            themes: {
                light: "vitesse-light",
                dark: "vitesse-dark",
            },
        },
    },
});
