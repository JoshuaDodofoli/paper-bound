'use client'
import { motion } from 'motion/react'
import React from 'react'

interface ModalProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
    isOpen?: boolean;
    className?: string;
    showCloseButton?: boolean;
    showDivider?: boolean;
    center?: boolean;
    width?: string;
    zIndex?: number;
}

const Modal = ({ 
    title, 
    onClose, 
    children, 
    className = "", 
    showCloseButton = true,
    showDivider = false,
    center = true,
    width = "w-[390px]",
    zIndex = 50
}: ModalProps) => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ zIndex }}
                className="fixed inset-0 bg-black/20 backdrop-blur-xs"
                onClick={onClose}
            />

            <motion.div
                initial={{ y: 20, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 10, opacity: 0, scale: 0.9 }}
                style={{ zIndex: zIndex + 10 }}
                className={`fixed p-6 bg-paper rounded-3xl shadow-book left-1/2 -translate-x-1/2 
                    ${center ? 'top-1/2 -translate-y-1/2' : 'top-[15%]'} 
                    ${width} ${className}`}
            >
                <div className="flex items-center justify-between w-full mb-5">
                    <h3 className='text-xl font-semibold text-dark-grey'>{title}</h3>
                    {showCloseButton && (
                        <motion.button 
                            whileTap={{ scale: 0.95 }} 
                            className="bg-stone hover:bg-stone/80 px-3 py-1 text-sm rounded-full text-dark-grey/95 cursor-pointer transition-colors" 
                            onClick={onClose}
                        >
                            Close
                        </motion.button>
                    )}
                </div>
                
                {showDivider && <hr className='border-dark-grey/15 mt-3 mb-4' />}
                
                <div className="w-full">
                    {children}
                </div>
            </motion.div>
        </>
    )
}

export default Modal
