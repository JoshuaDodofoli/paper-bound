'use client'

import React from 'react'
import { FolderPen, Share, Trash2 } from 'lucide-react'
import { useShelfStore } from '@/features/shelf/state/useShelfStore'
import { useShelfUiStore } from '@/features/shelf/state/useShelfUiStore'
import { useToast } from '@/hooks/ui/useToast';
import Toast from '@/components/overlays/Toast';
import type { DropdownItem } from '@/components/overlays/dropdown.types';
import Dropdown from '@/components/overlays/Dropdown';

interface editOptionsProps {
    collectionId: number;
}

const EditOptions = ({ collectionId }: editOptionsProps) => {
    const setEditingCollectionId = useShelfUiStore((state) => state.setEditingCollectionId);
    const setDeletingCollectionId = useShelfUiStore((state) => state.setDeletingCollectionId);
    const setActiveEditId = useShelfUiStore((state) => state.setActiveEditId);
    const collection = useShelfStore((state) => state.collections.find(c => c.id === collectionId));
    
    const { toast, showToast, hideToast } = useToast();

    const handleShare = async () => {
        if (!collection) {
            showToast('Collection not found', 'error');
            return;
        }

        const shareUrl = `${window.location.origin}/dashboard/shelf/${collection.slug}`;
        try {
            await navigator.clipboard.writeText(shareUrl);
            showToast('Link copied to clipboard!');
            setTimeout(() => setActiveEditId(null), 1000); // Close after a delay
        } catch {
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
