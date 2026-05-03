import { create } from "zustand";

export interface Collection {
    id: number;
    name: string;
    books?: number;
}

interface CollectionStore {
    collections: Collection[];
    showEdit: boolean;
    editingCollectionId: number | null;
    deletingCollectionId: number | null;
    addCollection: (name: string) => void;
    deleteCollection: (id: number) => void;
    renameCollection: (id: number, name: string) => void;
    setShowEdit: (show: boolean) => void;
    setEditingCollectionId: (id: number | null) => void;
    setDeletingCollectionId: (id: number | null) => void;
}

export const useCollectionStore = create<CollectionStore>((set) => ({
    collections: [],
    showEdit: false,
    editingCollectionId: null,
    deletingCollectionId: null,
    addCollection: (name) =>
        set((state) => ({
            collections: [
                ...state.collections,
                {
                    id: Date.now(),
                    name: name.trim(),
                    books: 0,
                },
            ],
        })),
    deleteCollection: (id) =>
        set((state) => ({
            collections: state.collections.filter((collection) => collection.id !== id),
            deletingCollectionId: null, // Reset after deletion
            showEdit: false, // Close edit mode after deletion
        })),
    renameCollection: (id, name) =>
        set((state) => ({
            collections: state.collections.map((collection) =>
                collection.id === id ? { ...collection, name: name.trim() } : collection
            ),
            editingCollectionId: null, // Reset after rename
            showEdit: false, // Close edit mode after rename
        })),
    setShowEdit: (show) => set({ showEdit: show }),
    setEditingCollectionId: (id) => set({ editingCollectionId: id }),
    setDeletingCollectionId: (id) => set({ deletingCollectionId: id }),
}));
