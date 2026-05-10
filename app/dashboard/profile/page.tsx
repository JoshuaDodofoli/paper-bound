'use client'

import React from 'react'
import Wrapper from '../../components/Wrapper'
import { useCollectionStore } from '@/app/lib/store'
import { motion } from 'framer-motion'
import { LogOut, Trash2, Palette, ShieldAlert } from 'lucide-react'

const ProfilePage = () => {
  const user = useCollectionStore((state) => state.user);
  const collections = useCollectionStore((state) => state.collections);
  const setTheme = useCollectionStore((state) => state.setTheme);
  const logout = useCollectionStore((state) => state.logout);
  const deleteAccount = useCollectionStore((state) => state.deleteAccount);

  const themes = [
    { id: 'paper', name: 'Paper', color: 'bg-paper', border: 'border-stone/40' },
    { id: 'midnight', name: 'Midnight', color: 'bg-[#1a1a1a]', border: 'border-white/10' },
    { id: 'modern', name: 'Modern', color: 'bg-white', border: 'border-black/5' },
  ] as const;

  return (
    <div className='mt-12 min-h-[calc(100vh-200px)]'>
      <Wrapper>
        <div className='flex flex-col gap-10 max-w-2xl mx-auto'>
          
          {/* Header Section */}
          <section className='flex flex-col items-center text-center gap-4'>
            <div className='size-24 rounded-full bg-green-200 shadow-book flex items-center justify-center text-3xl font-serif text-dark-grey'>
              {user.name.charAt(0)}
            </div>
            <div className='flex flex-col gap-1'>
              <h2 className='text-3xl font-serif text-dark-grey'>{user.name}</h2>
              <p className='text-sm font-sans text-dark-grey/50 uppercase tracking-widest font-bold'>
                Member since {user.joinedDate}
              </p>
            </div>
          </section>

          <hr className='border-stone/20' />
    
          {/* Library Stats Section */}
          <section className='flex flex-col gap-4'>
            <h3 className='text-xs font-sans text-dark-grey/40 uppercase tracking-widest font-bold'>Library Statistics</h3>
            <div className='bg-ash border border-stone/20 rounded-3xl p-6 flex items-center justify-between shadow-sm'>
              <span className='text-lg font-serif text-dark-grey'>Total Collections</span>
              <span className='text-2xl font-sans font-bold text-dark-grey'>{collections.length}</span>
            </div>
          </section>

          {/* Appearance Section */}
          <section className='flex flex-col gap-6'>
            <div className='flex items-center gap-2'>
              <Palette size={16} className='text-dark-grey/40' />
              <h3 className='text-xs font-sans text-dark-grey/40 uppercase tracking-widest font-bold'>Appearance</h3>
            </div>
            
            <div className='grid grid-cols-3 gap-3'>
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`flex flex-col items-center gap-3 p-4 rounded-3xl border transition-all duration-300 ${
                    user.theme === t.id 
                      ? 'bg-white border-stone/60 shadow-md scale-[1.02]' 
                      : 'bg-ash border-stone/10 hover:border-stone/30 opacity-60'
                  }`}
                >
                  <div className={`size-10 rounded-full ${t.color} ${t.border} border shadow-inner`} />
                  <span className='text-xs font-sans font-bold text-dark-grey'>{t.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Account Management Section */}
          <section className='flex flex-col gap-4 mt-4'>
            <h3 className='text-xs font-sans text-dark-grey/40 uppercase tracking-widest font-bold'>Account Management</h3>
            
            <div className='flex flex-col gap-3'>
              <button 
                onClick={logout}
                className='flex items-center justify-between bg-ash border border-stone/20 rounded-2xl p-4 text-dark-grey hover:bg-stone/10 transition-colors cursor-pointer'
              >
                <div className='flex items-center gap-3'>
                  <LogOut size={18} className='text-dark-grey/60' />
                  <span className='font-sans font-bold text-sm'>Logout</span>
                </div>
              </button>

              <button 
                onClick={deleteAccount}
                className='flex items-center justify-between bg-red-50 border border-red-100 rounded-2xl p-4 text-red-600 hover:bg-red-100 transition-colors cursor-pointer group'
              >
                <div className='flex items-center gap-3'>
                  <ShieldAlert size={18} className='text-red-500' />
                  <span className='font-sans font-bold text-sm'>Delete Account</span>
                </div>
                <Trash2 size={16} className='opacity-0 group-hover:opacity-100 transition-opacity' />
              </button>
            </div>
          </section>

        </div>
      </Wrapper>
    </div>
  )
}

export default ProfilePage
