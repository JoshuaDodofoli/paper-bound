'use client'

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowUpRight, Tag } from 'lucide-react';

interface GenreResultItemProps {
    name: string;
    onClick: () => void;
}

export default function GenreResultItem({ name, onClick }: GenreResultItemProps) {
    return (
        <Link
            href={`/dashboard/search?q=${encodeURIComponent(name)}`}
            onClick={onClick}
            className='relative'
        >
            <motion.div
                whileHover={{ x: 4, backgroundColor: 'rgba(0,0,0,0.04)' }}
                className="flex items-center gap-4 p-3 rounded-3xl cursor-pointer group transition-all"
            >
                <div className="w-12 h-12 rounded-full bg-dark-grey/5 border border-stone/50 flex items-center justify-center text-dark-grey/50 shadow-xs shrink-0 transition-colors group-hover:bg-white group-hover:text-dark-grey">
                    <Tag size={18} />
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-dark-grey/90">{name}</p>
                    <p className="text-xs text-dark-grey/40">Explore books in this category</p>
                </div>
                <ArrowUpRight size={16} className="text-dark-grey/20 group-hover:text-dark-grey/50 transition-colors" />
            </motion.div>
        </Link>
    );
}
