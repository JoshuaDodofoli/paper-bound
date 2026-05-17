import { getBooksBySubject } from "@/app/lib/utils/BookSearch";
import { MOCK_BOOKS } from "../../lib/books";
import { Book } from "@/app/lib/interface";
import HomeClient from "./(Components)/HomeClient";

// Force dynamic rendering since we are fetching live API data
export const dynamic = "force-dynamic";

export default async function Page() {
  let readingBooks: Book[] = [];
  let trendingBooks: Book[] = [];
  let arrivalsBooks: Book[] = [];

  const fallbackBooks: Book[] = MOCK_BOOKS.map((b) => ({
    key: `/works/${b.slug}`,
    id: b.id,
    slug: b.slug,
    title: b.title,
    author: b.author,
    authorSlug: b.authorSlug,
    coverId: "",
    color: b.color || "bg-stone",
  }));

  try {
    // Fetch books for homepage sections in parallel
    const [fetchedReading, fetchedTrending, fetchedArrivals] = await Promise.all([
      getBooksBySubject("classic_literature", 8),
      getBooksBySubject("fantasy", 8),
      getBooksBySubject("science_fiction", 8),
    ]);

    readingBooks = fetchedReading.length > 0 ? fetchedReading : fallbackBooks;
    trendingBooks = fetchedTrending.length > 0 ? fetchedTrending : fallbackBooks;
    arrivalsBooks = fetchedArrivals.length > 0 ? fetchedArrivals : fallbackBooks;
  } catch (error) {
    console.error("Error populating homepage from OpenLibrary API:", error);
    readingBooks = fallbackBooks;
    trendingBooks = fallbackBooks;
    arrivalsBooks = fallbackBooks;
  }

  return (
    <HomeClient
      readingBooks={readingBooks}
      trendingBooks={trendingBooks}
      arrivalsBooks={arrivalsBooks}
    />
  );
}