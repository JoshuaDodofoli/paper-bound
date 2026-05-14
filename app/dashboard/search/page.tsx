import { Book } from "@/app/lib/interface";
import { searchBooks } from "@/app/lib/utils/BookSearch";
import SearchClient from "./(components)/SearchClient";

interface SearchPageProps {
    searchParams: Promise<{
        q?: string;
    }>;
}

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

    const data = await searchBooks(query);

    const results = data.docs?.map((book: any) => {
        const generatedSlug = book.title
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') || 'unknown-title';

        const authorName = book.author_name ? book.author_name[0] : 'Unknown Author';

        return {
            key: book.key,
            id: book.key?.replace('/works/', ''),
            slug: generatedSlug,
            title: book.title,
            author: authorName,
            authorSlug: authorName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
            coverId: book.cover_i?.toString() || '',
        };
    }) || [];
    return <SearchClient query={query} results={results} />;
}