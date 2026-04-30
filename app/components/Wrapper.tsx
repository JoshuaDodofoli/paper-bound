import React from 'react'

interface WrapperProps {
    children: React.ReactNode
}

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div className='max-w-200 mx-auto w-full px-4'>{children}</div>
  )
}

export default Wrapper