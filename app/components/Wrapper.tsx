import React from 'react'

interface WrapperProps {
    children: React.ReactNode
}

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div className='max-w-370 mx-auto w-full px-5'>{children}</div>
  )
}

export default Wrapper