'use client'

import { useDraggableScroll } from "@/app/hooks/useDraggableScroll";
import BookCard from "./BookCard";
import { Book } from "@/app/lib/interface";

interface BookCarouselProps {
  books: Book[];
  aspectRatio?: string;
  width?: string;
}

export default function BookCarousel({ books, aspectRatio, width }: BookCarouselProps) {
  const scroll = useDraggableScroll();

  return (
    <div
      ref={scroll.ref}
      {...scroll.props}
      className={`
        flex gap-6 overflow-x-auto pt-2 pb-8 px-4 -mt-2 -mb-8 -mx-4 flex-nowrap no-scrollbar carousel-fade
        ${(scroll.isDragging && scroll.dragged) ? 'cursor-grabbing *:pointer-events-none' : 'cursor-grab'}
        select-none active:cursor-grabbing
      `}
    >
      {books.map((book) => (
        <BookCard
          key={book.id}
          id={book.id ?? book.key}
          slug={book.slug}
          title={book.title}
          author={book.author}
          coverUrl={book.coverUrl}
          coverColor={book.color ?? 'bg-stone'}
          aspectRatio={aspectRatio}
          width={width}
        />
      ))}
    </div>
  );
}
