'use client'

import { useDraggableScroll } from "@/app/hooks/useDraggableScroll";
import BookCard from "../../(components)/book/BookCard";
import Wrapper from "@/app/components/Wrapper";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Book } from "@/app/lib/interface";

interface HomeClientProps {
  readingBooks: Book[];
  trendingBooks: Book[];
  arrivalsBooks: Book[];
}

const HomeClient = ({ readingBooks, trendingBooks, arrivalsBooks }: HomeClientProps) => {
  const readingScroll = useDraggableScroll();
  const trendingScroll = useDraggableScroll();
  const arrivalsScroll = useDraggableScroll();

  return (
    <div className="mt-14">
      {/* READING SECTION */}
      {readingBooks.length > 0 && (
        <section>
          <Wrapper>
            <Link href="/dashboard/reading" className="flex items-center gap-1 group w-fit mb-4">
              <h2 className="text-xl">Reading</h2>
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform text-dark-grey/90" />
            </Link>

            <div
              ref={readingScroll.ref}
              {...readingScroll.props}
              className={`
              flex gap-6 overflow-x-auto pt-2 pb-8 px-4 -mt-2 -mb-8 -mx-4 flex-nowrap no-scrollbar carousel-fade
              ${readingScroll.isDragging ? 'cursor-grabbing pointer-events-none' : 'cursor-grab'}
              select-none active:cursor-grabbing
            `}
            >
              {readingBooks.map((book) => (
                <BookCard
                  key={book.id}
                  id={book.id || book.key || ''}
                  slug={book.slug}
                  title={book.title}
                  author={book.author}
                  coverId={book.coverId}
                  coverColor={book.color}
                  aspectRatio="aspect-video"
                  width="w-72"
                />
              ))}
            </div>
          </Wrapper>
        </section>
      )}

      {/* TRENDING SECTION */}
      {trendingBooks.length > 0 && (
        <section className="section-gradient">
          <Wrapper>
            <Link href="/dashboard/trending" className="flex items-center gap-1 group w-fit mb-4">
              <h2 className="text-xl">Trending</h2>
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform text-dark-grey/90" />
            </Link>

            <div
              ref={trendingScroll.ref}
              {...trendingScroll.props}
              className={`
              flex gap-6 overflow-x-auto pt-2 pb-8 px-4 -mt-2 -mb-8 -mx-4 flex-nowrap no-scrollbar carousel-fade
              ${trendingScroll.isDragging ? 'cursor-grabbing pointer-events-none' : 'cursor-grab'}
              select-none active:cursor-grabbing
            `}
            >
              {trendingBooks.map((book) => (
                <BookCard
                  key={book.id}
                  id={book.id || book.key || ''}
                  slug={book.slug}
                  title={book.title}
                  author={book.author}
                  coverId={book.coverId}
                  coverColor={book.color}
                />
              ))}
            </div>
          </Wrapper>
        </section>
      )}

      {/* GENRE SPOTLIGHTS */}
      <section className="section-gradient">
        <Wrapper>
          <h2 className="text-xl">Genre Spotlights</h2>

          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex w-full shadow-lg items-center justify-between bg-stone/40 p-6 rounded-2xl border border-stone">
              <div className="space-y-1">
                <h3 className="text-2xl">Fiction</h3>
                <p className="text-sm text-dark-grey/60 font-medium">1,240 books</p>
              </div>
              <div className="bg-amber-100 w-24 h-32 rounded-sm shadow-book -rotate-6" />
            </div>
            <div className="flex w-full shadow-lg items-center justify-between bg-stone/40 p-6 rounded-2xl border border-stone">
              <div className="space-y-1">
                <h3 className="text-2xl">Non-Fiction</h3>
                <p className="text-sm text-dark-grey/60 font-medium">850 books</p>
              </div>
              <div className="bg-blue-100 w-24 h-32 rounded-sm shadow-book rotate-6" />
            </div>
          </div>
        </Wrapper>
      </section>

      {/* NEW ARRIVALS */}
      {arrivalsBooks.length > 0 && (
        <section className="section-gradient">
          <Wrapper>
            <Link href="/dashboard/new-arrivals" className="flex items-center gap-1 group w-fit mb-4">
              <h2 className="text-xl">New arrivals</h2>
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform text-dark-grey/90" />
            </Link>

            <div
              ref={arrivalsScroll.ref}
              {...arrivalsScroll.props}
              className={`
              flex gap-6 overflow-x-auto pt-2 pb-8 px-4 -mt-2 -mb-8 -mx-4 flex-nowrap no-scrollbar carousel-fade
              ${arrivalsScroll.isDragging ? 'cursor-grabbing pointer-events-none' : 'cursor-grab'}
              select-none active:cursor-grabbing
            `}
            >
              {arrivalsBooks.map((book) => (
                <BookCard
                  key={book.id}
                  id={book.id || book.key || ''}
                  slug={book.slug}
                  title={book.title}
                  author={book.author}
                  coverId={book.coverId}
                  coverColor={book.color}
                />
              ))}
            </div>
          </Wrapper>
        </section>
      )}
    </div>
  );
};

export default HomeClient;
