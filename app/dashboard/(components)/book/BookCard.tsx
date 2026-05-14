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
    coverId?: number | string;
    coverColor?: string;
    aspectRatio?: string;
    width?: string;
}

const BookCard = ({ 
    id, 
    slug,
    title, 
    author, 
    coverId,
    coverColor = "bg-red-200", 
    aspectRatio = "aspect-[3/4]",
    width = "w-40"
}: BookCardProps) => {
    return (
        <Link href={`/dashboard/book/${slug}`} className="shrink-0 block group">
            <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative ${width} ${aspectRatio} ${coverColor} rounded-sm shadow-book transition-shadow hover:shadow-book-hover overflow-hidden`}
            >
                {coverId && (
                    <Image
                        src={`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`}
                        alt={title}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    />
                )}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black/10 z-10" />

                <div className="absolute inset-0 p-4 flex flex-col justify-end z-20 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-[10px] font-bold text-white uppercase tracking-widest truncate">{author}</p>
                    <p className="text-xs font-serif font-bold text-white/90 leading-tight line-clamp-2">{title}</p>
                </div>
            </motion.div>
        </Link>
    )
}

export default BookCard
