'use client'
import React from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import Image from 'next/image'
import { Plus } from 'lucide-react'

interface BookCardProps {
    id: string;
    slug: string;
    title: string;
    author: string;
    coverUrl?: string | null;
    coverColor?: string;
    aspectRatio?: string;
    width?: string;
}

const BookCard = ({ 
    id, 
    slug,
    title, 
    author, 
    coverUrl,
    coverColor = "bg-red-200", 
    aspectRatio = "aspect-3/4",
    width = "w-44"
}: BookCardProps) => {
    const [imageError, setImageError] = React.useState(false);

    return (
        <Link href={`/dashboard/book/${slug}`} className={`shrink-0 block group ${width === 'w-full' ? 'w-full' : ''}`}>
            <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative ${width} ${aspectRatio} ${coverColor} shadow-book transition-shadow hover:shadow-book-hover overflow-hidden border border-black/5`}
            >
                {coverUrl && !imageError ? (
                    <Image
                        src={coverUrl}
                        alt={title}
                        fill
                        className="object-cover object-center"
                        onError={() => setImageError(true)}
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    />
                ) : (
                    <div className="absolute inset-0 p-4 flex flex-col justify-between bg-[#fbfaf8] text-dark-grey border-l-4 border-l-amber-900/20 select-none">
                        <div className="space-y-1">
                            <p className="text-[8px] uppercase tracking-widest font-bold text-dark-grey/40 line-clamp-1">{author}</p>
                            <div className="h-1px bg-dark-grey/10 w-8 my-2" />
                        </div>
                        <p className="text-xs font-serif font-bold text-dark-grey/80 leading-snug line-clamp-4">{title}</p>
                        <p className="text-[7px] uppercase tracking-wider font-semibold text-dark-grey/30">LITERARY CLASSIC</p>
                    </div>
                )}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black/10 z-10" />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs z-30">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log("Quick add book:", id);
                        }}
                        className="bg-white/20 hover:bg-white/40 p-2 rounded-full border border-white/40 text-white transition-colors cursor-pointer"
                    >
                        <Plus size={20} />
                    </motion.button>
                </div>

                <div className="absolute inset-0 p-4 flex flex-col justify-end z-20 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-xs font-bold text-white uppercase tracking-widest truncate">{author}</p>
                    <p className="text-xs font-serif font-bold text-white/90 leading-tight line-clamp-2">{title}</p>
                </div>
            </motion.div>
        </Link>
    )
}

export default BookCard
