'use client'
import Wrapper from '@/app/components/Wrapper';
import { BookOpen, Bookmark, Star, Clock, Plus, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { MOCK_BOOKS } from '../../../lib/books';
import BackButton from '../../(components)/ui/BackButton';
import BookCard from '../../(components)/book/BookCard';
import Recommendations from './Recommendations';
import Image from 'next/image';
import { Book } from '@/app/lib/interface';

const BookClient = ({ book }: { book: Book }) => {


    return (
        <div className="min-h-screen pt-20 pb-20">
            <Wrapper>
                <BackButton label="Back" className="mb-8" />

                <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
                    <div className="w-full md:w-1/3 flex flex-col gap-8 items-center md:items-start">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="aspect-3/4 w-64 md:w-full rounded-sm shadow-book-hover relative overflow-hidden flex items-center justify-center"
                        >
                            {book.coverId && (
                                <Image
                                    src={`https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`}
                                    alt={book.title}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            )}
                        </motion.div>

                        <div className="flex gap-4 w-64 md:w-full">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 bg-dark-grey text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:bg-dark-grey/90 transition-colors"
                            >
                                <BookOpen size={20} />
                                Start Reading
                            </motion.button>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                className="p-4 bg-stone rounded-2xl text-dark-grey cursor-pointer hover:bg-stone/80 transition-colors"
                            >
                                <Bookmark size={20} />
                            </motion.button>
                        </div>
                    </div>

                    <div className="flex-1 space-y-8">
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-1 bg-amber-400/10 text-amber-500 px-3 py-1 rounded-full text-sm font-bold">
                                    <Star size={16} fill="currentColor" />
                                    4.8
                                </div>
                                <span className="text-dark-grey/30">•</span>
                                <div className="text-dark-grey/50 text-sm font-medium">1,200 Reviews</div>
                            </div>

                            <h1 className="text-3xl font-serif font-bold text-dark-grey mb-2">{book.title}</h1>
                            <Link href={`/dashboard/authors/${book.authorSlug}`}>
                                <p className="text-lg text-dark-grey/60 font-medium">by <span className="text-dark-grey/90 underline decoration-stone-400 underline-offset-4">{book.author}</span></p>
                            </Link>
                        </motion.div>

                        <div className="grid grid-cols-3 gap-4 border-y border-stone/50 py-6">
                            <div className="text-center">
                                <p className="text-[10px] uppercase font-bold text-dark-grey/40 tracking-widest mb-1">Length</p>
                                <div className="flex items-center justify-center gap-1 text-dark-grey/80 font-bold">
                                    <Clock size={16} />
                                    12h 45m
                                </div>
                            </div>
                            <div className="text-center border-x border-stone/50">
                                <p className="text-[10px] uppercase font-bold text-dark-grey/40 tracking-widest mb-1">Language</p>
                                <p className="text-dark-grey/80 font-bold">English</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] uppercase font-bold text-dark-grey/40 tracking-widest mb-1">Format</p>
                                <p className="text-dark-grey/80 font-bold">Hardcover</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-dark-grey">Synopsis</h3>
                            <p className="text-dark-grey/70 text-lg">
                                This is a captivating masterpiece by {book.author}. The story takes us through a world of mystery, adventure, and profound discoveries. A must-read for anyone looking to expand their horizons and experience a truly unique narrative journey.
                            </p>
                        </div>

                    </div>
                </div>
            </Wrapper>

            {/* {otherBooks.length > 0 && (
                <Recommendations book={book} otherBooks={otherBooks} />
            )} */}
        </div>
    )
}

export default BookClient