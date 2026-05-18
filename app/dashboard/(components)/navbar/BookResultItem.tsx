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
    onClick: () => void;
}

export default function BookResultItem({ slug, title, author, coverUrl, onClick }: BookResultItemProps) {
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
                    <p className="font-semibold text-dark-grey/90">{title}</p>
                    <p className="text-sm text-dark-grey/50">by {author}</p>
                </div>
                <ArrowUpRight size={16} className="text-dark-grey/20 group-hover:text-dark-grey/50 transition-colors" />
            </motion.div>
        </Link>
    );
}
