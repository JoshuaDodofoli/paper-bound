'use client'

import React, { useState } from 'react'
import Wrapper from '../../components/Wrapper'
import { FolderPen, Pencil, PlusCircle, Trash2 } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import EditOptions from '../(components)/shelf/EditOptions';

interface collectionProps {
  id: number;
  name: string;
  books?: number;
}

const page = () => {

  const [collections, setCollections] = useState<collectionProps[]>([]);
  const [collectionName, setCollectionName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const toggleModal = () => {
    setShowModal(prev => !prev);
  }

  const toggleEdit = () => {
    setShowEdit(prev => !prev);
  }

  const handleSaveCollection = (e: any) => {
    e.preventDefault();
    if (!collectionName.trim()) return;

    setCollections([
      ...collections, {
        id: Date.now(),
        name: collectionName.trim(),
        books: 0
      }
    ])

    setCollectionName('');
    setShowModal(false);
  }



  return (
    <div className='mt-12'>
      <Wrapper>
        <section>
          <div className="flex items-center justify-between">
            <motion.div onClick={toggleModal} whileTap={{ scale: 0.95 }} className="flex items-center cursor-pointer justify-start gap-2 bg-stone w-fit py-2 px-3 rounded-full my-4 text-dark-grey/95">
              <p>Add</p>
              <PlusCircle size={20} className='text-dark-grey/95' />
            </motion.div>
            <motion.div onClick={toggleEdit} whileTap={{ scale: 0.95 }} className="flex items-center cursor-pointer justify-start gap-2 bg-stone w-fit py-2 px-3 rounded-full my-4 text-dark-grey/95">
              <p>Edit</p>
              <Pencil size={20} className='text-dark-grey/95' />
            </motion.div>
          </div>


          <AnimatePresence>
            {showModal && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-30 bg-black/20 backdrop-blur-xs"
                />

                <motion.div
                  initial={{ y: 20, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 10, opacity: 0, scale: 0.9 }}
                  className="absolute z-30 p-4 top-1/2 left-1/2 bg-paper rounded-2xl -translate-x-1/2 -translate-y-1/2 aspect-video w-[370px] shadow-book">

                  <div className=" h-full mb-4">
                    <div className="flex items-center justify-between w-full">
                      <h3 className='text-xl'>New Collection</h3>
                      <motion.button whileTap={{ scale: 0.95 }} className="bg-stone px-3 py-1 text-sm rounded-full text-dark-grey/95 cursor-pointer" onClick={toggleModal}>Close</motion.button>
                    </div>

                    <div className="flex w-full h-full flex-col items-center justify-center pb-2">
                      <form onSubmit={handleSaveCollection} className="flex flex-col w-full space-y-3">
                        <label className='text-sm text-dark-grey/90 font-medium'>Collection Name</label>
                        <input
                          autoFocus
                          value={collectionName}
                          onChange={(e) => setCollectionName(e.target.value)}
                          type="text" placeholder='e.g. Want to read' className='bg-dark-grey/5 border-stone/70 border rounded-2xl p-3 ' />
                        <motion.button whileTap={{ scale: 0.95 }} className='bg-stone p-3 rounded-2xl cursor-pointer'>Add Collection</motion.button>
                      </form>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>


          <div className='grid place-items-center grid-cols-1 md:grid-cols-2 gap-6'>
            {collections.map((collection) => (
              <div key={collection.id} className='relative w-full'>
                <Link href={`/dashboard/shelf/${collection.name}`}>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileTap={{ scale: 0.95 }}
                    className="aspect-video min-w-84 w-full bg-green-200 rounded-lg shadow-book transition-shadow hover:shadow-book-hover" >
                    <p>{collection.name}</p>
                  </motion.div>
                </Link>

                {showEdit && (
                  <EditOptions />
                )}
              </div>
            ))}
          </div>


        </section>
      </Wrapper>
    </div>
  )
}

export default page