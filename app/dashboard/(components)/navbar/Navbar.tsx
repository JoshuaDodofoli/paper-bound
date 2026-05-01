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
      className='fixed bottom-5 left-1/2 -translate-x-1/2  text-white flex items-center justify-center'
    >
      <div className="flex items-center gap-2">
        <ul className='flex gap-4 p-3 bg-gray-300'>
          {links.map((link) => (
            <Link href={link.href} key={link.name}>
              <li className='flex'>
                {link.icon}
                {pathName === link.href && <span className='text-sm'>{link.name}</span>}
              </li>
            </Link>
          ))}
        </ul>

        <div className="flex items-center gap-4 bg-amber-300 p-3 size-11 justify-center">
          q
        </div>
      </div>

    </nav>
  )
}

export default Navbar