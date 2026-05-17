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
        <div className="mt-14 pt-20">
            <Wrapper>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    {book.recommendations && book.recommendations.length > 0 && (
                    <div className="mt-24 space-y-6">
                        <p className="text-[10px] uppercase font-bold text-dark-grey/40 tracking-[0.2em]">
                            You Might Also Like
                        </p>
                        <div
                        ref={recScroll.ref}
                        {...recScroll.props}
                        className="flex gap-6 overflow-x-auto no-scrollbar pb-4">
                            {book.recommendations.map((rec) => (
                                <BookCard
                                    key={rec.key}
                                    id={rec.key}
                                    slug={rec.slug}
                                    title={rec.title}
                                    author={rec.author}
                                    coverId={rec.coverId || undefined}
                                    width='w-52'
                                />
                            ))}
                        </div>
                    </div>
                )}

                
                </motion.div>
            </Wrapper>
        </div>
    )
}

export default Recommendations