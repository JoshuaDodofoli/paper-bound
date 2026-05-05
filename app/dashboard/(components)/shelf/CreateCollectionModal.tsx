import { motion } from 'motion/react'
import Modal from '../Modal';

interface ModalProps {
    collectionName: string;
    setCollectionName: (value: string) => void;
    handleSaveCollection: (e: any) => void;
    toggleModal: () => void;
}

const CreateCollectionModal = ({ toggleModal, collectionName, setCollectionName, handleSaveCollection }: ModalProps) => {
    return (
        <Modal 
            title="New Collection" 
            onClose={toggleModal}
            className="aspect-video"
        >
            <div className="flex w-full h-full flex-col items-center justify-center pb-2">
                <form onSubmit={handleSaveCollection} className="flex flex-col w-full space-y-3">
                    <label className='text-sm text-dark-grey/90 font-medium'>Collection Name</label>
                    <input
                        autoFocus
                        value={collectionName}
                        onChange={(e) => setCollectionName(e.target.value)}
                        type="text" 
                        placeholder='e.g. Want to read' 
                        className='bg-dark-grey/5 border-stone/70 border rounded-2xl p-3 focus:border-dark-grey/30 focus:outline-none' 
                    />
                    <motion.button whileTap={{ scale: 0.95 }} className='bg-stone text-dark-grey/90 p-3 rounded-2xl cursor-pointer text-sm font-medium'>Add Collection</motion.button>
                </form>
            </div>
        </Modal>
    )
}

export default CreateCollectionModal