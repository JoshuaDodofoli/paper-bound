'use client'

import Wrapper from "@/app/components/Wrapper"
import { Book } from "@/app/lib/interface"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

const AuthorClient = ({ author }: { author: Book }) => {
  return (
    <div className="">
      <Wrapper>
        <Link href="/dashboard" className="flex items-center gap-2 text-dark-grey/50 hover:text-dark-grey transition-colors mb-8 group w-fit">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Dashboard</span>
        </Link>
        <h1 className="text-2xl font-semibold text-dark-grey">{author.author}</h1>
        <p>Total books: {10}</p>
      </Wrapper>
    </div>
  )
}

export default AuthorClient