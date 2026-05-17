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

    const books = hits.slice(0, 5).map((hit: any) => {
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

    return Response.json({ books });
  } catch (err) {
    console.error("Hardcover search error:", err);
    return Response.json({ books: [] }, { status: 500 });
  }
}
