import { Book } from '@/app/lib/interface'
import BookCard from '../../(components)/book/BookCard'
import { useDraggableScroll } from '@/app/hooks/useDraggableScroll';
import Link from 'next/link';

const BookSeries = ({ book }: { book: Book }) => {
    const seriesScroll = useDraggableScroll();

    return (
        <div>
            {book.seriesDetails && book.seriesBooks && book.seriesBooks.length > 0 && (
                <div className="mt-14 pt-10 border-t border-black/5">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-dark-grey tracking-tight">
                                Series
                            </h2>
                            <div className="flex flex-wrap items-center gap-2 mt-3 select-none">
                                <span className="bg-dark-grey/10 text-dark-grey/80 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider font-sans">
                                    Featured Series
                                </span>
                                {book.seriesDetails.primaryBooksCount !== null && (
                                    <span className="bg-[#F2A900] text-black px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider font-sans">
                                        {book.seriesDetails.primaryBooksCount} primary books
                                    </span>
                                )}
                                {book.seriesDetails.booksCount !== null && (
                                    <span className="bg-dark-grey/10 text-dark-grey/80 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider font-sans">
                                        {book.seriesDetails.booksCount} released books
                                    </span>
                                )}
                            </div>

                            <h3 className="text-lg md:text-xl font-serif font-semibold text-dark-grey leading-tight mt-4">
                                {book.seriesList?.[0]?.position !== null && book.seriesList?.[0]?.position !== undefined && (
                                    <span>#{book.seriesList[0].position} in </span>
                                )}
                                <span className="underline decoration-dark-grey/20 underline-offset-4 decoration-1 hover:text-dark-grey/80 transition-colors cursor-pointer">
                                    <Link href={`/dashboard/series/${book.seriesList?.[0]?.slug}`}>
                                        {book.seriesDetails.name}
                                    </Link>
                                </span>
                            </h3>

                            {book.seriesDetails.description && (
                                <p className="text-base text-dark-grey/70 leading-relaxed font-medium mt-3 max-w-4xl">
                                    {book.seriesDetails.description}
                                </p>
                            )}
                        </div>

                        <div
                            ref={seriesScroll.ref}
                            {...seriesScroll.props}
                            className="flex gap-6 overflow-x-auto no-scrollbar pb-4 pt-2"
                        >
                            {book.seriesBooks.map((sb) => (
                                <div key={sb.key} className="relative shrink-0 select-none">
                                    <BookCard
                                        id={sb.key}
                                        slug={sb.slug}
                                        title={sb.title}
                                        author={sb.author}
                                        coverUrl={sb.coverUrl}
                                    />
                                    {sb.position !== null && (
                                        <div className="absolute bottom-0 right-0 bg-[#F2A900] text-black px-3.5 py-1.5 text-sm font-black tracking-wide rounded-tl-md z-30 shadow-[0_-2px_8px_rgba(0,0,0,0.15)] pointer-events-none select-none">
                                            #{sb.position}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default BookSeries