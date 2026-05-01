'use client'

import { useDraggableScroll } from "@/app/hooks/useDraggableScroll";
import Header from "../(components)/header/Header";
import Wrapper from "@/app/components/Wrapper";


const Page = () => {

  const readingScroll = useDraggableScroll();
  const trendingScroll = useDraggableScroll();
  const arrivalsScroll = useDraggableScroll();


  return (
    <div className="mt-24">
      <Header />

      <section>
        <Wrapper>

          <h2 className="text-xl font-bold mb-4">Reading</h2>

          <div
            ref={readingScroll.ref}
            {...readingScroll.props}
            className={`
            flex gap-4 overflow-x-auto pb-4 flex-nowrap no-scrollbar
            ${readingScroll.isDragging ? 'cursor-grabbing' : 'cursor-grab'}
            select-none active:cursor-grabbing
          `}
          >
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="min-w-68 min-h-24 bg-red-200 rounded-lg shrink-0 shadow-md"
              >
                {/* Book Content */}
              </div>
            ))}
          </div>
        </Wrapper>
      </section>

      <section className="section-gradient
      ">
        <Wrapper>

          <h2 className="section-title">Trending now</h2>

          <div
            ref={trendingScroll.ref}
            {...trendingScroll.props}
            className={`
            flex gap-4 overflow-x-auto pb-4 flex-nowrap no-scrollbar
            ${trendingScroll.isDragging ? 'cursor-grabbing' : 'cursor-grab'}
            select-none active:cursor-grabbing
          `}
          >
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="min-w-40 min-h-52 bg-red-200 shrink-0 shadow-lg"
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
              <div className="bg-blue-300 min-w-40 min-h-52"></div>
            </div>
            <div className="flex w-full shadow-lg items-center justify-between bg-red-200 p-4">
              <h3>Non-Fiction</h3>
              <div className="bg-blue-300 min-w-40 min-h-52"></div>
            </div>
          </div>
        </Wrapper>
      </section>

      <section className="section-gradient">
        <Wrapper>

          <h2 className="section-title">New Arrivals</h2>

          <div
            ref={arrivalsScroll.ref}
            {...arrivalsScroll.props}
            className={`
            flex gap-4 overflow-x-auto pb-4 flex-nowrap no-scrollbar
            ${arrivalsScroll.isDragging ? 'cursor-grabbing' : 'cursor-grab'}
            select-none active:cursor-grabbing
          `}
          >
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="min-w-40 min-h-52 bg-red-200 shrink-0 shadow-md"
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