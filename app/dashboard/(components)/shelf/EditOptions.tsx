'use client'

import { FolderPen, Trash2 } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'

interface editOptionsProps {
    collectionId: number;
}

const EditOptions = ({ collectionId }: editOptionsProps) => {

    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const toggleEditModal = () => {
        setEditModal(prev => !prev);
    }

    const toggleDeleteModal = () => {
        setDeleteModal(prev => !prev);
    }

    const editOptionsContainer = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    }

    const editOptionsItem = {
        initial: {
            opacity: 0,
            scale: 0.6
        },
        animate: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                type: "spring" as const,
                bounce: 0.3,
            }
        },
        exit: {
            opacity: 0,
            scale: 0.6,
            transition: { duration: 0.2 }
        }
    }

    return (
        <motion.div
            variants={editOptionsContainer}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 z-10 w-full h-full"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='bg-stone/20 backdrop-blur-sm absolute inset-0 w-full h-full rounded-lg' 
            />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-10">
                <div className="flex items-center justify-center gap-4 p-4">

                    <motion.button
                        variants={editOptionsItem}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleEditModal();
                        }}
                        className='size-15 rounded-full p-2 shadow-sm cursor-pointer bg-stone flex items-center justify-center'>
                        <FolderPen size={20} className='text-dark-grey/90' />
                    </motion.button>

                    <motion.button
                        variants={editOptionsItem}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleDeleteModal();
                        }}
                        className='size-15 rounded-full p-2 shadow-sm cursor-pointer flex items-center justify-center bg-rose-200 text-white'>
                        <Trash2 size={20} className='text-rose-400' />
                    </motion.button>
                </div>
            </div>

            <AnimatePresence>
                {editModal && (
                    <EditModal toggleEditModal={toggleEditModal} collectionId={collectionId} />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {deleteModal && (
                    <DeleteModal toggleDeleteModal={toggleDeleteModal} collectionId={collectionId} />
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default EditOptions