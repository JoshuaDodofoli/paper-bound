'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Info, X } from 'lucide-react'

interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'error';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast = ({ 
  message, 
  type = 'success', 
  isVisible, 
  onClose, 
  duration = 3000 
}: ToastProps) => {

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  const icons = {
    success: <CheckCircle2 size={18} className="text-emerald-500" />,
    info: <Info size={18} className="text-blue-500" />,
    error: <X size={18} className="text-red-500" />
  };

  const bgColors = {
    success: 'bg-emerald-50 border-emerald-100',
    info: 'bg-blue-50 border-blue-100',
    error: 'bg-red-50 border-red-100'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] min-w-[280px]"
        >
          <div className={`flex items-center gap-3 p-4 rounded-2xl border shadow-xl ${bgColors[type]} backdrop-blur-sm`}>
            <div className="shrink-0">{icons[type]}</div>
            <p className="text-sm font-sans font-bold text-dark-grey/80 flex-1">{message}</p>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-black/5 rounded-lg transition-colors text-dark-grey/40 cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast
