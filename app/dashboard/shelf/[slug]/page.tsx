import Wrapper from '@/components/primitives/Wrapper';
import BackButton from '@/components/primitives/BackButton';
import BookCard from '@/components/domain/books/BookCard';
import { MOCK_BOOKS } from '@/domain/books/fixtures';

interface slugProps {
    params: Promise<{
        slug: string;
    }>
}

const ShelfCollectionPage = async ({ params }: slugProps) => {

    const { slug } = await params;

    return (
        <div className='mt-12' data-collection-slug={slug}>
            <Wrapper>
                <BackButton label="Back to Library" className="mb-8" />
                <div className="flex items-center justify-between mb-6">
                    <div className='flex items-center justify-between'>
                        <p className='text-sm text-dark-grey/60'>{1000} books</p>
                    </div>
                </div>
                <div className='flex flex-col gap-8'>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {MOCK_BOOKS.map((book) => (
                            <BookCard
                                key={book.id}
                                id={book.id}
                                slug={book.slug}
                                title={book.title}
                                author={book.author}
                                coverColor={book.color}
                                aspectRatio="aspect-3/4"
                            />
                        ))}
                    </div>
                </div>
            </Wrapper>
        </div>
    )
}

export default ShelfCollectionPage
