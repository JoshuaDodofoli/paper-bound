'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

interface BackButtonProps {
  label?: string;
  className?: string;
  variant?: 'link' | 'button';
}

const BackButton = ({ 
  label = 'Back', 
  className = "", 
  variant = 'link' 
}: BackButtonProps) => {
  const router = useRouter();

  if (variant === 'button') {
    return (
      <button
        onClick={() => router.back()}
        className={`flex items-center gap-2 bg-stone/60 hover:bg-stone/80 text-dark-grey px-4 py-2 rounded-full font-medium transition-all active:scale-95 cursor-pointer ${className}`}
      >
        <ChevronLeft size={18} />
        <span>{label}</span>
      </button>
    )
  }

  return (
    <button 
      onClick={() => router.back()}
      className={`flex items-center gap-2 text-dark-grey/60 hover:text-dark-grey transition-colors group cursor-pointer font-medium ${className}`}
    >
      <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
      <span>{label}</span>
    </button>
  )
}

export default BackButton
