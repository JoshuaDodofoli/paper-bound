'use client'
import { Home, Library, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {

  const links = [
    {
      name: 'Home',
      href: '/dashboard',
      icon: <Home size={18} />
    },
    {
      name: 'Shelf',
      href: '/dashboard/shelf',
      icon: <Library size={18} />
    }
  ]

  const pathName = usePathname();

  return (
    <nav
      className='fixed bottom-8 z-20 left-1/2 -translate-x-1/2 flex items-center justify-center'
    >
      <div className="flex items-center gap-2">
        <ul className='flex gap-1 p-1.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl'>
          {links.map((link) => {
            const isActive = link.href === '/dashboard'
              ? pathName === '/dashboard' || (!pathName.startsWith('/dashboard/shelf') && pathName.startsWith('/dashboard'))
              : pathName.startsWith(link.href);
            
            return (
              <li key={link.name} className="relative">
                <Link 
                  href={link.href}
                  className={`
                    flex items-center justify-center gap-1 w-20 px-4=6 py-2.5 rounded-full transition-colors duration-300 relative z-10
                    ${isActive ? 'text-white' : 'text-white/50 hover:text-white/80'}
                  `}
                >
                  <span className="relative z-10">{link.icon}</span>
                  <AnimatePresence mode="popLayout" initial={false}>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, width: 0, x: -5 }}
                        animate={{ opacity: 1, width: 'auto', x: 0 }}
                        exit={{ opacity: 0, width: 0, x: -5 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className='text-sm font-medium overflow-hidden whitespace-nowrap relative z-10'
                      >
                        {link.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>

                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-white/15 rounded-full"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <motion.button 
          whileTap={{ scale: 0.9 }} 
          whileHover={{ scale: 1.05 }} 
          className="flex cursor-pointer items-center justify-center rounded-full bg-amber-400 text-black shadow-lg size-12 hover:bg-amber-300 transition-colors"
        >
          <Search className='size-4.5 text-dark-grey/90' />
        </motion.button>
      </div>

    </nav>
  )
}

export default Navbar