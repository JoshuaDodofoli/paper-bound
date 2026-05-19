import { Book } from "../../interface";
import { getBooks } from "../HardCoverSearch";

function getRandomColor() {
    const colors = [
        'bg-stone', 'bg-ash', 'bg-paper',
        'bg-red-200', 'bg-blue-200', 'bg-green-200',
        'bg-yellow-200', 'bg-purple-200', 'bg-orange-200', 'bg-pink-200'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

export async function getNewArrivals(limit: number = 15): Promise<Book[]> {
    const ARRIVALS_QUERY = `
        query GetNewArrivals($limit: Int!) {
            books(
                where: { 
                    image: { url: { _is_null: false } }
                }
                order_by: { release_year: desc }
                limit: $limit
            ) {
                id
                title
                slug
                image { url }
                contributions { author { name slug } }
            }   
        }
    `;

    try {
        const data = await getBooks(ARRIVALS_QUERY, { limit });
        const rawBooks: any[] = data?.books ?? [];

        return rawBooks.map((rawBook) => {
            const primaryAuthor = rawBook.contributions?.[0]?.author;
            return {
                key: rawBook.id?.toString() ?? rawBook.slug ?? "",
                id: rawBook.id?.toString(),
                slug: rawBook.slug ?? "unknown",
                title: rawBook.title ?? "Unknown title",
                author: primaryAuthor?.name ?? "Unknown Author",
                authorSlug: primaryAuthor?.slug ?? "unknown",
                coverUrl: rawBook.image?.url ?? null,
                color: getRandomColor(),
            };
        });
    } catch (error) {
        console.error("Failed to fetch new arrivals:", error);
        return [];
    }
}
