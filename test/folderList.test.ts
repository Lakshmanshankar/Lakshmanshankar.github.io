import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  findNode,
  collectPageIds,
  resolveField,
  getOptionTokens,
  resolveWantedTokens,
  normalizeItemSlug,
  filterPages,
  type PageTreeNode,
  type SiteSchema,
} from "../src/lib/folderList";

describe("folderList helper functions", () => {
  const sampleTree: PageTreeNode[] = [
    {
      id: "root-folder",
      title: "Blog",
      slug: "blog",
      children: [
        {
          id: "sub-2025",
          title: "2025",
          slug: "blog/2025",
          children: [
            {
              id: "page-1",
              title: "Page 1 - Both Tags",
              slug: "blog/2025/page-1",
            },
            {
              id: "page-2",
              title: "Page 2 - Personal Only",
              slug: "blog/2025/page-2",
            },
          ],
        },
        {
          id: "sub-2026",
          title: "2026",
          slug: "blog/2026",
          children: [
            {
              id: "page-3",
              title: "Page 3 - Databases Only",
              slug: "blog/2026/page-3",
            },
            {
              id: "page-4",
              title: "Page 4 - Other Tag",
              slug: "blog/2026/page-4",
            },
          ],
        },
        {
          id: "empty-folder",
          title: "Empty Folder",
          slug: "blog/empty",
          children: [],
        },
      ],
    },
    {
      id: "projects-folder",
      title: "Projects",
      slug: "projects",
      children: [
        {
          id: "proj-1",
          title: "Project 1",
          slug: "projects/proj-1",
        },
      ],
    },
  ];

  const sampleSchema: SiteSchema = {
    id: "schema-123",
    name: "Blog schema",
    fields: {
      "field-tags": {
        id: "field-tags",
        name: "tags",
        type: "multi_select",
        options: [
          { id: "opt-pers", label: "Personal", value: "opt-pers" },
          { id: "opt-data", label: "Databases", value: "opt-data" },
          { id: "opt-sys", label: "Systems", value: "opt-sys" },
        ],
      },
      "field-category": {
        id: "field-category",
        name: "category",
        type: "select",
        options: [
          { id: "cat-tech", label: "Tech", value: "tech" },
          { id: "cat-life", label: "Life", value: "life" },
        ],
      },
    },
  };

  const sampleSlugById = new Map<string, string>([
    ["page-1", "blog/2025/page-1"],
    ["page-2", "blog/2025/page-2"],
    ["page-3", "blog/2026/page-3"],
    ["page-4", "blog/2026/page-4"],
    ["proj-1", "projects/proj-1"],
  ]);

  const sampleMetaById = new Map<string, any>([
    [
      "page-1",
      {
        title: "Page 1 - Both Tags",
        "field-tags": ["opt-pers", "opt-data"],
        "field-category": "Tech",
      },
    ],
    [
      "page-2",
      {
        title: "Page 2 - Personal Only",
        // Stored as label instead of ID to test label matching
        "field-tags": ["Personal"],
        "field-category": "Life",
      },
    ],
    [
      "page-3",
      {
        title: "Page 3 - Databases Only",
        "field-tags": ["opt-data"],
      },
    ],
    [
      "page-4",
      {
        title: "Page 4 - Other Tag",
        "field-tags": ["opt-sys"],
      },
    ],
  ]);

  test("findNode locates root and nested nodes", () => {
    const root = findNode(sampleTree, "root-folder");
    assert.equal(root?.id, "root-folder");

    const sub = findNode(sampleTree, "sub-2025");
    assert.equal(sub?.id, "sub-2025");

    const leaf = findNode(sampleTree, "page-3");
    assert.equal(leaf?.id, "page-3");

    const missing = findNode(sampleTree, "non-existent");
    assert.equal(missing, undefined);
  });

  test("collectPageIds collects recursively and non-recursively", () => {
    const root = findNode(sampleTree, "root-folder");
    assert.ok(root);

    // Recursive: should include page-1, page-2, page-3, page-4 (and skip empty folder)
    const recursiveIds = collectPageIds(root, true);
    assert.deepEqual(recursiveIds, ["page-1", "page-2", "page-3", "page-4"]);

    // Non-recursive: root-folder only has folders as children, no direct page leaves
    const nonRecursiveIds = collectPageIds(root, false);
    assert.deepEqual(nonRecursiveIds, []);

    // Non-recursive on sub-2025: should collect page-1 and page-2
    const sub2025 = findNode(sampleTree, "sub-2025");
    assert.ok(sub2025);
    const subIds = collectPageIds(sub2025, false);
    assert.deepEqual(subIds, ["page-1", "page-2"]);
  });

  test("normalizeItemSlug flattens blog paths", () => {
    assert.equal(
      normalizeItemSlug("blog/2025/ts-monorepo-tailwind-shadcn"),
      "blog/ts-monorepo-tailwind-shadcn"
    );
    assert.equal(
      normalizeItemSlug("blog/ts-monorepo-tailwind-shadcn"),
      "blog/ts-monorepo-tailwind-shadcn"
    );
    assert.equal(normalizeItemSlug("projects/pagewrite"), "projects/pagewrite");
    assert.equal(normalizeItemSlug("resume"), "resume");
  });

  test("filterPages matches any (OR) with option labels and option IDs", () => {
    const items = filterPages({
      roots: sampleTree,
      slugById: sampleSlugById,
      metaById: sampleMetaById,
      folderId: "root-folder",
      schema: sampleSchema,
      fieldId: "field-tags",
      values: "Personal, Databases",
      match: "any",
    });

    // page-1 has both, page-2 has Personal, page-3 has Databases
    assert.equal(items.length, 3);
    assert.deepEqual(
      items.map((i) => i.id),
      ["page-1", "page-2", "page-3"]
    );
    assert.equal(items[0].url, "/blog/page-1");
  });

  test("filterPages matches all (AND)", () => {
    const items = filterPages({
      roots: sampleTree,
      slugById: sampleSlugById,
      metaById: sampleMetaById,
      folderId: "root-folder",
      schema: sampleSchema,
      fieldId: "field-tags",
      values: "Personal, Databases",
      match: "all",
    });

    // Only page-1 has both Personal and Databases
    assert.equal(items.length, 1);
    assert.equal(items[0].id, "page-1");
  });

  test("filterPages handles select (single string value)", () => {
    const items = filterPages({
      roots: sampleTree,
      slugById: sampleSlugById,
      metaById: sampleMetaById,
      folderId: "root-folder",
      schema: sampleSchema,
      fieldId: "field-category",
      values: "Life",
    });

    assert.equal(items.length, 1);
    assert.equal(items[0].id, "page-2");
  });

  test("filterPages returns all pages when values/fieldId are not provided", () => {
    const items = filterPages({
      roots: sampleTree,
      slugById: sampleSlugById,
      metaById: sampleMetaById,
      folderId: "root-folder",
    });

    assert.equal(items.length, 4);
    assert.deepEqual(
      items.map((i) => i.id),
      ["page-1", "page-2", "page-3", "page-4"]
    );
  });

  test("filterPages handles unknown folderId gracefully", () => {
    const items = filterPages({
      roots: sampleTree,
      slugById: sampleSlugById,
      metaById: sampleMetaById,
      folderId: "unknown-id",
    });

    assert.equal(items.length, 0);
  });

  test("filterPages falls back to raw value matching if schema or fieldId is unknown", () => {
    const customMeta = new Map([
      ["page-1", { customTag: "custom-value" }],
      ["page-2", { customTag: "other-value" }],
    ]);

    const items = filterPages({
      roots: sampleTree,
      slugById: sampleSlugById,
      metaById: customMeta,
      folderId: "root-folder",
      fieldId: "customTag",
      values: "custom-value",
    });

    assert.equal(items.length, 1);
    assert.equal(items[0].id, "page-1");
  });

  test("filterPages handles case and whitespace insensitivity", () => {
    const items = filterPages({
      roots: sampleTree,
      slugById: sampleSlugById,
      metaById: sampleMetaById,
      folderId: "root-folder",
      schema: sampleSchema,
      fieldId: "field-tags",
      values: "  pErSoNaL  ",
    });

    assert.equal(items.length, 2);
    assert.deepEqual(
      items.map((i) => i.id),
      ["page-1", "page-2"]
    );
  });

  test("filterPages excludes pages not in metaById when filtering is active", () => {
    const incompleteMeta = new Map([
      ["page-1", { "field-tags": ["Personal"] }],
      // page-2, page-3, page-4 not in meta
    ]);

    const items = filterPages({
      roots: sampleTree,
      slugById: sampleSlugById,
      metaById: incompleteMeta,
      folderId: "root-folder",
      schema: sampleSchema,
      fieldId: "field-tags",
      values: "Personal",
    });

    assert.equal(items.length, 1);
    assert.equal(items[0].id, "page-1");
  });

  test("filterPages handles array schema.fields", () => {
    const arraySchema: SiteSchema = {
      id: "schema-arr",
      name: "Array Schema",
      fields: [
        {
          id: "tag-field",
          name: "tags",
          type: "multi_select",
          options: [{ id: "opt-1", label: "Label1" }],
        },
      ],
    };

    const customMeta = new Map([
      ["page-1", { "tag-field": ["opt-1"] }],
      ["page-2", { "tag-field": ["other"] }],
    ]);

    const items = filterPages({
      roots: sampleTree,
      slugById: sampleSlugById,
      metaById: customMeta,
      folderId: "root-folder",
      schema: arraySchema,
      fieldId: "tag-field",
      values: "Label1",
    });

    assert.equal(items.length, 1);
    assert.equal(items[0].id, "page-1");
  });

  test("real site data with user prompt values matches expected posts", async () => {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");

    const siteDir = path.resolve("./src/content/site");
    const pageTree: PageTreeNode[] = JSON.parse(
      await fs.readFile(path.join(siteDir, "pageTree.json"), "utf-8")
    );
    const links: Record<string, string> = JSON.parse(
      await fs.readFile(path.join(siteDir, "links.json"), "utf-8")
    );
    const pageData: Record<string, any> = JSON.parse(
      await fs.readFile(path.join(siteDir, "pageData.json"), "utf-8")
    );
    const schemas: Record<string, any> = JSON.parse(
      await fs.readFile(path.join(siteDir, "schema.json"), "utf-8")
    );

    const slugById = new Map<string, string>(Object.entries(links));
    const metaById = new Map<string, any>(Object.entries(pageData));
    const schema = schemas["73645b31-6280-4502-b3ce-50d295ef32dc"];

    // User exact query: folderId="fea62c14-abe5-47e1-a84d-6ed94823c123"
    // schemaId="73645b31-6280-4502-b3ce-50d295ef32dc"
    // fieldId="e1b5355c-7b20-43e2-9cf4-0387158495e2"
    // values="Personal,Databases"
    const itemsAny = filterPages({
      roots: pageTree,
      slugById,
      metaById,
      folderId: "fea62c14-abe5-47e1-a84d-6ed94823c123",
      schema,
      fieldId: "e1b5355c-7b20-43e2-9cf4-0387158495e2",
      values: "Personal,Databases",
      match: "any",
    });

    // Posts matching "Personal" or "Databases":
    // 1. "031f787d-93ab-4eec-9501-3424caa89c19" (Typescript monorepo...) - has Personal & Databases
    // 2. "dd6b697a-01ed-455b-af01-c4dd8e1c6e27" (What I Use) - has Personal
    // 3. "b16a6e58-5f78-4e5f-a65c-48cd0cdcc8f6" (From MacBooks to Machine Tools...) - has Personal
    // 4. "fd5db5f2-810c-4b82-9e08-aeb553bb3fcb" (Why Timezones Make Cube Partitions Tricky) - has Databases
    // 5. "59c91e64-5097-4d83-bcdd-1a2203615ddd" (Count distinct at scale) - has Databases
    assert.equal(itemsAny.length, 5);
    assert.deepEqual(
      itemsAny.map((i) => i.id),
      [
        "031f787d-93ab-4eec-9501-3424caa89c19",
        "dd6b697a-01ed-455b-af01-c4dd8e1c6e27",
        "b16a6e58-5f78-4e5f-a65c-48cd0cdcc8f6",
        "fd5db5f2-810c-4b82-9e08-aeb553bb3fcb",
        "59c91e64-5097-4d83-bcdd-1a2203615ddd",
      ]
    );

    // match="all"
    const itemsAll = filterPages({
      roots: pageTree,
      slugById,
      metaById,
      folderId: "fea62c14-abe5-47e1-a84d-6ed94823c123",
      schema,
      fieldId: "e1b5355c-7b20-43e2-9cf4-0387158495e2",
      values: "Personal,Databases",
      match: "all",
    });

    assert.equal(itemsAll.length, 1);
    assert.equal(itemsAll[0].id, "031f787d-93ab-4eec-9501-3424caa89c19");
  });
});
