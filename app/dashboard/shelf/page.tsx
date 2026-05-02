'use client'

import React, { useState } from 'react'
import Wrapper from '../../components/Wrapper'
import { FolderPen, Pencil, PlusCircle, Trash2 } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import EditOptions from '../(components)/shelf/EditOptions';
import CreateCollectionModal from '../(components)/shelf/CreateCollectionModal';

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
              <CreateCollectionModal
                collectionName={collectionName}
                setCollectionName={setCollectionName}
                handleSaveCollection={handleSaveCollection}
                toggleModal={toggleModal}
              />
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

                <AnimatePresence>
                  {showEdit && (
                    <EditOptions />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>


        </section>
      </Wrapper>
    </div >
  )
}

export default page