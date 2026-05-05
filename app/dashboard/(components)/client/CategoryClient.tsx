'use client'

import Wrapper from "@/app/components/Wrapper";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { MOCK_BOOKS } from "../../(home)/page";
import BookCard from "../book/BookCard";

interface CategoryClientProps {
  slug: string;
}

const CategoryClient = ({ slug }: CategoryClientProps) => {

  return (
    <div className="mt-20">
      <Wrapper>
        <Link href={"/dashboard"}
          className="flex items-center gap-2 text-dark-grey/60 hover:text-dark-grey transition-colors mb-6 group cursor-pointer"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </Link>


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