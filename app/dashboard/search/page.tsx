import SearchClient from "./(components)/SearchClient";
import { getBooks } from "@/app/lib/utils/HardCoverSearch";

interface SearchPageProps {
    searchParams: Promise<{
        q?: string;
    }>;
}

const SEARCH_QUERY = `
    query SearchBooks($query: String!) {
        search(query: $query) {
            results
        }
    }
`;

export default async function Page(props: SearchPageProps) {
    const searchParams = await props.searchParams;
    const query = searchParams.q?.trim() || '';

    if (!query) {
        return (
            <div className="w-full max-w-7xl mx-auto px-6 py-24 text-center">
                <h1 className="text-4xl font-serif text-[#1e1a15] mb-4">Search</h1>
                <p className="text-[#1e1a15]/60 text-lg">
                    Please enter a search query to find books and authors.
                </p>
            </div>
        );
    }

    const data = await getBooks(SEARCH_QUERY, { query });
    const hits: any[] = data?.search?.results?.hits ?? [];

    const results = hits.slice(0, 20).map((hit: any) => {
        const doc = hit.document;
        const primaryAuthor = doc.contributions?.[0]?.author;
        const authorName = primaryAuthor?.name ?? 'Unknown Author';

        return {
            key: doc.slug,
            id: doc.id?.toString(),
            slug: doc.slug ?? '',
            title: doc.title ?? 'Unknown Title',
            author: authorName,
            authorSlug: primaryAuthor?.slug ?? authorName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
            coverUrl: doc.image?.url ?? null,
        };
    });

    return <SearchClient query={query} results={results} />;
}