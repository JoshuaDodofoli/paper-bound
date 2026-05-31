'use client'

import Wrapper from "@/components/primitives/Wrapper";
import BackButton from "@/components/primitives/BackButton";
import BookCard from "@/components/domain/books/BookCard";
import { MOCK_BOOKS } from "@/domain/books/fixtures";

interface CategoryClientProps {
  slug: string;
}

const CategoryClient = ({ slug }: CategoryClientProps) => {

  return (
    <div className="mt-20" data-category-slug={slug}>
      <Wrapper>
        <BackButton className="mb-6" />


        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {MOCK_BOOKS.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              slug={book.slug}
              title={book.title}
              author={book.author}
              coverColor={book.color}
              aspectRatio="aspect-3/4"
            />
          ))}
        </div>
      </Wrapper>
    </div>
  )
}

export default CategoryClient
