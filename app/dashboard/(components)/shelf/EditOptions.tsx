'use client'

import { FolderPen, Trash2 } from 'lucide-react'
import { motion } from 'motion/react'
import { useCollectionStore } from '@/app/utils/store'

interface editOptionsProps {
    collectionId: number;
}

const EditOptions = ({ collectionId }: editOptionsProps) => {

    const setEditingCollectionId = useCollectionStore((state) => state.setEditingCollectionId);
    const setDeletingCollectionId = useCollectionStore((state) => state.setDeletingCollectionId);
    const setActiveEditId = useCollectionStore((state) => state.setActiveEditId);

    return (
        <>
            {/* Transparent backdrop to catch clicks outside the dropdown */}
            <div
                className="fixed inset-0 z-40"
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setActiveEditId(null);
                }}
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10, transformOrigin: 'top right' }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute top-12 right-3 z-50 w-44 overflow-hidden rounded-2xl border border-stone/60 bg-stone/95 backdrop-blur-md shadow-xl"
            >
                <div className="flex flex-col p-1.5">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setEditingCollectionId(collectionId);
                            setActiveEditId(null);
                        }}
                        className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-dark-grey/90 transition-all hover:bg-dark-grey/5 active:scale-95 cursor-pointer"
                    >
                        <FolderPen size={18} className="text-dark-grey/70" />
                        <span>Edit name</span>
                    </button>

                    <div className="h-px w-full bg-dark-grey/5 my-1" />

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setDeletingCollectionId(collectionId);
                            setActiveEditId(null);
                        }}
                        className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-rose-500 transition-all hover:bg-rose-500/10 active:scale-95 cursor-pointer"
                    >
                        <Trash2 size={18} className="text-rose-400" />
                        <span>Delete shelf</span>
                    </button>
                </div>
            </motion.div>
        </>
    )
}

export default EditOptions