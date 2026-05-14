'use client'

import React from 'react'
import BookCard from '../../(components)/book/BookCard'
import Wrapper from '@/app/components/Wrapper';

interface SearchResult {
    id: string;
    slug: string;
    title: string;
    author: string;
    authorSlug: string;
    coverId?: number | string;
}

interface SearchClientProps {
    query: string;
    results: SearchResult[];
}

const colors = [
    'bg-red-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200',
    'bg-purple-200', 'bg-orange-200', 'bg-pink-200', 'bg-teal-200'
];

export default function SearchClient({ query, results }: SearchClientProps) {
    return (
        <div className="w-full  px-6 py-12">
            <Wrapper>

                <div className="mb-12">
                    <h1 className="text-4xl font-serif text-[#1e1a15] mb-2">Search Results</h1>
                    <p className="text-[#1e1a15]/60 text-lg">
                        Showing results for <span className="font-semibold text-[#1e1a15]">"{query}"</span>
                    </p>
                </div>

                {results.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
                        {results.map((book, index) => {
                            const coverColor = colors[index % colors.length];
                            return (
                                <div key={book.id} className="flex justify-center">
                                    <BookCard
                                        id={book.id}
                                        slug={book.slug}
                                        title={book.title}
                                        author={book.author}
                                        coverId={book.coverId}
                                        coverColor={coverColor}
                                        width="w-full"
                                    />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-[#FAF9F7]/60 rounded-xl border border-[#EAE6DF] shadow-sm backdrop-blur-sm">
                        <h3 className="text-2xl font-serif text-[#1e1a15] mb-2">No results found</h3>
                        <p className="text-[#1e1a15]/60">
                            We couldn't find any books matching "{query}". Try adjusting your search term.
                        </p>
                    </div>
                )}
            </Wrapper>
        </div>
    )
}