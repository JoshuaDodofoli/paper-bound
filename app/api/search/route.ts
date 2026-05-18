import { NextRequest } from "next/server";
import { getBooks } from "@/app/lib/utils/HardCoverSearch";

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
    return Response.json({ books: [], authors: [] });
  }

  try {
    const data = await getBooks(SEARCH_QUERY, { query: q });
    const hits: any[] = data?.search?.results?.hits ?? [];

    const books = hits.map((hit: any) => {
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

    const authors = Array.from(authorsMap.values());

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

    return Response.json({ books, authors, genres });
  } catch (err) {
    console.error("Hardcover search error:", err);
    return Response.json({ books: [], authors: [], genres: [] }, { status: 500 });
  }
}
