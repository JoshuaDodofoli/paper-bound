'use client'

import { useDraggableScroll } from "@/app/hooks/useDraggableScroll";
import Header from "../(components)/header/Header";
import Wrapper from "@/app/components/Wrapper";


const Page = () => {
  const { ref, props, isDragging } = useDraggableScroll();

  return (
    <div className="">
      <Header />

      <section>
        <Wrapper>

        <h2 className="text-xl font-bold mb-4">Reading</h2>

        <div
          ref={ref}
          {...props}
          className={`
            flex gap-4 overflow-x-auto pb-4 flex-nowrap no-scrollbar
            ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
            select-none active:cursor-grabbing
          `}
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="min-w-75 min-h-36 bg-red-200 rounded-lg shrink-0 shadow-md"
            >
              {/* Book Content */}
            </div>
          ))}
        </div>
        </Wrapper>
      </section>

      <section className="my-12">
        <Wrapper>

        <h2>Trending now</h2>

        <div
          ref={ref}
          {...props}
          className={`
            flex gap-4 overflow-x-auto pb-4 flex-nowrap no-scrollbar
            ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
            select-none active:cursor-grabbing
          `}
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="min-w-40 min-h-52 bg-red-200 rounded-lg shrink-0 shadow-md"
            >
              {/* Book Content */}
            </div>
          ))}
        </div>
        </Wrapper>
      </section>

       <section className="bg-amber-200 w-full my-12 p-4">
        <Wrapper>

        <h2>Genre Spotlights</h2>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex w-full items-center justify-between bg-red-200 p-4">
            <h3>Fiction</h3>
            <div className="bg-blue-300 min-w-40 min-h-52"></div>
          </div>
          <div className="flex w-full items-center justify-between bg-red-200 p-4">
            <h3>Non-Fiction</h3>
            <div className="bg-blue-300 min-w-40 min-h-52"></div>
          </div>
        </div>
        </Wrapper>
      </section>

      <section>
        <Wrapper>

        <h2>New Arrivals</h2>

          <div 
          ref={ref}
          {...props}
          className={`
            flex gap-4 overflow-x-auto pb-4 flex-nowrap no-scrollbar
            ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
            select-none active:cursor-grabbing
          `}
        > 
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="min-w-40 min-h-52 bg-red-200 rounded-lg shrink-0 shadow-md"
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