import { NextRequest } from "next/server";
import { getBooks } from "@/app/lib/utils/HardCoverSearch";
import { MOCK_BOOKS, MOCK_AUTHORS } from "@/app/lib/books";

const SEARCH_QUERY = `
  query SearchBooks($query: String!) {
    search(query: $query) {
      results
    }
  }
`;

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");

  if (!q || q.trim().length === 0) {
    return Response.json({ books: [], authors: [], genres: [] });
  }

  const queryWords = q.toLowerCase().split(/\s+/).filter(Boolean);

  // 1. Partial keyword search in local MOCK_BOOKS
  const matchedLocalBooks = MOCK_BOOKS.filter(book => {
    const titleLower = book.title.toLowerCase();
    const authorLower = book.author.toLowerCase();
    return queryWords.every(word => titleLower.includes(word) || authorLower.includes(word));
  }).map(book => ({
    slug: book.slug,
    title: book.title,
    author: book.author,
    authorSlug: book.authorSlug,
    coverUrl: null, // local mock books don't have cover URLs but BookResultItem handles them elegantly
    isLocal: true,
  }));

  // 2. Partial keyword search in local MOCK_AUTHORS
  const matchedLocalAuthors = MOCK_AUTHORS.filter(author => {
    const nameLower = author.name.toLowerCase();
    const bioLower = author.bio?.toLowerCase() ?? "";
    return queryWords.every(word => nameLower.includes(word) || bioLower.includes(word));
  }).map(author => ({
    key: author.slug,
    slug: author.slug,
    name: author.name,
    image: author.image || null,
    topWork: author.works?.[0]?.title ?? null,
    isLocal: true,
  }));

  try {
    const data = await getBooks(SEARCH_QUERY, { query: q });
    const hits: any[] = data?.search?.results?.hits ?? [];

    const hardcoverBooks = hits.map((hit: any) => {
      const doc = hit.document;
      const primaryAuthor = doc.contributions?.[0]?.author;
      return {
        slug: doc.slug ?? "",
        title: doc.title ?? "Unknown Title",
        author: primaryAuthor?.name ?? "Unknown Author",
        authorSlug: primaryAuthor?.slug ?? "unknown",
        coverUrl: doc.image?.url ?? null,
      };
    });

    const authorsMap = new Map();
    hits.forEach((hit: any) => {
      const doc = hit.document;
      (doc.contributions ?? []).forEach((c: any) => {
        if (c.author) {
          authorsMap.set(c.author.slug, {
            key: c.author.slug,
            slug: c.author.slug,
            name: c.author.name,
            image: c.author.image?.url ?? null,
            topWork: doc.title,
          });
        }
      });
    });

    const hardcoverAuthors = Array.from(authorsMap.values());

    const genresSet = new Set<string>();
    hits.forEach((hit: any) => {
      const doc = hit.document;
      (doc.genres ?? []).forEach((g: string) => {
        if (g && g.trim()) {
          genresSet.add(g.trim());
        }
      });
    });

    const genres = Array.from(genresSet).map(g => ({
      key: g.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      slug: g.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: g
    }));

    // 3. De-duplicate and merge results, prioritize local books/authors
    const mergedBooksMap = new Map();
    matchedLocalBooks.forEach(b => mergedBooksMap.set(b.slug, b));
    hardcoverBooks.forEach(b => {
      if (!mergedBooksMap.has(b.slug)) {
        mergedBooksMap.set(b.slug, b);
      }
    });
    const books = Array.from(mergedBooksMap.values());

    const mergedAuthorsMap = new Map();
    matchedLocalAuthors.forEach(a => mergedAuthorsMap.set(a.slug, a));
    hardcoverAuthors.forEach(a => {
      if (!mergedAuthorsMap.has(a.slug)) {
        mergedAuthorsMap.set(a.slug, a);
      }
    });
    const authors = Array.from(mergedAuthorsMap.values());

    return Response.json({ books, authors, genres });
  } catch (err) {
    console.error("Hardcover search error:", err);
    // If external search fails, fall back to local results rather than failing completely
    return Response.json({ books: matchedLocalBooks, authors: matchedLocalAuthors, genres: [] });
  }
}
