import BookClient from '../(components)/BookClient'
import BackButton from '../../(components)/ui/BackButton'
import { getBookDetails, searchBooks, getRecommendations } from '@/app/lib/utils/BookSearch'
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

        const searchData = data.docs.find((b: any) => {
            const bSlug = b.title ? b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '';
            const bKey = b.key ? b.key.replace('/works/', '') : '';
            return bSlug === slug || bKey === slug;
        });

        if (searchData) {
            const details = await getBookDetails(searchData.key);
            
            const subjects = (searchData.subject && searchData.subject.length > 0) 
                ? searchData.subject 
                : details.subjects;

            const recommendations = await getRecommendations(subjects, searchData.key);

            book = {
                key: searchData.key,
                id: searchData.key.replace('/works/', ''),
                slug: slug,
                title: searchData.title,
                author: searchData.author_name?.[0] ?? 'Unknown Author',
                authorSlug: searchData.author_name
                    ? searchData.author_name[0].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                    : 'unknown',
                coverId: searchData.cover_i,
                description: details.description,
                subjects: details.subjects,
                recommendations: recommendations,
            };
        }

    } catch (error) {
        console.error("Error fetching book:", error);
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