// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    site:'https://lakshmanshankar.github.io/Lakshmanshankar',
    integrations: [mdx(), sitemap(), tailwind()],
    experimental: {
        responsiveImages: true,
        svg: true,
    },
    markdown: {
        shikiConfig: {
            themes: {
                light: "vitesse-light",
                dark: "vesper",
            },
            wrap: true,
        },
    },
});
