import { MOCK_AUTHORS } from "@/domain/authors/fixtures";

export const getAuthorBySlug = (slug: string) =>
  MOCK_AUTHORS.find((author) => author.slug === slug);
