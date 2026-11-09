export interface PageTreeNode {
  id: string;
  title: string;
  slug?: string;
  children?: PageTreeNode[];
  [key: string]: any;
}

export interface SchemaFieldOption {
  id?: string;
  value?: string;
  label?: string;
  name?: string;
  [key: string]: any;
}

export interface SchemaField {
  id?: string;
  name?: string;
  type?: string;
  required?: boolean;
  options?: SchemaFieldOption[];
  [key: string]: any;
}

export interface SiteSchema {
  id?: string;
  name?: string;
  fields?: Record<string, SchemaField> | SchemaField[];
  [key: string]: any;
}

export interface FolderListItem {
  id: string;
  slug: string;
  url: string;
  title: string;
}

export interface FilterPagesParams {
  roots: PageTreeNode[];
  slugById: Map<string, string>;
  metaById: Map<string, any>;
  folderId: string;
  schema?: SiteSchema;
  fieldId?: string;
  values?: string;
  match?: "any" | "all" | string;
  recursive?: boolean | string;
}

export function norm(s: unknown): string {
  if (s == null) return "";
  return String(s).trim().toLowerCase();
}

/**
 * Normalizes an item slug so that deeply nested blog paths (e.g. blog/2025/my-post)
 * match the actual blog route (/blog/my-post).
 */
export function normalizeItemSlug(rawSlug: string): string {
  const cleaned = rawSlug.replace(/^\/+|\/+$/g, "");
  const parts = cleaned.split("/");
  const section = parts[0];
  if (section === "blog" || section === "tags") {
    const last = parts[parts.length - 1];
    return `${section}/${last}`;
  }
  return cleaned;
}

/**
 * Searches the page tree recursively using Depth First Search to find a node by id.
 */
export function findNode(nodes: PageTreeNode[], id: string): PageTreeNode | undefined {
  for (const n of nodes) {
    if (n.id === id) return n;
    if (n.children && n.children.length > 0) {
      const hit = findNode(n.children, id);
      if (hit) return hit;
    }
  }
  return undefined;
}

/**
 * Collects all page ids under a folder node.
 * If recursive is true, traverses into subfolders.
 * Folders with children are not treated as pages unless they also have an entry in metaById.
 */
export function collectPageIds(
  node: PageTreeNode | undefined,
  recursive: boolean = true,
  metaById?: Map<string, any>,
  out: string[] = []
): string[] {
  if (!node) return out;

  for (const child of node.children ?? []) {
    const hasChildrenArray = Array.isArray(child.children);

    if (hasChildrenArray) {
      // If the folder itself is also a page in pageData
      if (metaById && metaById.has(child.id) && Object.keys(metaById.get(child.id) || {}).length > 0) {
        out.push(child.id);
      }
      if (recursive && child.children && child.children.length > 0) {
        collectPageIds(child, recursive, metaById, out);
      }
    } else {
      out.push(child.id);
    }
  }

  return out;
}

/**
 * Resolves a field from a schema whether schema.fields is an object map or an array.
 */
export function resolveField(
  schema: SiteSchema | undefined,
  fieldId: string
): SchemaField | undefined {
  if (!schema || !schema.fields) return undefined;

  if (Array.isArray(schema.fields)) {
    return schema.fields.find(
      (f) => f && (f.id === fieldId || f.name === fieldId)
    );
  }

  if (schema.fields[fieldId]) {
    return schema.fields[fieldId];
  }

  return Object.values(schema.fields).find(
    (f) => f && (f.id === fieldId || f.name === fieldId)
  );
}

/**
 * Extracts all identifier tokens (id, value, label, name) for a schema option.
 */
export function getOptionTokens(opt: SchemaFieldOption): string[] {
  const tokens: string[] = [];
  for (const key of ["id", "value", "label", "name"] as const) {
    const val = opt[key];
    if (val != null) {
      const n = norm(val);
      if (n && !tokens.includes(n)) {
        tokens.push(n);
      }
    }
  }
  return tokens;
}

/**
 * Resolves requested option tokens against schema field options.
 */
export function resolveWantedTokens(
  options: SchemaFieldOption[],
  requestedValues: string[],
  fieldId?: string
): {
  wanted: Set<string>;
  optionTokensByValue: Map<string, string[]>;
} {
  const wanted = new Set<string>();
  const optionTokensByValue = new Map<string, string[]>();

  for (const v of requestedValues) {
    const opt = options.find((o) =>
      getOptionTokens(o).some((t) => t === v)
    );

    if (opt) {
      const tokens = getOptionTokens(opt);
      tokens.forEach((t) => wanted.add(t));
      optionTokensByValue.set(v, tokens);
    } else {
      if (fieldId) {
        console.warn(`[FolderList] option "${v}" not found in field ${fieldId}`);
      }
      wanted.add(v);
      optionTokensByValue.set(v, [v]);
    }
  }

  return { wanted, optionTokensByValue };
}

/**
 * Filters and resolves pages under a folder according to schema field options.
 */
export function filterPages(params: FilterPagesParams): FolderListItem[] {
  const {
    roots,
    slugById,
    metaById,
    folderId,
    schema,
    fieldId,
    values,
    match = "any",
    recursive = true,
  } = params;

  if (!folderId) {
    return [];
  }

  const folder = findNode(roots, folderId);
  if (!folder) {
    console.warn(`[FolderList] folderId "${folderId}" not found in pageTree`);
    return [];
  }

  const isRecursive = recursive !== false && recursive !== "false";
  const rawPageIds = collectPageIds(folder, isRecursive, metaById);
  // De-duplicate in case of any duplicate node IDs
  const pageIds = Array.from(new Set(rawPageIds));

  const resolveItem = (id: string): FolderListItem | null => {
    const rawSlug = slugById.get(id) ?? findNode(roots, id)?.slug ?? metaById.get(id)?.slug;
    if (!rawSlug) return null;
    const slug = normalizeItemSlug(rawSlug);
    const title =
      metaById.get(id)?.title ??
      metaById.get(id)?.metaTitle ??
      findNode(roots, id)?.title ??
      id;
    return {
      id,
      slug,
      url: `/${slug}`,
      title,
    };
  };

  const isFilteringActive = Boolean(fieldId && values != null && values.trim() !== "");

  if (!isFilteringActive) {
    return pageIds
      .map(resolveItem)
      .filter((item): item is FolderListItem => item !== null);
  }

  const requestedValues = (values ?? "")
    .split(",")
    .map(norm)
    .filter(Boolean);

  if (requestedValues.length === 0) {
    return pageIds
      .map(resolveItem)
      .filter((item): item is FolderListItem => item !== null);
  }

  const field = fieldId ? resolveField(schema, fieldId) : undefined;
  if (fieldId && !field) {
    console.warn(
      `[FolderList] field "${fieldId}" not found in schema ${schema?.id ?? ""}, falling back to raw value matching`
    );
  }

  const options = field?.options ?? [];
  const { wanted, optionTokensByValue } = resolveWantedTokens(options, requestedValues, fieldId);

  const matchMode = match === "all" ? "all" : "any";

  const matches = (pageId: string): boolean => {
    const pageMeta = metaById.get(pageId);
    if (!pageMeta) return false;

    // Check by fieldId first, or fallback to field name if available
    let raw = pageMeta[fieldId!];
    if (raw == null && field?.name) {
      raw = pageMeta[field.name];
    }
    if (raw == null) return false;

    const stored = (Array.isArray(raw) ? raw : [raw])
      .filter((x) => x != null)
      .map(norm);

    if (matchMode === "all") {
      return requestedValues.every((v) => {
        const tokens = optionTokensByValue.get(v) ?? [v];
        return tokens.some((t) => stored.includes(t));
      });
    }

    return stored.some((s) => wanted.has(s));
  };

  return pageIds
    .filter((id) => matches(id))
    .map(resolveItem)
    .filter((item): item is FolderListItem => item !== null);
}
