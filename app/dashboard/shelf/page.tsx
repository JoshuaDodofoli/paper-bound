'use client'

import React, { useState } from 'react'
import Wrapper from '../../components/Wrapper'
import { PlusCircle } from 'lucide-react'

interface collectionProps {
  id: number;
  name: string;
  books?: number;
}

const page = () => {

  const [collections, setCollections] = useState<collectionProps[]>([]);
  const [collectionName, setCollectionName] = useState('');
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prev => !prev);
  }

  return (
    <div className='mt-12'>
      <Wrapper>
        <section>
          <div onClick={toggleModal} className="flex items-center justify-start gap-2 bg-stone w-fit p-2 rounded-lg my-4">
            <p>Add</p>
            <PlusCircle />
          </div>

          {showModal && (

            <>
              <div className="fixed inset-0 z-30 bg-black/20 backdrop-blur-xs" />

              <div className="absolute z-30 p-4 top-1/2 left-1/2 bg-paper rounded-2xl -translate-x-1/2 -translate-y-1/2 aspect-video w-[380px] shadow-book">

                <div className=" h-full mb-4">
                  <div className="flex items-center justify-between w-full">
                    <h3 className='text-xl text-dark-grey font-medium'>New Collection</h3>
                    <button className="" onClick={toggleModal}>Close</button>
                  </div>

                  <div className="flex w-full h-full flex-col items-center justify-center pb-2">
                    <form className="flex flex-col w-full space-y-3">
                      <label className='text-sm text-dark-grey/90 font-medium'>Collection Name</label>
                      <input type="text" placeholder='e.g. Want to read' className='bg-dark-grey/5 border-stone/70 border rounded-2xl p-3 ' />
                      <button className='bg-stone p-3 rounded-2xl'>Add Collection</button>
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}


          <div className='grid place-items-center grid-cols-1 md:grid-cols-2 gap-6'>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-video min-w-84 w-full bg-red-200 rounded-lg shadow-book transition-shadow hover:shadow-book-hover" />
            ))}
          </div>


        </section>
      </Wrapper>
    </div>
  )
}

export default page