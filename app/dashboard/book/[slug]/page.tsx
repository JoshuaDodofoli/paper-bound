import { getBookBySlug } from '@/domain/books/queries'
import BookClient from '../_components/BookClient'
import BackButton from '@/components/primitives/BackButton'

interface bookPageProps {
    params: Promise<{ slug: string }>
}

const BookDetailsPage = async ({ params }: bookPageProps) => {

    const { slug } = await params;
    const book = getBookBySlug(slug);

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
