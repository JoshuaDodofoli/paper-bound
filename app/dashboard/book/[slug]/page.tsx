import { getBooks, getRecommendations } from "@/app/lib/utils/HardCoverSearch";
import { Book } from "@/app/lib/interface";
import BookClient from "../(components)/BookClient";
import BackButton from "../../(components)/ui/BackButton";

interface bookPageProps {
    params: Promise<{ slug: string }>
}

const BookDetailsPage = async ({ params }: bookPageProps) => {

    const { slug } = await params;
    let book: Book | undefined = undefined;

    try {
        const query = `
            query GetBookBySlug($slug: String!) {
                books(where: { slug: { _eq: $slug } }, limit: 1) {
                    id
                    title
                    slug
                    description
                    pages
                    release_year
                    rating
                    ratings_count
                    users_read_count
                    image { url }        
                    cached_tags          
                    contributions {
                        author {
                            name
                            slug
                        }
                    }
                    editions(limit: 1) {
                        isbn_13
                        edition_format
                        publisher { name }
                        release_date
                        audio_seconds
                    }
                }
            }
        `;

        const data = await getBooks(query, { slug });
        const searchData = data?.books?.[0];

        if (searchData) {
            const genres: string[] = Array.isArray(searchData.cached_tags?.Genre)
                ? searchData.cached_tags.Genre.map((g: any) => g.tag ?? g.tagSlug ?? '').filter(Boolean)
                : [];

            // Dynamically fetch recommended books from the same genre
            const recommendations = await getRecommendations(genres, searchData.id.toString());

            book = {
                key: searchData.id.toString(),
                id: searchData.id.toString(),
                slug: searchData.slug,
                title: searchData.title,
                author: searchData.contributions?.[0]?.author?.name ?? 'Unknown Author',
                authorSlug: searchData.contributions?.[0]?.author?.slug ?? 'unknown',
                coverUrl: searchData.image?.url ?? null,
                description: searchData.description || 'No description available.',
                subjects: genres,
                rating: searchData.rating,
                ratingsCount: searchData.ratings_count,
                firstPublishYear: searchData.release_year,
                publisher: searchData.editions?.[0]?.publisher?.name ?? null,
                recommendations: recommendations,
            };
        }

    } catch (error) {
        console.error("Error fetching book from Hardcover:", error);
    }

    if (!book) {
        return (
            <div className="h-screen flex items-center justify-center flex-col gap-4">
                <h1 className="text-2xl font-bold text-dark-grey/40">Book not found</h1>
                <BackButton label="Return to Dashboard" />
            </div>
        );
    }

    return <BookClient book={book} />;
};

export default BookDetailsPage;
