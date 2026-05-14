'use client'

import React from 'react'
import { FolderPen, Share, Trash2 } from 'lucide-react'
import { useCollectionStore } from '@/app/lib/store'
import { useToast } from '@/app/lib/hooks/useToast';
import Toast from '../../(components)/ui/Toast';
import { DropdownItem } from '@/app/lib/interface';
import Dropdown from '../../(components)/ui/Dropdown';

interface editOptionsProps {
    collectionId: number;
}

const EditOptions = ({ collectionId }: editOptionsProps) => {
    const setEditingCollectionId = useCollectionStore((state) => state.setEditingCollectionId);
    const setDeletingCollectionId = useCollectionStore((state) => state.setDeletingCollectionId);
    const setActiveEditId = useCollectionStore((state) => state.setActiveEditId);
    const collection = useCollectionStore((state) => state.collections.find(c => c.id === collectionId));
    
    const { toast, showToast, hideToast } = useToast();

    const handleShare = async () => {
        const shareUrl = `${window.location.origin}/dashboard/shelf/${collection?.id}`;
        try {
            await navigator.clipboard.writeText(shareUrl);
            showToast('Link copied to clipboard!');
            setTimeout(() => setActiveEditId(null), 1000); // Close after a delay
        } catch (err) {
            showToast('Failed to copy link', 'error');
        }
    };

    const items: DropdownItem[] = [
        {
            label: 'Edit name',
            icon: <FolderPen size={18} />,
            onClick: () => setEditingCollectionId(collectionId),
        },
        {
            label: 'Share collection',
            icon: <Share size={18} />,
            onClick: handleShare,
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
        <>
            <Dropdown 
                isOpen={true} 
                onClose={() => setActiveEditId(null)} 
                items={items} 
                className="top-12 right-3"
            />
            <Toast 
                isVisible={toast.isVisible}
                message={toast.message}
                type={toast.type}
                onClose={hideToast}
            />
        </>
    )
}

export default EditOptions