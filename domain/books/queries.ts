import { MOCK_BOOKS } from "@/domain/books/fixtures";

export const getBookBySlug = (slug: string) =>
  MOCK_BOOKS.find((book) => book.slug === slug);

export const getBooksByAuthorSlug = (authorSlug: string) =>
  MOCK_BOOKS.filter((book) => book.authorSlug === authorSlug);
