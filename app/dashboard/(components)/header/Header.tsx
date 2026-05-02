'use client'
import Wrapper from '@/app/components/Wrapper';
import { ChevronLeft } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const Header = () => {

  const pathName = usePathname();
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [100, 150], [0, 1]);
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



  const getPageTitle = () => {
    if (pathName === '/dashboard') return 'Home';

    const segments = pathName.split('/');
    const lastSegment = segments[segments.length - 1];

    if (lastSegment) {
      return lastSegment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    return 'Shelf';
  };

  return (
    <div className="mt-12 w-full">
      <Wrapper className='flex items-center justify-between w-full'>
        <AnimatePresence mode='wait'>
          <motion.h1
            key={pathName}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className='text-3xl font-medium'>
            {getPageTitle()}
          </motion.h1>
        </AnimatePresence>

        <div className=" flex">
          <span className='size-10 rounded-full bg-green-200' />
        </div>

        {pathName !== '/dashboard' && (

          <motion.div
            style={{ opacity }}
            className="fixed top-0 left-0 w-full p-3 bg-transparent backdrop-blur-md z-50 duration-200"
          >
            <Wrapper className="flex items-center justify-between relative p-1">

              <Link scroll={false} href="/dashboard" className="flex items-center gap-1 cursor-pointer z-10">
                <ChevronLeft size={24} className='text-dark-grey/70' />
              </Link>
              <h3 className="absolute left-1/2 -translate-x-1/2 text-lg font-medium">
                {getPageTitle()}
              </h3>

            </Wrapper>
          </motion.div>
        )}
      </Wrapper>
    </div>
  )
}

export default Header