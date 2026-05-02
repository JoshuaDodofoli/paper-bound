import { motion } from 'motion/react'

interface ModalProps {
    collectionName: string;
    setCollectionName: (value: string) => void;
    handleSaveCollection: (e: any) => void;
    toggleModal: () => void;
}

const CreateCollectionModal = ({ toggleModal, collectionName, setCollectionName, handleSaveCollection }: ModalProps) => {
    return (
        <div>
            <>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-30 bg-black/20 backdrop-blur-xs"
                />

                <motion.div
                    initial={{ y: 20, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 10, opacity: 0, scale: 0.9 }}
                    className="absolute z-30 p-4 top-1/2 left-1/2 bg-paper rounded-2xl -translate-x-1/2 -translate-y-1/2 aspect-video w-[370px] shadow-book">

                    <div className=" h-full mb-4">
                        <div className="flex items-center justify-between w-full">
                            <h3 className='text-xl'>New Collection</h3>
                            <motion.button whileTap={{ scale: 0.95 }} className="bg-stone px-3 py-1 text-sm rounded-full text-dark-grey/95 cursor-pointer" onClick={toggleModal}>Close</motion.button>
                        </div>

                        <div className="flex w-full h-full flex-col items-center justify-center pb-2">
                            <form onSubmit={handleSaveCollection} className="flex flex-col w-full space-y-3">
                                <label className='text-sm text-dark-grey/90 font-medium'>Collection Name</label>
                                <input
                                    autoFocus
                                    value={collectionName}
                                    onChange={(e) => setCollectionName(e.target.value)}
                                    type="text" placeholder='e.g. Want to read' className='bg-dark-grey/5 border-stone/70 border rounded-2xl p-3 ' />
                                <motion.button whileTap={{ scale: 0.95 }} className='bg-stone p-3 rounded-2xl cursor-pointer'>Add Collection</motion.button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </>
        </div>
    )
}

export default CreateCollectionModal