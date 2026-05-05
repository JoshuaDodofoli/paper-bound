'use client'
import { useCollectionStore } from '@/app/utils/store';
import { motion } from 'motion/react';
import { useState } from 'react';

import Modal from '../Modal';

interface ModalProps {
    collectionId: number;
}

const EditModal = ({ collectionId }: ModalProps) => {

    const collections = useCollectionStore((state) => state.collections);
    const renameCollection = useCollectionStore((state) => state.renameCollection);
    const setEditingCollectionId = useCollectionStore((state) => state.setEditingCollectionId);

    const toggleEditModal = () => setEditingCollectionId(null);

    const currentCollection = collections.find(c => c.id === collectionId);
    const [name, setName] = useState(currentCollection?.name || '');

    const handleRename = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        renameCollection(collectionId, name);
    }

    return (
        <Modal 
            title="Edit Collection" 
            onClose={toggleEditModal}
            className="aspect-video"
        >
            <div className="flex w-full h-full flex-col items-center justify-center pb-2">
                <form onSubmit={handleRename} className="flex flex-col w-full space-y-3">
                    <label className='text-sm text-dark-grey/90 font-medium'>Collection Name</label>
                    <input
                        autoFocus
                        type="text"
                        placeholder='e.g. Want to read'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='bg-dark-grey/5 border-stone/70 border rounded-2xl p-3 focus:border-dark-grey/30 focus:outline-none' 
                    />
                    <motion.button whileTap={{ scale: 0.95 }} className='bg-stone text-dark-grey/90 p-3 rounded-2xl cursor-pointer text-sm font-medium'>Save Changes</motion.button>
                </form>
            </div>
        </Modal>
    )
}

export default EditModal