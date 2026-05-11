'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Palette, LogOut } from 'lucide-react'
import { useCollectionStore } from '@/app/lib/store'
import { DropdownItem } from '@/app/lib/interface'
import Dropdown from '../ui/Dropdown'

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const logout = useCollectionStore((state) => state.logout);
  const user = useCollectionStore((state) => state.user);

  const menuItems: DropdownItem[] = [
    {
      label: 'Profile',
      icon: <User size={18} />,
      onClick: () => router.push('/dashboard/profile'),
    },
    {
      label: 'Theme',
      icon: <Palette size={18} />,
      onClick: () => router.push('/dashboard/profile'),
    },
    {
      label: 'Sign out',
      icon: <LogOut size={18} />,
      onClick: logout,
      variant: 'danger',
      divider: true,
    },
  ];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex focus:outline-none transition-transform active:scale-95"
      >
        <div className='size-10 rounded-full bg-green-200 shadow-book flex items-center justify-center text-lg font-serif text-dark-grey'>
           {user.name.charAt(0)}
        </div>
      </button>

      <Dropdown 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        items={menuItems} 
        className="top-12"
      />
    </div>
  )
}

export default UserMenu
