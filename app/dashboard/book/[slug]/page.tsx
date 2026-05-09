import Link from 'next/link'
import { MOCK_BOOKS } from '../../../lib/books'
import BookClient from '../(components)/BookClient'

interface bookPageProps {
    params: Promise<{ slug: string }>
}

const BookDetailsPage = async ({ params }: bookPageProps) => {

    const { slug } = await params;
    const book = MOCK_BOOKS.find(b => b.slug === slug);

    if (!book) {
        return (
            <div className="h-screen flex items-center justify-center flex-col gap-4">
                <h1 className="text-2xl font-bold text-dark-grey/40">Book not found</h1>
                <Link href="/dashboard" className="text-dark-grey/80 underline font-medium">Return to Dashboard</Link>
            </div>
        );
    }


    return (
        <BookClient book={book} />
    );
};

export default BookDetailsPage;
