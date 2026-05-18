import Wrapper from '@/app/components/Wrapper';
import { MOCK_BOOKS } from '@/app/lib/books';
import { motion } from 'motion/react';
import React from 'react'
import BookCard from '../../(components)/book/BookCard';
import { Book } from '@/app/lib/interface';
import { useDraggableScroll } from '@/app/hooks/useDraggableScroll';

const Recommendations = ({ book }: { book: Book }) => {
    const recScroll = useDraggableScroll();

    return (
        <div className="">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    {book.recommendations && book.recommendations.length > 0 && (
                        <div className="mt-14 pt-10 border-t border-black/5">
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-3xl font-serif font-bold text-dark-grey tracking-tight">
                                        Recommendations
                                    </h2>
                                    
                                    <div className="flex flex-wrap items-center gap-2 mt-3 select-none">
                                        <span className="bg-dark-grey/10 text-dark-grey/80 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider font-sans">
                                            Featured Genre
                                        </span>
                                        {book.subjects && book.subjects.length > 0 && (
                                            <span className="bg-[#F2A900] text-black px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider font-sans">
                                                {book.subjects[0]}
                                            </span>
                                        )}
                                        <span className="bg-dark-grey/10 text-dark-grey/80 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider font-sans">
                                            {book.recommendations.length} curated works
                                        </span>
                                    </div>

                                    <p className="text-md md:text-lg font-serif font-semibold text-dark-grey leading-tight mt-4">
                                        Because you enjoyed{" "}
                                        <span className="underline decoration-dark-grey/20 underline-offset-4 decoration-1 hover:text-dark-grey/80 transition-colors cursor-pointer">
                                            {book.title}
                                        </span>
                                    </p>

                                    <p className="text-base text-dark-grey/70 leading-relaxed font-medium mt-3 max-w-4xl">
                                        Explore hand-picked editorial recommendations and highly-rated works matching the theme, genre, and emotional profile of {book.title}. Curated by book lovers based on reader overlap and subject classifications.
                                    </p>
                                </div>

                                <div
                                    ref={recScroll.ref}
                                    {...recScroll.props}
                                    className="flex gap-6 overflow-x-auto no-scrollbar pb-4 pt-2"
                                >
                                    {book.recommendations.map((rec) => (
                                        <div key={rec.key} className="relative shrink-0 select-none">
                                            <BookCard
                                                id={rec.key}
                                                slug={rec.slug}
                                                title={rec.title}
                                                author={rec.author}
                                                coverUrl={rec.coverUrl}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
        </div>
    )
}

export default Recommendations