// src/lib/contacts.ts
import { getEntry, getCollection } from "astro:content";

export interface ContactItem {
  key: string;
  href?: string;
}

export interface GetContactItemsOptions {
  /** Comma-separated list of keys to show, e.g. "github,linkedin". Empty = show all. */
  visibleLinks?: string;
  /** Keys that have an icon available; anything else is dropped. */
  supportedKeys: string[];
}

type ContactsMap = Record<string, string>;

async function loadSiteSettings() {
  let entry = await getEntry("siteSettings", "site").catch(() => undefined);
  if (!entry) {
    const all = await getCollection("siteSettings").catch(() => []);
    entry = all.find((e) => e.id === "site") ?? all[0];
  }
  return entry;
}

function normalizeContacts(raw: unknown): ContactsMap {
  const map: ContactsMap = {};

  if (Array.isArray(raw)) {
    for (const item of raw) {
      if (!item || typeof item !== "object") continue;
      const obj = item as Record<string, unknown>;

      if ("name" in obj && ("url" in obj || "href" in obj)) {
        const name = String(obj.name).toLowerCase().trim();
        map[name] = String(obj.url || obj.href);
      } else {
        for (const [k, v] of Object.entries(obj)) {
          if (typeof v === "string") map[k.toLowerCase().trim()] = v;
        }
      }
    }
  } else if (raw && typeof raw === "object") {
    for (const [k, v] of Object.entries(raw)) {
      if (typeof v === "string") map[k.toLowerCase().trim()] = v;
    }
  }

  return map;
}

function getContactLink(map: ContactsMap, key: string): string | undefined {
  const lower = key.toLowerCase().trim();
  if (lower === "x" || lower === "twitter") return map["x"] || map["twitter"];
  if (lower === "email" || lower === "mail") return map["email"] || map["mail"];
  return map[lower];
}

function normalizeKey(key: string): string {
  if (key === "twitter" || key === "x") return "x";
  if (key === "mail" || key === "email") return "email";
  return key;
}

function formatHref(key: string, link: string): string {
  const trimmed = link.trim();
  const lowerKey = key.toLowerCase().trim();

  if (
    lowerKey === "email" ||
    lowerKey === "mail" ||
    (trimmed.includes("@") && !trimmed.startsWith("http"))
  ) {
    return trimmed.startsWith("mailto:") ? trimmed : `mailto:${trimmed}`;
  }

  if (!/^https?:\/\//i.test(trimmed) && !trimmed.startsWith("/") && !trimmed.startsWith("#")) {
    return `https://${trimmed}`;
  }
  return trimmed;
}

export async function getContactItems({
  visibleLinks = "",
  supportedKeys,
}: GetContactItemsOptions): Promise<ContactItem[]> {
  const settings = await loadSiteSettings();
  const map = normalizeContacts(settings?.data?.contacts ?? {});

  const requested = visibleLinks
    .split(",")
    .map((l) => l.trim().toLowerCase())
    .filter(Boolean);

  let keys: string[];
  if (requested.length > 0) {
    keys = requested;
  } else {
    // Default: every contact that has a non-empty link, de-duplicated (x/twitter, mail/email)
    const seen = new Set<string>();
    keys = [];
    for (const key of Object.keys(map)) {
      const link = getContactLink(map, key);
      if (typeof link !== "string" || link.trim().length === 0) continue;
      const normalized = normalizeKey(key);
      if (!seen.has(normalized)) {
        seen.add(normalized);
        keys.push(key);
      }
    }
  }

  const supported = new Set(supportedKeys);

  return keys
    .filter((key) => supported.has(key))
    .map((key) => {
      const rawLink = getContactLink(map, key);
      const href = rawLink && rawLink.trim().length > 0 ? formatHref(key, rawLink) : undefined;
      return { key, href };
    });
}
