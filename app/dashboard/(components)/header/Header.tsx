'use client'
import Wrapper from '@/app/components/Wrapper';
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const Header = () => {

  const pathName = usePathname();
  //  const [query, setQuery] = useState("");

  // const searchBooks = async () => {
  //   const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
  //   const data = await response.json();
  //   console.log(data.docs.slice(0, 15));
  // };

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   searchBooks();
  // }


  return (

    // <div className="">
    //   <form onSubmit={handleSubmit} className="">
    //     <input
    //       type="text"
    //       name="name"
    //       placeholder="Search books"
    //       value={query}
    //       onChange={(e) => setQuery(e.target.value)}
    //     />
    //     <button className="bg-blue-400" type="submit">Submit</button>
    //   </form>

    //   <div className="">
    //    <p>{}</p>
    //   </div>
    // </div>

    <div className="mt-12 w-full">
      <Wrapper className='flex items-center justify-between w-full'>
        <h1 className='text-3xl font-medium'>{pathName === '/dashboard' ? 'Home' : 'Shelf'}</h1>

        <div className=" flex">
          <span className='size-10 rounded-full bg-green-200' />
        </div>
      </Wrapper>
    </div>
  )
}

export default Header