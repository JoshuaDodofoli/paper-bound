import Wrapper from '@/components/primitives/Wrapper';
import type { Book } from '@/domain/books/types';
import { motion } from 'motion/react';
import BookCard from '@/components/domain/books/BookCard';

const Recommendations = ({ book, otherBooks }: { book: Book, otherBooks: Book[] }) => {

    return (
        <div className="mt-14 pt-20">
            <Wrapper>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    <div className="flex items-center">
                        <div className="space-y-2">
                            <p className="text-sm font-bold text-dark-grey/40 uppercase">Recommendations</p>
                            <h2 className="text-2xl font-serif font-bold text-dark-grey">More by {book.author}</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                        {otherBooks.map((otherBook) => (
                            <div key={otherBook.id}>
                                <BookCard
                                    id={otherBook.id}
                                    slug={otherBook.slug}
                                    title={otherBook.title}
                                    author={otherBook.author}
                                    coverColor={otherBook.color}
                                    width="w-full"
                                />
                            </div>
                        ))}
                    </div>
                </motion.div>
            </Wrapper>
        </div>
    )
}

export default Recommendations
