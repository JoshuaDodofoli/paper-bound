import { MOCK_AUTHORS } from "@/domain/authors/fixtures";
import { MOCK_BOOKS } from "@/domain/books/fixtures";

export interface CatalogSearchItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  type: "author" | "book";
}

const SEARCHABLE_DATA: CatalogSearchItem[] = [
  ...MOCK_BOOKS.map((book) => ({
    id: book.id,
    slug: book.slug,
    title: book.title,
    subtitle: book.author,
    type: "book" as const,
  })),
  ...MOCK_AUTHORS.map((author) => ({
    id: author.id,
    slug: author.slug,
    title: author.name,
    subtitle: `Author • ${author.works.length} Books`,
    type: "author" as const,
  })),
];

export const searchCatalog = (query: string) => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  return SEARCHABLE_DATA.filter(
    (item) =>
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.subtitle.toLowerCase().includes(normalizedQuery),
  );
};
