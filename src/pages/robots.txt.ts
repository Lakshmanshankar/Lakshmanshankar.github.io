import type { APIRoute } from "astro";

const TEXT_HEADERS = {
    "Content-Type": "text/plain; charset=utf-8",
};

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
    const sitemapURL = new URL("sitemap.xml", site);
    return new Response(getRobotsTxt(sitemapURL), {
        headers: TEXT_HEADERS,
    });
};

export const HEAD: APIRoute = () => {
    return new Response(null, {
        headers: TEXT_HEADERS,
    });
};
