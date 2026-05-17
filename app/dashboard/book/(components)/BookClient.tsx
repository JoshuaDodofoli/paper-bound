'use client'
import Wrapper from '@/app/components/Wrapper';
import { Star, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import BackButton from '../../(components)/ui/BackButton';
import { Book } from '@/app/lib/interface';
import { useState } from 'react';
import Modal from '../../(components)/ui/Modal';
import Sidebar from './Sidebar';
import Recommendations from './Recommendations';
import Image from 'next/image';
import BookCard from '../../(components)/book/BookCard';
import { useDraggableScroll } from '@/app/hooks/useDraggableScroll';

const BookClient = ({ book }: { book: Book }) => {

    const [isOpen, setIsOpen] = useState(false);
    const recScroll = useDraggableScroll();

    const handleMore = () => {
        setIsOpen(!isOpen);
    }

    const cleanDescription = book.description?.split(/Also contained in:|----------|\*\*Contains\*\*/i)[0].trim();
    const LIMIT = 270;
    const isLong = (cleanDescription?.length ?? 0) > LIMIT;

    return (
        <div className="w-full min-h-screen bg-[#F5F5F5] pt-12 pb-24">
            <Wrapper className="">

                {/* breadcrumb */}
                <div className="flex items-center justify-between mb-16 border-b border-black/5 pb-4">
                    <BackButton />
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-dark-grey/60">Book Listing</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-20 items-start">
                    {/* Left Section: Cover with circular background */}
                    <div className="relative flex flex-col items-center">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white/40 blur-3xl -z-10" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-dark-grey/5 -z-20" />

                        <Sidebar book={book} />

                        {/* <p className="mt-8 text-[9px] uppercase font-bold tracking-[0.2em] text-dark-grey/40">Click for Preview</p> */}
                    </div>

                    <div className="max-w-2xl space-y-16">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="space-y-4"
                        >
                            <h1 className="text-3xl md:text-4xl font-serif font-bold text-dark-grey leading-[1.1] tracking-tight">
                                {book.title}
                            </h1>
                            <p className="text-sm text-dark-grey/50">
                                by
                                <Link href={`/dashboard/authors/${book.authorSlug}`}>
                                    <span className="text-dark-grey/90 text-base font-sans ml-1 hover:underline underline-offset-2">{book.author}</span>
                                </Link>
                            </p>
                        </motion.div>

                        <div className="space-y-8">
                            <div className="">
                                <h3 className='mb-2 text-lg'>Synopsis</h3>
                                <div className="space-y-4">
                                    {(isLong ? cleanDescription?.slice(0, LIMIT) + '...' : cleanDescription)
                                        ?.split('\n').filter(p => p.trim() !== '').map((paragraph, index, arr) => (
                                            <p key={index} className="text-base leading-relaxed text-dark-grey/70 text-wrap font-medium">
                                                {paragraph}
                                                {isLong && index === arr.length - 1 && (
                                                    <button
                                                        onClick={handleMore}
                                                        className="ml-2 text-base text-dark-grey font-bold hover:underline cursor-pointer inline-block"
                                                    >
                                                        Read more
                                                    </button>
                                                )}
                                            </p>
                                        ))}
                                </div>
                            </div>
                        </div>

                        {/* Metadata Grid */}
                        <div className="grid grid-cols-2 gap-x-20 gap-y-8 py-10 border-y border-black/5">
                            <div className="flex flex-col gap-2">
                                <span className="text-xs uppercase font-bold text-dark-grey/60">Editors</span>
                                <span className="text-sm font-medium text-dark-grey/80">Gestalten</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-xs uppercase font-bold text-dark-grey/60">Features</span>
                                <span className="text-sm font-medium text-dark-grey/80">Full color, 256 pages</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-xs uppercase font-bold text-dark-grey/60">Release Date</span>
                                <span className="text-sm font-medium text-dark-grey/80">May 2017</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-xs uppercase font-bold text-dark-grey/60">Language</span>
                                <span className="text-sm font-medium text-dark-grey/80">English</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-xs uppercase font-bold text-dark-grey/60">Format</span>
                                <span className="text-sm font-medium text-dark-grey/80">21 x 26 cm</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-xs uppercase font-bold text-dark-grey/60">ISBN</span>
                                <span className="text-sm font-medium text-dark-grey/80">978-3-89955-698-8</span>
                            </div>
                        </div>

                        {book.subjects && book.subjects.length > 0 && (
                            <div className="space-y-4">
                                <p className="text-[9px] uppercase font-bold text-dark-grey/60 tracking-[0.2em]">Genres</p>
                                <div className="flex flex-wrap gap-2">
                                    {book.subjects.slice(0, 8).map((subject, index) => (
                                        <span key={index} className="text-sm font-medium text-dark-grey/70 hover:text-dark-grey cursor-default transition-colors">
                                            {subject}{index < 7 && index < book.subjects!.length - 1 ? " • " : ""}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                </div>

              

                <Recommendations book={book} />

                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Synopsis"
                    showDivider
                    width="w-[90%] max-w-[600px]"
                >
                    <div className="max-h-[60vh] overflow-y-auto pr-2 no-scrollbar space-y-4">
                        {cleanDescription?.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => (
                            <p key={index} className="text-dark-grey/80 text-base leading-relaxed text-wrap font-medium">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </Modal>
            </Wrapper>
        </div>
    )
}

export default BookClient