import type { Collection } from "@/domain/collections/types";

const normalizeSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const createCollectionSlug = (
  name: string,
  collections: Collection[],
  currentCollectionId?: number,
) => {
  const baseSlug = normalizeSlug(name) || "untitled-collection";
  const siblingSlugs = new Set(
    collections
      .filter((collection) => collection.id !== currentCollectionId)
      .map((collection) => collection.slug),
  );

  if (!siblingSlugs.has(baseSlug)) {
    return baseSlug;
  }

  let suffix = 2;

  while (siblingSlugs.has(`${baseSlug}-${suffix}`)) {
    suffix += 1;
  }

  return `${baseSlug}-${suffix}`;
};
