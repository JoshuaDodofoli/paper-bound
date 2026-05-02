'use client'

import { FolderPen, Trash2 } from 'lucide-react'
import { motion } from 'motion/react'

const EditOptions = () => {
    return (
        <div>
            <div className='bg-amber-200 absolute inset-0 z-10 w-full h-full rounded-lg' />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-10">
                <div className="flex items-center justify-center gap-4 p-4 text-dark-grey/80">

                    {/* Rename button */}
                    <motion.span
                        whileTap={{ scale: 0.95 }}
                        className='size-12 rounded-full p-2 cursor-pointer bg-stone flex items-center justify-center'>
                        <FolderPen size={20} className='text-dark-grey/90' />
                    </motion.span>

                    {/* Delete button */}
                    <motion.span
                        whileTap={{ scale: 0.95 }}
                        className='size-12 rounded-full p-2 cursor-pointer flex items-center justify-center bg-rose-200 text-white'>
                        <Trash2 size={20} className='text-rose-400' />
                    </motion.span>
                </div>
            </div>
        </div>
    )
}

export default EditOptions