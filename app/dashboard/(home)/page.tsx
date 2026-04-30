'use client'

import { useDraggableScroll } from "@/app/hooks/useDraggableScroll";
import Header from "../(components)/header/Header";


const Page = () => {
  const { ref, props, isDragging } = useDraggableScroll();

  return (
    <div className="">
      <Header />
      <section>
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
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className="min-w-[280px] h-40 bg-red-200 rounded-lg flex-shrink-0 shadow-md"
            >
              {/* Book Content */}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Page;