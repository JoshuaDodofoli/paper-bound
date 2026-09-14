'use client'

import Wrapper from "@/components/primitives/Wrapper"
import type { Author } from "@/domain/authors/types"
import BackButton from "@/components/primitives/BackButton"
import { BookOpen, Star } from "lucide-react"
import BookCard from "@/components/domain/books/BookCard"
import { motion } from "motion/react"

const AuthorClient = ({ author }: { author: Author }) => {
  return (
    <div className="mt-20 mb-32">
      <Wrapper>
        <BackButton label="Back to Dashboard" className="mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr] gap-8 items-start">
          {/* Sidebar - Left Column */}
          <aside className="flex flex-row lg:flex-col gap-8 lg:gap-10 items-start">
            {/* The "Box" instead of an image */}
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 bg-stone/20 rounded-sm blur-sm group-hover:blur-md transition-all duration-500" />
              <div className="relative w-36 sm:w-48 aspect-3/4 bg-stone/40 border border-stone/50 rounded-sm overflow-hidden flex items-center justify-center shadow-book">
                <div className="absolute inset-0 opacity-10 pointer-events-none " />
                <div className="text-center p-4 sm:p-8 space-y-4">
                  <div className="size-12 sm:size-16 mx-auto rounded-full bg-paper/50 flex items-center justify-center border border-dark-grey/10">
                    <span className="text-xl sm:text-2xl font-serif text-dark-grey/40">{author.name.charAt(0)}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-dark-grey/40 font-bold">Author Portrait</p>
                    <p className="text-xs sm:text-sm font-serif italic text-dark-grey/60 line-clamp-1">{author.name}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-6 sm:space-y-8 px-2">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                <div className="flex items-center gap-1 bg-amber-400/10 text-amber-500 px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                  <Star size={14} fill="currentColor" />
                  4.8
                </div>
                <span className="hidden sm:block text-dark-grey/30">•</span>
                <div className="text-dark-grey/50 text-xs sm:text-sm font-medium whitespace-nowrap">1,200 Reviews</div>
              </div>

              <div className="flex items-center gap-4 group">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-dark-grey/40 font-bold">Born</p>
                  <p className="text-sm text-dark-grey/80">{author.born}</p>
                </div>
              </div>

              {author.genres.length > 0 && (
                <div className="space-y-3">
                  <p className="text-[10px] uppercase tracking-wider text-dark-grey/40 font-bold flex items-center gap-2 px-1">
                    <BookOpen size={12} />
                    Genres
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {author.genres.map(genre => (
                      <span key={genre} className="px-3 py-1 bg-stone/30 border border-stone/50 rounded-full text-[10px] sm:text-xs text-dark-grey/70">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          <main className="space-y-16">
            <header className="space-y-6">
              <h1 className="text-3xl font-serif font-bold text-dark-grey leading-tight tracking-tighter">
                {author.name}
              </h1>
              <div className="w-24 h-1 bg-brand/40 rounded-full" />
            </header>

            <section className="space-y-6">
              <h2 className="text-xs uppercase tracking-[0.3em] text-dark-grey/40 font-bold">Biography</h2>
              <div className="max-w-2xl">
                <p className="text-base font-serif leading-relaxed text-dark-grey/80 whitespace-pre-wrap first-letter:text-2xl first-letter:font-bold first-letter:mr-1 first-letter:float-left">
                  {author.bio}
                </p>
              </div>
            </section>

            <section className="space-y-8 border-t border-stone pt-16">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-serif font-bold text-dark-grey">{author.name}&apos;s books</h2>
                <span className="text-sm text-dark-grey/40">{author.works.length} titles</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                {author.works.map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <BookCard
                      id={book.id}
                      slug={book.slug}
                      title={book.title}
                      author={book.author}
                      coverColor={book.color}
                      width="w-full"
                    />
                  </motion.div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </Wrapper>
    </div>
  )
}

export default AuthorClient
