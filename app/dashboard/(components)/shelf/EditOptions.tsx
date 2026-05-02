'use client'

import { FolderPen, Trash2 } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

const EditOptions = () => {

    const editOptionsContainer = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2
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
                duration: 0.5,
                type: "spring" as const,
                bounce: 0.25,
            }
        }
    }

    return (
        <motion.div
            variants={editOptionsContainer}
            initial="initial"
            animate="animate"
            exit="initial"
        >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='bg-transparent backdrop-blur-xs absolute inset-0 z-10 w-full h-full rounded-lg' />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-10">
                    <div className="flex items-center justify-center gap-4 p-4 text-dark-grey/80">

                        <motion.button
                            variants={editOptionsItem}
                            whileTap={{ scale: 0.95 }}
                            className='size-12 rounded-full p-2 cursor-pointer bg-stone flex items-center justify-center'>
                            <FolderPen size={20} className='text-dark-grey/90' />
                        </motion.button>

                        <motion.button
                            variants={editOptionsItem}
                            whileTap={{ scale: 0.95 }}
                            className='size-12 rounded-full p-2 cursor-pointer flex items-center justify-center bg-rose-200 text-white'>
                            <Trash2 size={20} className='text-rose-400' />
                        </motion.button>
                    </div>
                </div>
        </motion.div>
    )
}

export default EditOptions