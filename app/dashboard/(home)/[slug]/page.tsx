import CategoryClient from "../(Components)/CategoryClient";
import { getTrendingBooks } from "@/app/lib/utils/hardCover/GetTrendingBooks";
import { getReadingBooks } from "@/app/lib/utils/hardCover/GetReadingBooks";
import { getNewArrivals } from "@/app/lib/utils/hardCover/GetNewArrivals";
import { Book } from "@/app/lib/interface";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let books: Book[] = [];

  try {
    if (slug === "trending") {
      books = await getTrendingBooks(100);
    } else if (slug === "reading") {
      books = await getReadingBooks(100);
    } else if (slug === "new-arrivals") {
      books = await getNewArrivals(100);
    }
  } catch (error) {
    console.error(`Error loading category ${slug} in Server Component:`, error);
  }

  return <CategoryClient slug={slug} books={books} />;
}
