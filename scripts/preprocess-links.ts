import fs from "node:fs/promises";
import path from "node:path";

// Define types for pagemap structure
interface PageMapItem {
  id: string;
  title: string;
  slug: string;
  children?: PageMapItem[];
}

async function main() {
  const contentDir = path.resolve("./src/content");
  const pagemapCandidates = [
    path.join(contentDir, "site", "pageTree.json"),
    path.join(contentDir, "site", "pagemap.json"),
    path.join(contentDir, "pageTree.json"),
    path.join(contentDir, "pagemap.json"),
  ];
  const linksCandidates = [
    path.join(contentDir, "site", "links.json"),
    path.join(contentDir, "site", "pageLinks.json"),
    path.join(contentDir, "links.json"),
    path.join(contentDir, "pageLinks.json"),
  ];

  let pagemapPath = "";
  for (const candidate of pagemapCandidates) {
    try {
      await fs.access(candidate);
      pagemapPath = candidate;
      break;
    } catch {}
  }

  let linksPath = "";
  for (const candidate of linksCandidates) {
    try {
      await fs.access(candidate);
      linksPath = candidate;
      break;
    } catch {}
  }

  if (!pagemapPath || !linksPath) {
    console.warn(`Files not found. pagemap: ${pagemapPath}, links: ${linksPath}`);
    return;
  }

  try {
    // 1. Read pagemap.json and links.json
    const pagemapData = await fs.readFile(pagemapPath, "utf-8");
    const linksData = await fs.readFile(linksPath, "utf-8");

    const pagemap: PageMapItem[] = JSON.parse(pagemapData);
    const links: Record<string, string> = JSON.parse(linksData);

    // 2. Find the blog collection in pagemap
    const blogCollection = pagemap.find((item) => item.slug === "blog");

    if (!blogCollection) {
      console.warn("Blog collection not found in pagemap.json");
      return;
    }

    // 3. Extract all descendant IDs from the blog collection
    const blogIds = new Set<string>();

    function collectIds(item: PageMapItem) {
      // Don't modify the root 'blog' slug itself, only its children
      if (item.slug !== "blog") {
        blogIds.add(item.id);
      }
      if (item.children) {
        for (const child of item.children) {
          collectIds(child);
        }
      }
    }

    collectIds(blogCollection);

    // 4. Update the slugs in links.json for those IDs
    let updatedCount = 0;

    for (const id of blogIds) {
      if (links[id]) {
        const originalSlug = links[id];
        const parts = originalSlug.split("/");

        // If it's a deeply nested path like blog/2026/my-post
        if (parts.length > 2 && parts[0] === "blog") {
          const lastSlug = parts[parts.length - 1];
          links[id] = `blog/${lastSlug}`;
          updatedCount++;
          console.log(`Updated: ${originalSlug} -> ${links[id]}`);
        }
      }
    }

    // 5. Write back to links.json
    if (updatedCount > 0) {
      await fs.writeFile(linksPath, JSON.stringify(links, null, 2));
      console.log(
        `\nSuccessfully updated ${updatedCount} links in links.json.`,
      );
    } else {
      console.log("\nNo links needed to be updated.");
    }
  } catch (error) {
    console.error("Error processing links:", error);
    process.exit(1);
  }
}

main();
