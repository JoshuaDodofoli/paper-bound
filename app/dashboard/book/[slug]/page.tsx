'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ChevronLeft, Star, Clock, BookOpen, Share2, Plus, Bookmark } from 'lucide-react'
import Wrapper from '@/app/components/Wrapper'
import { MOCK_BOOKS } from '../../(home)/page'

const BookDetailsPage = () => {
    const params = useParams();
    const slug = params.slug as string;
    
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
        <div className="min-h-screen pt-20 pb-20">
            <Wrapper>
                {/* Back Navigation */}
                <Link href="/dashboard" className="flex items-center gap-2 text-dark-grey/50 hover:text-dark-grey transition-colors mb-8 group w-fit">
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to Library</span>
                </Link>

                <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
                    {/* Left: Book Cover Section */}
                    <div className="w-full md:w-1/3 flex flex-col gap-8">
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className={`aspect-3/4 w-full ${book.color} rounded-sm shadow-book-hover relative overflow-hidden`}
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/10" />
                            <div className="p-8 h-full flex flex-col justify-end">
                                <p className="text-sm font-bold text-black/30 uppercase tracking-[0.2em] mb-2">{book.author}</p>
                                <h1 className="text-4xl font-serif font-bold text-black/80 leading-[1.1]">{book.title}</h1>
                            </div>
                        </motion.div>

                        <div className="flex gap-4">
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

                            <h1 className="text-5xl font-serif font-bold text-dark-grey mb-2">{book.title}</h1>
                            <p className="text-xl text-dark-grey/60 font-medium">by <span className="text-dark-grey/90 underline decoration-stone-400 underline-offset-4">{book.author}</span></p>
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
                            <p className="text-dark-grey/70 leading-relaxed text-lg">
                                This is a captivating masterpiece by {book.author}. The story takes us through a world of mystery, adventure, and profound discoveries. A must-read for anyone looking to expand their horizons and experience a truly unique narrative journey.
                            </p>
                        </div>

                        <div className="pt-4 flex items-center gap-6">
                            <div className="flex -space-x-3">
                                {[1,2,3].map(i => (
                                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-paper bg-stone shadow-sm`} />
                                ))}
                            </div>
                            <p className="text-sm text-dark-grey/50 font-medium">
                                <span className="text-dark-grey font-bold">James</span> and <span className="text-dark-grey font-bold">42 others</span> recently read this.
                            </p>
                        </div>
                        
                        <div className="flex gap-4 pt-4">
                            <motion.button 
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 border-2 border-stone text-dark-grey/80 rounded-2xl font-bold flex items-center gap-2 cursor-pointer hover:bg-stone/20 transition-colors"
                            >
                                <Plus size={18} />
                                Add to Collection
                            </motion.button>
                            <motion.button 
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 border-2 border-stone text-dark-grey/80 rounded-2xl font-bold flex items-center gap-2 cursor-pointer hover:bg-stone/20 transition-colors"
                            >
                                <Share2 size={18} />
                                Share
                            </motion.button>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};

export default BookDetailsPage;
