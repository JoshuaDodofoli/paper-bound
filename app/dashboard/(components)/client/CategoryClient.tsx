'use client'

import Wrapper from "@/app/components/Wrapper";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

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
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="aspect-3/4 bg-red-200 rounded-lg shadow-book flex items-center justify-center p-4 text-center text-dark-grey/40"
            >
              Book Placeholder {i + 1}
            </div>
          ))}
        </div>
      </Wrapper>
    </div>
  )
}

export default CategoryClient