'use client'

import Wrapper from "@/app/components/Wrapper"
import { Book } from "@/app/lib/interface"
import BackButton from "../../(components)/ui/BackButton"

const AuthorClient = ({ author }: { author: Book }) => {
  return (
    <div className="">
      <Wrapper>
        <BackButton label="Back to Dashboard" className="mb-8" />
        <h1 className="text-2xl font-semibold text-dark-grey">{author.author}</h1>
        <p>Total books: {10}</p>
      </Wrapper>
    </div>
  )
}

export default AuthorClient