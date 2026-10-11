export function formatDate(date: Date) {
  return Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}

export function readingTime(html: string) {
  const textOnly = html.replace(/<[^>]+>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed();
  return `${readingTimeMinutes} min read`;
}

export function dateRange(startDate: Date, endDate?: Date | string): string {
  const startMonth = startDate.toLocaleString("default", { month: "short" });
  const startYear = startDate.getFullYear().toString();
  let endMonth;
  let endYear;

  if (endDate) {
    if (typeof endDate === "string") {
      endMonth = "";
      endYear = endDate;
    } else {
      endMonth = endDate.toLocaleString("default", { month: "short" });
      endYear = endDate.getFullYear().toString();
    }
  }

  return `${startMonth}${startYear} - ${endMonth}${endYear}`;
}

export function resolveSlugParam(rawSlug: string, collection: string) {
  let cleaned = rawSlug.replace(/^\/+|\/+$/g, "");

  if (cleaned.startsWith(`${collection}/`)) {
    cleaned = cleaned.substring(collection.length + 1);
  }

  if (collection === "blog" || collection === "tags") {
    const parts = cleaned.split("/");
    if (parts.length >= 1) {
      cleaned = parts[parts.length - 1];
    }
  }

  return cleaned;
}
