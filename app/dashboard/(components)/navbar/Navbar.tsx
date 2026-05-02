'use client'
import { Home, Library } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar = () => {

  const links = [
    {
      name: 'Home',
      href: '/dashboard',
      icon: <Home />
    },
    {
      name: 'Shelf',
      href: '/dashboard/shelf',
      icon: <Library />
    }
  ]

  const pathName = usePathname();

  return (
    <nav
      className='fixed bottom-5 z-20 left-1/2 -translate-x-1/2  text-white flex items-center justify-center'
    >
      <div className="flex items-center gap-2">
        <ul className='flex gap-4 p-3 bg-gray-300'>
          {links.map((link) => {
            const isActive = link.href === '/dashboard'
              ? pathName === '/dashboard' || (!pathName.startsWith('/dashboard/shelf') && pathName.startsWith('/dashboard'))
              : pathName.startsWith(link.href);
            return (
              <Link href={link.href} key={link.name}>
                <li className='flex items-center gap-2'>
                  {link.icon}
                  {isActive && <span className='text-sm transition-all duration-300'>{link.name}</span>}
                </li>
              </Link>
            );
          })}
        </ul>

        <div className="flex items-center gap-4 bg-amber-300 p-3 size-11 justify-center">
          q
        </div>
      </div>

    </nav>
  )
}

export default Navbar