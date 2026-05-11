'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { DropdownItem } from '@/app/lib/interface'

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  items: DropdownItem[];
  className?: string;
}

const Dropdown = ({ isOpen, onClose, items, className }: DropdownProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10, transformOrigin: 'top right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute top-12 right-0 z-50 w-48 overflow-hidden rounded-2xl border border-stone/60 bg-stone/95 backdrop-blur-md shadow-xl ${className}`}
          >
            <div className="flex flex-col p-1.5">
              {items.map((item, idx) => (
                <React.Fragment key={idx}>
                  {item.divider && <div className="h-px w-full bg-dark-grey/10 my-1" />}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      item.onClick();
                      onClose();
                    }}
                    className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all active:scale-95 cursor-pointer ${
                      item.variant === 'danger' 
                        ? 'text-rose-500 hover:bg-rose-500/10' 
                        : 'text-dark-grey/90 hover:bg-dark-grey/5'
                    }`}
                  >
                    <span className={item.variant === 'danger' ? 'text-rose-400' : 'text-dark-grey/70'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Dropdown
