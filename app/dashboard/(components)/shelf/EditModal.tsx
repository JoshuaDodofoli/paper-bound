'use client'
import { useCollectionStore } from '@/app/utils/store';
import { motion } from 'motion/react';
import { useState } from 'react';

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
                            <h3 className='text-xl'>Edit Collection</h3>
                            <motion.button whileTap={{ scale: 0.95 }} className="bg-stone px-3 py-1 text-sm rounded-full text-dark-grey/95 cursor-pointer" onClick={toggleEditModal}>Close</motion.button>
                        </div>

                        <div className="flex w-full h-full flex-col items-center justify-center pb-2">
                            <form onSubmit={handleRename} className="flex flex-col w-full space-y-3">
                                <label className='text-sm text-dark-grey/90 font-medium'>Collection Name</label>
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder='e.g. Want to read'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='bg-dark-grey/5 border-stone/70 border rounded-2xl p-3 ' />
                                <motion.button whileTap={{ scale: 0.95 }} className='bg-stone text-dark-grey/90 p-3 rounded-2xl cursor-pointer text-sm'>Save Changes</motion.button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </>
        </div>
    )
}

export default EditModal