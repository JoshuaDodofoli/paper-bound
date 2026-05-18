import { getSeriesDetails } from "@/app/lib/utils/HardCoverSearch";
import Wrapper from "@/app/components/Wrapper";
import BackButton from "../../(components)/ui/BackButton";
import BookCard from "../../(components)/book/BookCard";
import Link from "next/link";

interface SeriesPageProps {
    params: Promise<{ slug: string }>
}

const SeriesPage = async ({ params }: SeriesPageProps) => {
    const { slug } = await params;
    const seriesDetails = await getSeriesDetails(slug);

    if (!seriesDetails) {
        return (
            <div className="min-h-screen bg-[#F5F5F5] pt-24 pb-12">
                <Wrapper>
                    <BackButton />
                    <div className="mt-8 text-center text-dark-grey/60 font-serif text-xl">
                        Series not found.
                    </div>
                </Wrapper>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F5F5] pt-24 pb-12">
            <Wrapper>
                <div className="mb-8">
                    <BackButton />
                </div>

                <div className="space-y-8">
                    {/* Header Details */}
                    <div>
                        <h1 className="text-4xl font-serif font-bold text-dark-grey tracking-tight">
                            Series
                        </h1>

                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-2 mt-4 select-none">
                            <span className="bg-dark-grey/10 text-dark-grey/80 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider font-sans">
                                Featured Series
                            </span>
                            {seriesDetails.primaryBooksCount !== null && (
                                <span className="bg-[#F2A900] text-black px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider font-sans">
                                    {seriesDetails.primaryBooksCount} primary books
                                </span>
                            )}
                            {seriesDetails.booksCount !== null && (
                                <span className="bg-dark-grey/10 text-dark-grey/80 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider font-sans">
                                    {seriesDetails.booksCount} released books
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-dark-grey mt-6 leading-tight">
                            {seriesDetails.name}
                        </h2>

                        {/* Description */}
                        {seriesDetails.description && (
                            <p className="text-base text-dark-grey/70 leading-relaxed font-medium mt-4 max-w-4xl">
                                {seriesDetails.description}
                            </p>
                        )}
                    </div>

                    {/* Grid of Books */}
                    <div className="pt-8 border-t border-black/5">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-10 gap-x-6">
                            {seriesDetails.books.map((sb: any) => (
                                <div key={sb.key} className="relative select-none flex flex-col items-center">
                                    <BookCard
                                        id={sb.key}
                                        slug={sb.slug}
                                        title={sb.title}
                                        author={sb.author}
                                        coverUrl={sb.coverUrl}
                                        width="w-full"
                                        aspectRatio="aspect-2/3"
                                    />
                                    {sb.position !== null && (
                                        <div className="absolute bottom-0 right-0 bg-[#F2A900] text-black px-3 py-1 text-xs font-black tracking-wide rounded-tl-md z-30 shadow-[0_-2px_8px_rgba(0,0,0,0.15)] pointer-events-none select-none">
                                            #{sb.position}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};

export default SeriesPage;
