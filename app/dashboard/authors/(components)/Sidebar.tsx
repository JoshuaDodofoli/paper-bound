'use client'
import { motion } from 'motion/react';
import Image from 'next/image';
import { Author } from '@/app/lib/interface';

const Sidebar = ({ author }: { author: Author }) => {
    return (
        <div className="w-full max-w-[320px]">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="aspect-2/3 w-full shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden flex items-center justify-center bg-stone/40 border border-stone/50"
            >  
                {author.image ? (
                    <Image
                        src={author.image}
                        alt={author.name}
                        fill
                        className="object-cover object-center"
                        priority
                    />
                ) : (
                    <div className="text-center p-8 space-y-6">
                        <div className="size-20 mx-auto rounded-full bg-paper/50 flex items-center justify-center border border-dark-grey/10">
                            <span className="text-3xl font-serif text-dark-grey/40">{author.name.charAt(0)}</span>
                        </div>
                        <div className="space-y-2">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-dark-grey/40 font-bold">Author Portrait</p>
                            <p className="text-lg font-serif italic text-dark-grey/60 line-clamp-2 px-4">{author.name}</p>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    )
}

export default Sidebar
