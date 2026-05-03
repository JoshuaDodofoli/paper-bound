import { create } from "zustand";

export interface Collection {
    id: number;
    name: string;
    books?: number;
}

interface CollectionStore {
    collections: Collection[];
    showEdit: boolean;
    addCollection: (name: string) => void;
    deleteCollection: (id: number) => void;
    renameCollection: (id: number, name: string) => void;
    setShowEdit: (show: boolean) => void;
}

export const useCollectionStore = create<CollectionStore>((set) => ({
    collections: [],
    showEdit: false,
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
        })),
    renameCollection: (id, name) =>
        set((state) => ({
            collections: state.collections.map((collection) =>
                collection.id === id ? { ...collection, name: name.trim() } : collection
            ),
        })),
    setShowEdit: (show) => set({ showEdit: show }),
}));
