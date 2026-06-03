'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Palette, LogOut } from 'lucide-react'
import { useShelfStore } from '@/features/shelf/state/useShelfStore'
import type { DropdownItem } from '@/domain/ui/types'
import Dropdown from '@/components/overlays/Dropdown'

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const logout = useShelfStore((state) => state.logout);
  const user = useShelfStore((state) => state.user);

  const menuItems: DropdownItem[] = [
    {
      label: 'Profile',
      icon: <User size={18} />,
      path: '/dashboard/profile',
    },
    {
      label: 'Theme',
      icon: <Palette size={18} />,
      path: '/dashboard/profile',
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
