'use client'

import React, { useState } from 'react'
import Wrapper from '@/components/primitives/Wrapper'
import { Ellipsis, LayoutGrid, List, PlusCircle } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import EditOptions from './_components/EditOptions';
import CreateCollectionModal from './_components/CreateCollectionModal';
import EditModal from './_components/EditModal';
import DeleteModal from './_components/DeleteModal';
import { useShelfStore } from '@/features/shelf/state/useShelfStore';
import { useShelfUiStore } from '@/features/shelf/state/useShelfUiStore';
import CollectionCard from './_components/CollectionCard';

const ShelfPage = () => {

  const collections = useShelfStore((state) => state.collections);
  const addCollection = useShelfStore((state) => state.addCollection);
  const activeEditId = useShelfUiStore((state) => state.activeEditId);
  const setActiveEditId = useShelfUiStore((state) => state.setActiveEditId);
  const editingCollectionId = useShelfUiStore((state) => state.editingCollectionId);
  const deletingCollectionId = useShelfUiStore((state) => state.deletingCollectionId);
  const viewMode = useShelfUiStore((state) => state.viewMode);
  const setViewMode = useShelfUiStore((state) => state.setViewMode);

  const [collectionName, setCollectionName] = useState('');
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prev => !prev);
  }

  const handleSaveCollection = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!collectionName.trim()) return;

    addCollection(collectionName);

    setCollectionName('');
    setShowModal(false);
    setActiveEditId(null);
  }

  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  }

  const itemVariants = {
    hidden: { y: 5, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring" as const,
        bounce: 0.35,
      }
    }
  }

  return (
    <div className='mt-12'>
      <Wrapper>
        <section>
          <div className="flex items-center justify-between">
            <motion.div
              onClick={toggleModal}
              whileTap={{ scale: 0.95 }}
              className="flex items-center cursor-pointer justify-start gap-2 bg-stone/60 h-9 px-3 rounded-full my-4 text-dark-grey/95"
            >
              <p className='text-sm font-medium'>Add</p>
              <PlusCircle size={18} className='text-dark-grey/95' />
            </motion.div>

            {
              collections.length >= 1 && (
                <motion.div
                  onClick={toggleViewMode}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center cursor-pointer justify-center bg-stone/60 size-9 rounded-full my-4 text-dark-grey/80"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={viewMode}
                      initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center"
                    >
                      {viewMode === 'grid' ? <List size={18} /> : <LayoutGrid size={18} />}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              )
            }

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

          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={`grid gap-3 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}
            >
              {collections.map((collection) => (
                <motion.div
                  key={collection.id}
                  variants={itemVariants}
                  className='relative w-full group'
                >
                  <Link href={`/dashboard/shelf/${collection.slug}`}>
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                    >
                      <CollectionCard
                        collectionName={collection.name}
                        bookCount={collection.bookCount}
                        viewMode={viewMode}
                      />
                    </motion.div>
                  </Link>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveEditId(activeEditId === collection.id ? null : collection.id);
                    }}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-stone/20 hover:bg-stone/40 transition-colors cursor-pointer text-dark-grey"
                  >
                    <Ellipsis size={20} className='text-dark-grey/95' />
                  </button>

                  <AnimatePresence>
                    {activeEditId === collection.id && (
                      <EditOptions collectionId={collection.id} />
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {editingCollectionId !== null && (
              <EditModal collectionId={editingCollectionId} />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {deletingCollectionId !== null && (
              <DeleteModal collectionId={deletingCollectionId} />
            )}
          </AnimatePresence>

        </section>
      </Wrapper>
    </div >
  )
}

export default ShelfPage
