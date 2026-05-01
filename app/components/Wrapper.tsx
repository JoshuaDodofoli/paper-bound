import React from 'react'

interface WrapperProps {
    children: React.ReactNode
    className?: string
}

const Wrapper = ({ children, className }: WrapperProps) => {
  return (
    <div className={`max-w-370 mx-auto w-full px-5 ${className}`}>{children}</div>
  )
}

export default Wrapper