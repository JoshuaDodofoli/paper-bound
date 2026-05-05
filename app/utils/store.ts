import { create } from "zustand";

export interface Collection {
    id: number;
    name: string;
    books?: number;
}

interface CollectionStore {
    collections: Collection[];
    activeEditId: number | null;
    editingCollectionId: number | null;
    deletingCollectionId: number | null;
    addCollection: (name: string) => void;
    deleteCollection: (id: number) => void;
    renameCollection: (id: number, name: string) => void;
    setActiveEditId: (id: number | null) => void;
    setEditingCollectionId: (id: number | null) => void;
    setDeletingCollectionId: (id: number | null) => void;
}

export const useCollectionStore = create<CollectionStore>((set) => ({
    collections: [],
    activeEditId: null,
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
            deletingCollectionId: null,
            activeEditId: null,
        })),
    renameCollection: (id, name) =>
        set((state) => ({
            collections: state.collections.map((collection) =>
                collection.id === id ? { ...collection, name: name.trim() } : collection
            ),
            editingCollectionId: null,
            activeEditId: null,
        })),
    setActiveEditId: (id) => set({ activeEditId: id }),
    setEditingCollectionId: (id) => set({ editingCollectionId: id }),
    setDeletingCollectionId: (id) => set({ deletingCollectionId: id }),
}));
