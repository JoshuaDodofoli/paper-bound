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
      className='absolute bottom-5 left-1/2 p-3 -translate-x-1/2  bg-gray-300 text-white flex items-center justify-center'
    >
      <ul className='flex gap-4'>
        {links.map((link) => (
          <Link href={link.href} key={link.name}>
            <li className='flex'>
              {link.icon}
              {pathName === link.href && <span className='text-sm'>{link.name}</span>}
            </li>
          </Link>
        ))}
      </ul>

    </nav>
  )
}

export default Navbar