'use client'
import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react'
import { Search, Book, User, ArrowUpRight } from 'lucide-react';

interface SearchModalProps {
    isSearchOpen: boolean;
    setIsSearchOpen: (value: boolean) => void;
}

const MOCK_DATA = [
    { id: 1, title: "The Hobbit", subtitle: "J.R.R. Tolkien", type: "book" },
    { id: 2, title: "Hard-Boiled Wonderland", subtitle: "Haruki Murakami", type: "book" },
    { id: 3, title: "Norwegian Wood", subtitle: "Haruki Murakami", type: "book" },
    { id: 4, title: "Foundation", subtitle: "Isaac Asimov", type: "book" },
    { id: 5, title: "Haruki Murakami", subtitle: "Author • 14 Books", type: "author" },
    { id: 6, title: "Stephen King", subtitle: "Author • 64 Books", type: "author" },
    { id: 7, title: "The Shining", subtitle: "Stephen King", type: "book" },
    { id: 8, title: "1Q84", subtitle: "Haruki Murakami", type: "book" },
];

const SearchModal = ({ isSearchOpen, setIsSearchOpen }: SearchModalProps) => {
    const [query, setQuery] = useState("");

    const handleCloseSearch = () => {
        setIsSearchOpen(false);
    }

    const filteredResults = query.length > 0
        ? MOCK_DATA.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.subtitle.toLowerCase().includes(query.toLowerCase())
        )
        : [];

    return (
        <div>
            <>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-30 bg-black/40 backdrop-blur-md"
                    onClick={handleCloseSearch}
                />

                <motion.div
                    initial={{ y: 20, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 10, opacity: 0, scale: 0.95 }}
                    className="fixed z-40 top-[15%] left-1/2 bg-paper rounded-4xl -translate-x-1/2 w-[90%] max-w-[550px] shadow-2xl border border-stone/50 overflow-hidden"
                >
                    <div className="p-6">

                        <div className="flex mb-6 items-center justify-between w-full">
                            <h3 className='text-xl'>Search</h3>
                            <motion.button whileTap={{ scale: 0.95 }} className="bg-stone px-3 py-1 text-sm rounded-full text-dark-grey/95 cursor-pointer" onClick={handleCloseSearch}>Close</motion.button>
                        </div>
                        <span className='text-xs text-dark-grey/40 font-bold uppercase tracking-widest mb-2'>search through our library</span>
                        <div className="relative flex items-center mb-6">
                            <Search className="absolute left-4 text-dark-grey/40" size={20} />
                            <input
                                autoFocus
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder='Search books, authors, genres...'
                                className='w-full bg-dark-grey/5 border-stone/50 border-2 text-dark-grey placeholder:text-base rounded-3xl py-3 pl-12 pr-4 outline-none focus:border-stone transition-all text-lg font-medium'
                            />
                            {query && (
                                <button
                                    onClick={() => setQuery("")}
                                    className="absolute right-4 text-xs font-bold text-dark-grey/40 hover:text-dark-grey/60 cursor-pointer"
                                >
                                    CLEAR
                                </button>
                            )}
                        </div>

                        <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                            <AnimatePresence mode="wait">
                                {query.length === 0 ? (
                                    <motion.div
                                        key="suggestions"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-4"
                                    >
                                        <h4 className='text-xs text-dark-grey/40 font-bold uppercase tracking-widest ml-1'>Quick Suggestions</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['Fantasy', 'Sci-Fi', 'Mystery', 'Haruki Murakami', 'Classic Fiction', 'The Hobbit'].map((tag) => (
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
                                ) : (
                                    <motion.div
                                        key="results"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-2"
                                    >
                                        <div className="flex items-center justify-between ml-1 mb-2">
                                            <h4 className='text-xs text-dark-grey/40 font-bold uppercase tracking-widest'>Results for "{query}"</h4>
                                            <span className="text-[10px] bg-stone text-dark-grey/80 px-2 py-0.5 rounded-full font-bold">{filteredResults.length} FOUND</span>
                                        </div>

                                        {filteredResults.length > 0 ? (
                                            filteredResults.map((item) => (
                                                <motion.div
                                                    key={item.id}
                                                    whileHover={{ x: 4, backgroundColor: 'rgba(0,0,0,0.04)' }}
                                                    className="flex items-center gap-4 p-3 rounded-3xl cursor-pointer group transition-all"
                                                >
                                                    <div className="w-10 h-10 rounded-xl bg-dark-grey/5 flex items-center justify-center text-dark-grey/40 group-hover:bg-amber-400/20 group-hover:text-amber-300 transition-colors">
                                                        {item.type === 'book' ? <Book size={18} /> : <User size={18} />}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-dark-grey/90">{item.title}</p>
                                                        <p className="text-xs text-dark-grey/50">{item.subtitle}</p>
                                                    </div>
                                                    <ArrowUpRight size={16} className="text-dark-grey/20 group-hover:text-dark-grey/50 transition-colors" />
                                                </motion.div>
                                            ))
                                        ) : (
                                            <div className="py-10 text-center">
                                                <p className="text-dark-grey/40 font-medium">No results found for "{query}"</p>
                                                <p className="text-xs text-dark-grey/30 mt-1">Try searching for a different book or author</p>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Bottom Action Bar */}
                    {/* <div className="bg-dark-grey/5 p-4 flex justify-between items-center px-8 border-t border-stone/30">
                        <p className="text-[10px] text-dark-grey/40 font-medium tracking-wide">PRESS <span className="bg-stone/50 px-1.5 py-0.5 rounded border border-stone/80 text-dark-grey/60 mx-1">ESC</span> TO CLOSE</p>
                        <button onClick={handleCloseSearch} className="text-xs font-bold text-dark-grey/60 hover:text-dark-grey/90 transition-colors cursor-pointer">DISMISS</button>
                    </div> */}
                </motion.div>
            </>
        </div>
    )
}

export default SearchModal