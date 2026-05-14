import BookClient from '../(components)/BookClient'
import BackButton from '../../(components)/ui/BackButton'
import { searchBooks } from '@/app/lib/utils/BookSearch'
import { Book } from '@/app/lib/interface'

interface bookPageProps {
    params: Promise<{ slug: string }>
}

const BookDetailsPage = async ({ params }: bookPageProps) => {

    const { slug } = await params;
    
    let book: Book | undefined = undefined;

    try {
        const query = slug.replace(/-/g, ' ');
        const data = await searchBooks(query);
        
        const searchData = data.docs.find((b: Book) => {
            const bSlug = b.title ? b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '';
            const bKey = b.id ? b.id.replace('/works/', '') : '';
            return bSlug === slug || bKey === slug;
        });

        if (searchData) {
            book = {
                key: searchData.key,
                id: searchData.key.replace('/works/', ''),
                slug: slug,
                title: searchData.title,
                author: searchData.author_name ? searchData.author_name[0] : 'Unknown Author',
                authorSlug: searchData.author_name ? searchData.author_name[0].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : 'unknown',
                coverId: searchData.cover_i
                    
            };
        }
    } catch (error) {
        console.error("Error fetching actual search results:", error);
    }

    if (!book) {
        return (
            <div className="h-screen flex items-center justify-center flex-col gap-4">
                <h1 className="text-2xl font-bold text-dark-grey/40">Book not found</h1>
                <BackButton label="Return to Dashboard" />
            </div>
        );
    }

    return (
        <BookClient book={book} />
    );
};


export default BookDetailsPage;
