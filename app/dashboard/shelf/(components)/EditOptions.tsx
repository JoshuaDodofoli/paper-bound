'use client'

import React from 'react'
import { FolderPen, Share, Trash2 } from 'lucide-react'
import { useCollectionStore } from '@/app/lib/store'
import Dropdown, { DropdownItem } from '../../(components)/ui/Dropdown';

interface editOptionsProps {
    collectionId: number;
}

const EditOptions = ({ collectionId }: editOptionsProps) => {
    const setEditingCollectionId = useCollectionStore((state) => state.setEditingCollectionId);
    const setDeletingCollectionId = useCollectionStore((state) => state.setDeletingCollectionId);
    const setActiveEditId = useCollectionStore((state) => state.setActiveEditId);

    const items: DropdownItem[] = [
        {
            label: 'Edit name',
            icon: <FolderPen size={18} />,
            onClick: () => setEditingCollectionId(collectionId),
        },
        {
            label: 'Share collection',
            icon: <Share size={18} />,
            onClick: () => {},
        },
        {
            label: 'Delete shelf',
            icon: <Trash2 size={18} />,
            onClick: () => setDeletingCollectionId(collectionId),
            variant: 'danger',
            divider: true,
        },
    ];

    return (
        <Dropdown 
            isOpen={true} 
            onClose={() => setActiveEditId(null)} 
            items={items} 
            className="top-12 right-3"
        />
    )
}

export default EditOptions