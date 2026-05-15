'use client'
import { BookOpen, Bookmark } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Book } from '@/app/lib/interface';

const Sidebar = ({ book }: { book: Book }) => {
    return (
        <div className="w-full max-w-[320px]">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="aspect-2/3 w-full shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden flex items-center justify-center bg-white"
            >
                {/* Book Spine Shadow */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black/10 z-20 pointer-events-none" />
                <div className="absolute left-1.5 top-0 bottom-0 w-px bg-white/20 z-20 pointer-events-none" />
                
                {book.coverId && (
                    <Image
                        src={`https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`}
                        alt={book.title}
                        fill
                        className="object-fit object-center"
                        priority
                    />
                )}
            </motion.div>
        </div>
    )
}

export default Sidebar