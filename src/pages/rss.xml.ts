import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { HOME } from "@/consts";
import { resolveSlugParam } from "@/lib/utils";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
    const blog = (await getCollection("blog")).filter((post) => !post.data.draft);
    const items = [...blog].sort(
        (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf(),
    );

    return rss({
        title: HOME.TITLE,
        description: HOME.DESCRIPTION,
        site: context.site || context.url.origin,
        items: items.map((item) => {
            const rawSlug = (item.data as any)?.slug || item.id;
            const slug = resolveSlugParam(rawSlug, "blog");
            return {
                title: item.data.title,
                description: item.data.description,
                pubDate: item.data.date,
                link: `/blog/${slug}`,
            };
        }),
    });
};
