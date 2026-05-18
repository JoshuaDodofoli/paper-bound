'use client'

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import AuthorSearchAvatar from '../ui/AuthorSearchAvatar';

interface AuthorResultItemProps {
    slug: string;
    name: string;
    image: string | null;
    topWork?: string;
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

export default function AuthorResultItem({ slug, name, image, topWork, query = "", onClick }: AuthorResultItemProps) {
    return (
        <Link
            href={`/dashboard/authors/${slug}`}
            onClick={onClick}
            className='relative'
        >
            <motion.div
                whileHover={{ x: 4, backgroundColor: 'rgba(0,0,0,0.04)' }}
                className="flex items-center gap-4 p-3 rounded-3xl cursor-pointer group transition-all"
            >
                <AuthorSearchAvatar name={name} coverUrl={image} />
                <div className="flex-1">
                    <p className="font-semibold text-dark-grey/90">
                        <HighlightText text={name} query={query} />
                    </p>
                    {topWork && (
                        <p className="text-xs text-dark-grey/50 truncate max-w-[320px]">
                            Top Work: <span className="italic font-medium">{topWork}</span>
                        </p>
                    )}
                </div>
                <ArrowUpRight size={16} className="text-dark-grey/20 group-hover:text-dark-grey/50 transition-colors" />
            </motion.div>
        </Link>
    );
}
