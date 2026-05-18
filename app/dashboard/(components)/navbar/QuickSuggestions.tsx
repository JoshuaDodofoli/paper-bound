'use client'

import React from 'react';
import { motion } from 'motion/react';

interface QuickSuggestionsProps {
    setQuery: (query: string) => void;
}

const suggestions = ['Fantasy', 'Sci-Fi', 'Mystery', 'Haruki Murakami', 'Classic Fiction', 'The Hobbit'];

export default function QuickSuggestions({ setQuery }: QuickSuggestionsProps) {
    return (
        <motion.div
            key="suggestions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
        >
            <h4 className='text-xs text-dark-grey/40 font-bold uppercase tracking-widest ml-1'>Quick Suggestions</h4>
            <div className="flex flex-wrap gap-2">
                {suggestions.map((tag) => (
                    <motion.button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        whileHover={{ scale: 1.03, backgroundColor: '#fff' }}
                        whileTap={{ scale: 0.97 }}
                        className="px-4 py-2 bg-dark-grey/5 border border-stone/40 rounded-xl text-sm text-dark-grey/70 cursor-pointer transition-all font-medium"
                    >
                        {tag}
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
}
