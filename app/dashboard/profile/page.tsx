'use client'

import React, { useState } from 'react'
import Wrapper from '../../components/Wrapper'
import { useCollectionStore } from '@/app/lib/store'
import { motion } from 'framer-motion'
import { LogOut, Trash2, Palette, ShieldAlert, MapPin, Calendar, Clock, BookOpen, Library, Edit3, ChevronRight, ChevronLeft, Share } from 'lucide-react'
import Image from 'next/image'
import BackButton from '../(components)/ui/BackButton'
import { useToast } from '@/app/lib/hooks/useToast'
import Toast from '../(components)/ui/Toast'
import EditProfileModal from '../(components)/ui/EditProfileModal'

const ProfilePage = () => {
  const user = useCollectionStore((state) => state.user);
  const collections = useCollectionStore((state) => state.collections);
  const setTheme = useCollectionStore((state) => state.setTheme);
  const logout = useCollectionStore((state) => state.logout);
  const deleteAccount = useCollectionStore((state) => state.deleteAccount);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  const handleShareProfile = async () => {
    const shareUrl = `${window.location.origin}/profile/${user.username}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast('Profile link copied to clipboard!');
    } catch (err) {
      showToast('Failed to copy link', 'error');
    }
  };

  return (
    <div className='mt-20 min-h-screen pb-20'>
      <Wrapper>
        <div className='flex flex-col gap-12 max-w-3xl mx-auto'>
          <div className='flex items-center justify-between'>
            <BackButton />
            <button 
              onClick={handleShareProfile}
              className='flex items-center gap-2 bg-ash/50 border border-stone/10 px-4 py-2 rounded-full text-xs font-sans font-bold text-dark-grey/60 hover:text-dark-grey hover:border-stone/40 transition-all cursor-pointer'
            >
              <Share size={14} />
              Share Profile
            </button>
          </div>

          <section className='flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10'>
            <div className='relative group'>
              <div className='size-32 md:size-40 rounded-full overflow-hidden  shadow-book relative z-10'>
                <Image
                  src="/avatar.png"
                  alt="Profile"
                  width={160}
                  height={160}
                  className='object-cover'
                />
              </div>
              <div className='absolute inset-0 bg-stone/20 rounded-full blur-2xl z-0 opacity-50 group-hover:opacity-80 transition-opacity' />

              {/* <div className='mt-4 flex flex-col items-center gap-1'>
                <span className='text-sm font-sans font-bold text-dark-grey/60'>2 ratings (5.00 avg)</span>
                <button className='text-xs font-sans text-stone-600 hover:underline cursor-pointer'>0 reviews</button>
              </div> */}
            </div>

            <div className='flex flex-col flex-1 text-center md:text-left pt-2'>
              <div className='flex items-center justify-center md:justify-start gap-3 mb-4'>
                <h2 className='text-4xl font-serif text-dark-grey leading-none'>{user.name.split(' ')[0]}</h2>
                <button 
                  onClick={() => setIsEditModalOpen(true)}
                  className='text-xs font-sans text-stone-500 hover:text-dark-grey flex items-center gap-1 transition-colors cursor-pointer'
                >
                  <Edit3 size={12} />
                  (edit profile)
                </button>
              </div>

              <div className='grid grid-cols-1 gap-3 border-t border-stone/10 pt-4'>
                <div className='flex items-center justify-center md:justify-start gap-6'>
                  <div className='flex flex-col'>
                    <span className='text-[10px] uppercase tracking-widest font-bold text-dark-grey/40 mb-1'>Activity</span>
                    <div className='flex items-center gap-2 text-sm text-dark-grey/80'>
                      <Calendar size={14} className='text-dark-grey/40' />
                      <span>Joined in {user.joinedDate}</span>
                    </div>
                  </div>
                </div>
                <div className='flex items-center justify-center md:justify-start gap-2 text-xs text-dark-grey/40 italic'>
                  <Clock size={12} />
                  <span>Last active this month</span>
                </div>
              </div>
            </div>
          </section>

          {/* --- BOOKSHELVES SUMMARY --- */}
          <section className='flex flex-col gap-6'>
            <div className='flex items-center justify-between border-b border-stone/20 pb-2'>
              <h3 className='text-sm font-sans text-dark-grey uppercase tracking-widest font-bold'>
                {user.name.split(' ')[0].toUpperCase()}&apos;S BOOKSHELVES
              </h3>
              <button className='text-xs font-sans text-stone-500 hover:text-dark-grey font-bold flex items-center gap-1 cursor-pointer'>
                Stats | More <ChevronRight size={14} />
              </button>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {collections.slice(0, 4).map((shelf) => (
                <motion.div
                  key={shelf.id}
                  whileHover={{ y: -2 }}
                  className='bg-ash/50 border border-stone/10 rounded-2xl p-4 flex flex-col gap-1 hover:border-stone/30 transition-all cursor-pointer'
                >
                  <span className='text-sm font-sans font-bold text-dark-grey/90'>{shelf.name}</span>
                  <span className='text-xs font-sans text-dark-grey/40'>({shelf.books || 0} books)</span>
                </motion.div>
              ))}

              {collections.length === 0 && (
                <div className='col-span-full p-8 text-center border-2 border-dashed border-stone/10 rounded-3xl text-dark-grey/40 italic text-sm'>
                  No shelves yet. Start by creating a collection!
                </div>
              )}
            </div>
          </section>

          {/* --- CURRENTLY READING --- */}
          <section className='flex flex-col gap-6'>
            <div className='flex items-center justify-between border-b border-stone/20 pb-2'>
              <h3 className='text-sm font-sans text-dark-grey uppercase tracking-widest font-bold'>
                {user.name.split(' ')[0].toUpperCase()} IS CURRENTLY READING
              </h3>
            </div>

            <div className='bg-white border border-stone/20 rounded-[32px] p-6 shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start'>
              <div className='w-32 aspect-3/4 bg-stone/10 rounded-lg shadow-book overflow-hidden relative group shrink-0'>
                <div className='absolute inset-0 bg-linear-to-tr from-black/20 to-transparent' />
                {/* Placeholder for book cover */}
                <div className='flex items-center justify-center h-full text-[10px] text-dark-grey/30 text-center px-4 font-serif italic'>
                  Cover Image
                </div>
              </div>

              <div className='flex flex-col flex-1 gap-4 text-center md:text-left'>
                <div className='flex flex-col gap-1'>
                  <div className='flex items-center justify-center md:justify-start gap-2 text-xs text-stone-500 font-sans mb-1'>
                    <BookOpen size={14} />
                    <span>{user.name} is currently reading</span>
                  </div>
                  <h4 className='text-2xl font-serif text-dark-grey font-bold'>Powerless</h4>
                  <p className='text-sm font-sans text-dark-grey/60 font-medium'>by Lauren Roberts</p>
                </div>

                <div className='flex flex-wrap items-center justify-center md:justify-start gap-2'>
                  <span className='text-[10px] font-sans font-bold uppercase tracking-tighter bg-stone/40 px-2 py-0.5 rounded-full text-dark-grey/70'>currently-reading</span>
                  <span className='text-[10px] font-sans font-bold uppercase tracking-tighter bg-ash px-2 py-0.5 rounded-full text-dark-grey/40'>fantasy</span>
                </div>

                <div className='pt-4 border-t border-stone/5 flex items-center justify-center md:justify-start gap-4'>
                  <div className='flex flex-col gap-1'>
                    <span className='text-[10px] uppercase font-bold text-dark-grey/30 tracking-widest'>Progress</span>
                    <div className='h-1.5 w-40 bg-stone/20 rounded-full overflow-hidden'>
                      <div className='h-full w-2/3 bg-dark-grey/60 rounded-full' />
                    </div>
                  </div>
                  <span className='text-xs font-sans font-bold text-dark-grey/60 mt-4'>65%</span>
                </div>
              </div>

              <div className='flex flex-col gap-2 shrink-0'>
                <button className='bg-dark-grey text-white px-6 py-2.5 rounded-full text-sm font-sans font-bold hover:bg-dark-grey/90 transition-colors shadow-lg cursor-pointer'>
                  Update Progress
                </button>
                <button className='border border-stone/20 text-dark-grey/60 px-6 py-2.5 rounded-full text-sm font-sans font-bold hover:bg-ash transition-colors cursor-pointer'>
                  Add Comment
                </button>
              </div>
            </div>
          </section>

          <hr className='border-stone/20' />

          {/* --- ACCOUNT ACTIONS --- */}
          <section className='flex flex-col gap-6'>
            <div className='flex items-center gap-2'>
              <ShieldAlert size={16} className='text-dark-grey/40' />
              <h3 className='text-xs font-sans text-dark-grey/40 uppercase tracking-widest font-bold'>Account Actions</h3>
            </div>

            <div className='flex flex-col md:flex-row gap-3'>
              <button
                onClick={logout}
                className='flex-1 flex items-center justify-between bg-ash/50 border border-stone/10 rounded-2xl p-4 text-dark-grey hover:bg-stone/10 transition-colors cursor-pointer group'
              >
                <div className='flex items-center gap-3'>
                  <LogOut size={18} className='text-dark-grey/40 group-hover:text-dark-grey transition-colors' />
                  <span className='font-sans font-bold text-sm'>Logout Session</span>
                </div>
                <ChevronRight size={16} className='text-dark-grey/20' />
              </button>

              <button
                onClick={deleteAccount}
                className='flex-1 flex items-center justify-between bg-red-50/30 border border-red-100/50 rounded-2xl p-4 text-red-600/60 hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer group'
              >
                <div className='flex items-center gap-3'>
                  <Trash2 size={18} className='opacity-60 group-hover:opacity-100' />
                  <span className='font-sans font-bold text-sm'>Terminate Library</span>
                </div>
              </button>
            </div>
          </section>
        </div>
      </Wrapper>

      <EditProfileModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

      <Toast 
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </div>
  )
}

export default ProfilePage


