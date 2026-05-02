'use client'

import { useDraggableScroll } from "@/app/hooks/useDraggableScroll";
import Header from "../(components)/header/Header";
import Wrapper from "@/app/components/Wrapper";
import { ChevronRight } from "lucide-react";
import Link from "next/link";


const Page = () => {

  const readingScroll = useDraggableScroll();
  const trendingScroll = useDraggableScroll();
  const arrivalsScroll = useDraggableScroll();


  return (
    <div className="mt-14">

      <section>
        <Wrapper>

          <Link href="/dashboard/reading" className="flex items-center gap-1 group w-fit mb-4">
            <h2 className="text-xl font-bold">Reading</h2>
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <div
            ref={readingScroll.ref}
            {...readingScroll.props}
            className={`
            flex gap-4 overflow-x-auto pt-2 pb-6 px-4 -mt-2 -mb-6 -mx-4 flex-nowrap no-scrollbar carousel-fade
            ${readingScroll.isDragging ? 'cursor-grabbing' : 'cursor-grab'}
            select-none active:cursor-grabbing
          `}
          >
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="min-w-68 min-h-24 bg-red-200 rounded-lg shrink-0 shadow-book transition-shadow hover:shadow-book-hover"
              >
                {/* Book Content */}
              </div>
            ))}
          </div>
        </Wrapper>
      </section>

      <section className="section-gradient">
        <Wrapper>

         <Link href="/dashboard/trending" className="flex items-center gap-1 group w-fit mb-4">
            <h2 className="text-xl font-bold">Trending</h2>
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <div
            ref={trendingScroll.ref}
            {...trendingScroll.props}
            className={`
            flex gap-4 overflow-x-auto pt-2 pb-6 px-4 -mt-2 -mb-6 -mx-4 flex-nowrap no-scrollbar carousel-fade
            ${trendingScroll.isDragging ? 'cursor-grabbing' : 'cursor-grab'}
            select-none active:cursor-grabbing
          `}
          >
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="aspect-3/4 w-40 bg-red-200 shrink-0 shadow-book transition-shadow hover:shadow-book-hover"
              >
                {/* Book Content */}
              </div>
            ))}
          </div>
        </Wrapper>
      </section>

      <section className="section-gradient">
        <Wrapper>

          <h2 className="section-title">Genre Spotlights</h2>

          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex w-full shadow-lg items-center justify-between bg-red-200 p-4">
              <h3>Fiction</h3>
              <div className="bg-blue-300 min-w-30 min-h-40"></div>
            </div>
            <div className="flex w-full shadow-lg items-center justify-between bg-red-200 p-4">
              <h3>Non-Fiction</h3>
              <div className="bg-blue-300 min-w-30 min-h-40"></div>
            </div>
          </div>
        </Wrapper>
      </section>

      <section className="section-gradient">
        <Wrapper>

      <Link href="/dashboard/new-arrivals" className="flex items-center gap-1 group w-fit mb-4">
            <h2 className="text-xl font-bold">New arrivals</h2>
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <div
            ref={arrivalsScroll.ref}
            {...arrivalsScroll.props}
            className={`
            flex gap-4 overflow-x-auto pt-2 pb-6 px-4 -mt-2 -mb-6 -mx-4 flex-nowrap no-scrollbar carousel-fade
            ${arrivalsScroll.isDragging ? 'cursor-grabbing' : 'cursor-grab'}
            select-none active:cursor-grabbing
          `}
          >
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="aspect-3/4 w-40 bg-red-200 shrink-0 shadow-book transition-shadow hover:shadow-book-hover"
              >
                {/* Book Content */}
              </div>
            ))}
          </div>
        </Wrapper>
      </section>


    </div>
  );
};

export default Page;