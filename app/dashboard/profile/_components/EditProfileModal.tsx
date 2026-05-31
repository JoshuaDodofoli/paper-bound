'use client'

import { useState } from 'react'
import Modal from '@/components/overlays/Modal'
import { useUserPreferencesStore } from '@/features/profile/state/useUserPreferencesStore'

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileModal = ({ isOpen, onClose }: EditProfileModalProps) => {
  const user = useUserPreferencesStore((state) => state.user);
  const updateUser = useUserPreferencesStore((state) => state.updateUser);
  
  const [name, setName] = useState(user.name);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <form onSubmit={handleSave} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase font-bold text-dark-grey/40 tracking-widest px-1">Full Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="bg-ash/50 border border-stone/10 rounded-2xl p-4 text-sm font-sans font-bold focus:outline-none focus:border-stone/40 transition-colors"
            required
          />
        </div>


        <div className="flex gap-3 pt-2">
          <button 
            type="button" 
            onClick={onClose}
            className="flex-1 p-4 rounded-2xl text-sm font-sans font-bold text-dark-grey/40 hover:bg-ash transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="flex-1 p-4 bg-dark-grey text-white rounded-2xl text-sm font-sans font-bold shadow-lg hover:bg-dark-grey/90 transition-colors cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default EditProfileModal
