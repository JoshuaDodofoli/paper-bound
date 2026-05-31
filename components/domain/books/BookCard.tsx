'use client'

import { Plus } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

interface BookCardProps {
  id?: string;
  slug: string;
  title: string;
  author: string;
  coverColor?: string;
  aspectRatio?: string;
  width?: string;
}

const BookCard = ({
  slug,
  title,
  author,
  coverColor = "bg-red-200",
  aspectRatio = "aspect-3/4",
  width = "w-40",
}: BookCardProps) => {
  return (
    <Link href={`/dashboard/book/${slug}`} className="shrink-0 block group">
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`relative ${width} ${aspectRatio} ${coverColor} rounded-sm shadow-book transition-shadow hover:shadow-book-hover overflow-hidden`}
      >
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black/10" />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
            type="button"
            aria-label={`Quick add ${title}`}
            className="bg-white/20 hover:bg-white/40 p-2 rounded-full border border-white/40 text-white transition-colors cursor-pointer"
          >
            <Plus size={20} />
          </motion.button>
        </div>

        <div className="p-4 h-full flex flex-col justify-end">
          <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest truncate">{author}</p>
          <p className="text-xs font-serif font-bold text-black/80 leading-tight line-clamp-2">{title}</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default BookCard;
