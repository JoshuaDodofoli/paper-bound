'use client'

import Wrapper from "@/app/components/Wrapper"
import { Author } from "@/app/lib/interface"
import BackButton from "../../(components)/ui/BackButton"
import { Star } from "lucide-react"
import BookCard from "../../(components)/book/BookCard"
import { motion } from "motion/react"
import { useDraggableScroll } from "@/app/hooks/useDraggableScroll"
import Sidebar from './Sidebar'

const AuthorClient = ({ author }: { author: Author }) => {
  const worksScroll = useDraggableScroll()

  return (
    <div className="w-full min-h-screen bg-[#F5F5F5] pt-12 pb-24">
      <Wrapper>
        <div className="flex items-center justify-between mb-16 border-b border-black/5 pb-4">
          <BackButton label="Back" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-dark-grey/60">Author Profile</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-20 items-start">
          {/* Left Column: Author Portrait & Info */}
          <div className="relative flex flex-col items-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white/40 blur-3xl -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-dark-grey/5 -z-20" />

            <Sidebar author={author} />
          </div>

          {/* Right Column: Biography & Metadata */}
          <div className="max-w-2xl space-y-16">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="space-y-4"
            >
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-dark-grey leading-[1.1] tracking-tight">
                {author.name}
              </h1>
            </motion.div>

            <div className="space-y-8">
              <div className="">
                <h3 className="mb-2 text-lg">Biography</h3>
                <div className="space-y-4">
                  <p className="text-base leading-relaxed text-dark-grey/70 text-wrap font-medium">
                    {author.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-x-20 gap-y-8 py-10 border-y border-black/5">
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase font-bold text-dark-grey/60">Born</span>
                <span className="text-sm font-medium text-dark-grey/80">{author.born}</span>
              </div>
              {author.website && (
                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase font-bold text-dark-grey/60">Website</span>
                  <a
                    href={author.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-dark-grey/80 hover:underline truncate max-w-[200px]"
                  >
                    {author.website.replace('https://', '').replace('www.', '')}
                  </a>
                </div>
              )}
              {author.topWork && (
                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase font-bold text-dark-grey/60">Top Work</span>
                  <span className="text-sm font-medium text-dark-grey/80 italic truncate max-w-[200px]">{author.topWork}</span>
                </div>
              )}
              {author.workCount !== undefined && author.workCount > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase font-bold text-dark-grey/60">Total Works</span>
                  <span className="text-sm font-medium text-dark-grey/80">{author.workCount.toLocaleString()} Books</span>
                </div>
              )}
              <div className="flex flex-col gap-2 col-span-2">
                <span className="text-xs uppercase font-bold text-dark-grey/60">Rating</span>
                <div className="flex items-center gap-1 text-sm font-medium text-dark-grey/80">
                  <Star size={14} className="text-amber-500" fill="currentColor" />
                  {author.ratingsAverage ?? "4.8"} <span className="text-dark-grey/40">({(author.ratingsCount ?? 1200).toLocaleString()} Reviews)</span>
                </div>
              </div>
            </div>

            {/* Genres */}
            {author.genres && author.genres.length > 0 && (
              <div className="space-y-4">
                <p className="text-[9px] uppercase font-bold text-dark-grey/60 tracking-[0.2em]">Genres</p>
                <div className="flex flex-wrap gap-2">
                  {author.genres.slice(0, 8).map((genre, index) => (
                    <span key={index} className="text-sm font-medium text-dark-grey/70 hover:text-dark-grey cursor-default transition-colors">
                      {genre}{index < 7 && index < author.genres.length - 1 ? " • " : ""}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Author Works Carousel */}
        {author.works && author.works.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="mt-24 space-y-6"
          >
            <p className="text-[10px] uppercase font-bold text-dark-grey/40 tracking-[0.2em]">
              Author Works
            </p>
            <div
              ref={worksScroll.ref}
              {...worksScroll.props}
              className="flex gap-6 overflow-x-auto no-scrollbar pb-4"
            >
              {author.works.map((book) => (
                <BookCard
                  key={book.id || book.key}
                  id={book.id || book.key}
                  slug={book.slug}
                  title={book.title}
                  author={book.author}
                  coverId={book.coverId || undefined}
                  coverColor={book.color}
                  width="w-52"
                />
              ))}
            </div>
          </motion.div>
        )}
      </Wrapper>
    </div>
  )
}

export default AuthorClient