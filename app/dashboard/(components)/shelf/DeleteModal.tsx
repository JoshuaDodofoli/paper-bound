'use client'

import { motion } from 'motion/react'
import { useCollectionStore } from '@/app/utils/store'

import Modal from '../Modal';

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
        <Modal 
            title="Delete Collection" 
            onClose={toggleDeleteModal}
            className="aspect-video"
        >
            <div className="flex w-full h-full flex-col items-center justify-center pb-2 gap-4">
                <p className='text-center text-dark-grey/80 text-sm'>Are you sure you want to delete this collection? This action cannot be undone.</p>
                <motion.button 
                    onClick={handleDelete}
                    whileTap={{ scale: 0.95 }} 
                    className='bg-rose-500 hover:bg-rose-600 transition-colors text-white w-full p-3 rounded-2xl cursor-pointer text-sm font-medium'>
                    Delete Permanently
                </motion.button>
            </div>
        </Modal>
    )
}

export default DeleteModal