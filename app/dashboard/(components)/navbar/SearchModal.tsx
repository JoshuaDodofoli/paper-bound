'use client'
import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react'
import { Search, Book, User, ArrowUpRight } from 'lucide-react';
import Modal from '../Modal';

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
        <Modal
            title="Search"
            onClose={handleCloseSearch}
            center={false}
            width="w-[90%] max-w-[550px]"
            zIndex={60}
            className="rounded-4xl overflow-hidden"
        >
            <div className="-mt-2">
                <span className='text-xs text-dark-grey/40 font-bold uppercase tracking-widest mb-2 block'>search through our library</span>
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
        </Modal>
    )
}

export default SearchModal