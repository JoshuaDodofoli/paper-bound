'use client'
import { motion, AnimatePresence } from 'motion/react';
import { KeyboardEvent, useEffect, useState } from 'react'
import Image from 'next/image';
import { Search, ArrowUpRight, Loader2 } from 'lucide-react';
import Modal from '../ui/Modal';
import AuthorSearchAvatar from '../ui/AuthorSearchAvatar';
import Link from 'next/link';
import { SearchResults } from '@/app/lib/interface';
// Hardcover search is now proxied through /api/search (server-side, keeps API key safe)
import { useRouter } from 'next/navigation';

interface SearchModalProps {
    isSearchOpen: boolean;
    setIsSearchOpen: (value: boolean) => void;
}


const SearchModal = ({ isSearchOpen, setIsSearchOpen }: SearchModalProps) => {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [bookResults, setBookResults] = useState<SearchResults[]>([]);
    const [authorResults, setAuthorResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'books' | 'authors'>('books');

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && query.length > 0) {
            router.push(`/dashboard/search?q=${encodeURIComponent(query)}`)
            setIsSearchOpen(false);
        }
    }

    useEffect(() => {
        if (query.length === 0) {
            setBookResults([]);
            setAuthorResults([]);
            return;
        }

        const timeout = setTimeout(async () => {
            setIsLoading(true);

            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                const { books, authors } = await res.json();

                setBookResults((books ?? []).map((b: any) => ({
                    key: b.slug,
                    slug: b.slug,
                    title: b.title,
                    author: b.author,
                    coverUrl: b.coverUrl,
                })));

                setAuthorResults((authors ?? []).map((a: any) => ({
                    key: a.slug,
                    slug: a.slug,
                    name: a.name,
                    image: a.image,
                    topWork: a.topWork,
                })));

            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setIsLoading(false);
            }
        }, 500)

        return () => clearTimeout(timeout)
    }, [query])

    const handleCloseSearch = () => {
        setIsSearchOpen(false);
    }

    return (
        <Modal
            isOpen={isSearchOpen}
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
                        onKeyDown={handleKeyDown}
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
                        {isLoading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-col items-center justify-center py-16 space-y-4"
                            >
                                <Loader2 className="text-dark-grey/30 animate-spin" size={32} />
                                <p className="text-sm font-medium text-dark-grey/40">Searching library...</p>
                            </motion.div>
                        ) : query.length === 0 ? (
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
                                className="space-y-4"
                            >
                                <div className="flex items-center justify-between ml-1 mb-2">
                                    <h4 className='text-xs text-dark-grey/40 font-bold uppercase tracking-widest'>Results for "{query}"</h4>
                                    <span className="text-[10px] bg-stone text-dark-grey/80 px-2 py-0.5 rounded-full font-bold">
                                        {bookResults.length + authorResults.length} FOUND
                                    </span>
                                </div>

                                {/* Tabs Switcher */}
                                <div className="flex border-b border-dark-grey/5 mb-6 gap-6 px-1">
                                    <button
                                        onClick={() => setActiveTab('books')}
                                        className={`pb-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
                                            activeTab === 'books'
                                                ? 'border-stone text-dark-grey'
                                                : 'border-transparent text-dark-grey/40 hover:text-dark-grey/60'
                                        }`}
                                    >
                                        Books ({bookResults.length})
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('authors')}
                                        className={`pb-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
                                            activeTab === 'authors'
                                                ? 'border-stone text-dark-grey'
                                                : 'border-transparent text-dark-grey/40 hover:text-dark-grey/60'
                                        }`}
                                    >
                                        Authors ({authorResults.length})
                                    </button>
                                </div>

                                {activeTab === 'books' ? (
                                    bookResults.length > 0 ? (
                                        <div className="space-y-2">
                                            {bookResults.map((item, i) => (
                                                <div key={`book-${item.key}-${i}`}>
                                                    <Link
                                                        href={`/dashboard/book/${item.slug || item.key}`}
                                                        onClick={() => setIsSearchOpen(false)}
                                                        className='relative'
                                                    >
                                                        <motion.div
                                                            whileHover={{ x: 4, backgroundColor: 'rgba(0,0,0,0.04)' }}
                                                            className="flex items-center gap-4 p-3 rounded-3xl cursor-pointer group transition-all"
                                                        >
                                                            <div className="relative aspect-3/4 w-16 rounded-xl bg-dark-grey/5 flex items-center justify-center text-dark-grey/40 transition-colors overflow-hidden">
                                                                {item.coverUrl ? (
                                                                    <Image
                                                                        src={item.coverUrl}
                                                                        alt={item.title}
                                                                        fill
                                                                        sizes="56px"
                                                                        className='object-center object-contain'
                                                                    />
                                                                ) : (
                                                                    <span className="text-[10px] font-serif font-bold text-center px-1 line-clamp-2 leading-none">{item.title}</span>
                                                                )}
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="font-semibold text-dark-grey/90">{item.title}</p>
                                                                <p className="text-sm text-dark-grey/50">by {item.author}</p>
                                                            </div>
                                                            <ArrowUpRight size={16} className="text-dark-grey/20 group-hover:text-dark-grey/50 transition-colors" />
                                                        </motion.div>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-10 text-center">
                                            <p className="text-dark-grey/40 font-medium">No books found for "{query}"</p>
                                        </div>
                                    )
                                ) : (
                                    authorResults.length > 0 ? (
                                        <div className="space-y-2">
                                            {authorResults.map((item, i) => (
                                                <div key={`author-${item.slug}-${i}`}>
                                                    <Link
                                                        href={`/dashboard/authors/${item.slug}`}
                                                        onClick={() => setIsSearchOpen(false)}
                                                        className='relative'
                                                    >
                                                        <motion.div
                                                            whileHover={{ x: 4, backgroundColor: 'rgba(0,0,0,0.04)' }}
                                                            className="flex items-center gap-4 p-3 rounded-3xl cursor-pointer group transition-all"
                                                        >
                                                            <AuthorSearchAvatar name={item.name} coverUrl={item.image} />
                                                            <div className="flex-1">
                                                                <p className="font-semibold text-dark-grey/90">{item.name}</p>
                                                                {item.topWork && (
                                                                    <p className="text-xs text-dark-grey/50 truncate max-w-[320px]">
                                                                        Top Work: <span className="italic font-medium">{item.topWork}</span>
                                                                    </p>
                                                                )}
                                                            </div>
                                                            <ArrowUpRight size={16} className="text-dark-grey/20 group-hover:text-dark-grey/50 transition-colors" />
                                                        </motion.div>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-10 text-center">
                                            <p className="text-dark-grey/40 font-medium">No authors found for "{query}"</p>
                                        </div>
                                    )
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