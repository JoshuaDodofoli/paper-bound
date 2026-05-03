'use client'

import { motion } from 'motion/react'
import { useCollectionStore } from '@/app/utils/store'

interface ModalProps {
    collectionId: number;
}

const DeleteModal = ({ collectionId }: ModalProps) => {

    const deleteCollection = useCollectionStore((state) => state.deleteCollection);
    const setDeletingCollectionId = useCollectionStore((state) => state.setDeletingCollectionId);

    const toggleDeleteModal = () => setDeletingCollectionId(null);

    const handleDelete = () => {
        deleteCollection(collectionId);
        // Store action also handles closing the modal and edit mode
    }

    return (
        <div>
            <>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ y: 20, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 10, opacity: 0, scale: 0.9 }}
                    className="fixed z-50 p-4 top-1/2 left-1/2 bg-paper rounded-2xl -translate-x-1/2 -translate-y-1/2 aspect-video w-[370px] shadow-book">

                    <div className=" h-full mb-4">
                        <div className="flex items-center justify-between w-full">
                            <h3 className='text-xl'>Delete Collection</h3>
                            <motion.button whileTap={{ scale: 0.95 }} className="bg-stone px-3 py-1 text-sm rounded-full text-dark-grey/95 cursor-pointer" onClick={toggleDeleteModal}>Close</motion.button>
                        </div>

                        <div className="flex w-full h-full flex-col items-center justify-center pb-2 gap-4">
                            <p className='text-center text-dark-grey/80 text-sm'>Are you sure you want to delete this collection? This action cannot be undone.</p>
                            <motion.button 
                                onClick={handleDelete}
                                whileTap={{ scale: 0.95 }} 
                                className='bg-rose-400 text-white w-full p-3 rounded-2xl cursor-pointer text-sm'>
                                Delete Permanently
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </>
        </div>
    )
}

export default DeleteModal