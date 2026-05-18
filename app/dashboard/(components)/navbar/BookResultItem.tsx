'use client'

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface BookResultItemProps {
    slug: string;
    title: string;
    author: string;
    coverUrl: string | null | undefined;
    query?: string;
    onClick: () => void;
}

const HighlightText = ({ text, query }: { text: string; query: string }) => {
    if (!query || !query.trim()) return <span>{text}</span>;
    
    const words = query.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return <span>{text}</span>;
    
    const escapedWords = words.map(w => w.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    const regex = new RegExp(`(${escapedWords.join('|')})`, 'gi');
    const parts = text.split(regex);
    
    return (
        <span>
            {parts.map((part, i) => 
                regex.test(part) ? (
                    <span key={i} className="font-extrabold text-dark-grey bg-stone/40 rounded-sm px-0.5">{part}</span>
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </span>
    );
};

export default function BookResultItem({ slug, title, author, coverUrl, query = "", onClick }: BookResultItemProps) {
    return (
        <Link
            href={`/dashboard/book/${slug}`}
            onClick={onClick}
            className='relative'
        >
            <motion.div
                whileHover={{ x: 4, backgroundColor: 'rgba(0,0,0,0.04)' }}
                className="flex items-center gap-4 p-3 rounded-3xl cursor-pointer group transition-all"
            >
                <div className="relative aspect-3/4 w-16 rounded-xl bg-dark-grey/5 flex items-center justify-center text-dark-grey/40 transition-colors overflow-hidden">
                    {coverUrl ? (
                        <Image
                            src={coverUrl}
                            alt={title}
                            fill
                            sizes="56px"
                            className='object-center object-contain'
                        />
                    ) : (
                        <span className="text-[10px] font-serif font-bold text-center px-1 line-clamp-2 leading-none">{title}</span>
                    )}
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-dark-grey/90">
                        <HighlightText text={title} query={query} />
                    </p>
                    <p className="text-sm text-dark-grey/50">
                        by <HighlightText text={author} query={query} />
                    </p>
                </div>
                <ArrowUpRight size={16} className="text-dark-grey/20 group-hover:text-dark-grey/50 transition-colors" />
            </motion.div>
        </Link>
    );
}
