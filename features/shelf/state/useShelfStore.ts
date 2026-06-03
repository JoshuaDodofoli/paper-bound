import { create } from "zustand";
import type { Collection } from "@/domain/collections/types";
import type { User } from "@/domain/users/types";

export interface ShelfStoreState {
  collections: Collection[];
  activeEditId: number | null;
  editingCollectionId: number | null;
  deletingCollectionId: number | null;
  viewMode: 'grid' | 'list';
  user: User;
  addCollection: (name: string) => void;
  deleteCollection: (id: number) => void;
  renameCollection: (id: number, name: string) => void;
  setActiveEditId: (id: number | null) => void;
  setEditingCollectionId: (id: number | null) => void;
  setDeletingCollectionId: (id: number | null) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setTheme: (theme: User['theme']) => void;
  updateUser: (data: Partial<User>) => void;
  logout: () => void;
  deleteAccount: () => void;
}

export const useShelfStore = create<ShelfStoreState>((set) => ({
  collections: [],
  activeEditId: null,
  editingCollectionId: null,
  deletingCollectionId: null,
  viewMode: 'grid',
  user: {
    name: "Joshua Dodofoli",
    username: "joshua",
    joinedDate: "May 2024",
    location: "Ghana",
    theme: 'paper'
  },
  updateUser: (data) => set((state) => ({ user: { ...state.user, ...data } })),

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
  setViewMode: (mode) => set({ viewMode: mode }),
  setTheme: (theme) => set((state) => ({ user: { ...state.user, theme } })),
  logout: () => console.log("Logout triggered"),
  deleteAccount: () => console.log("Delete account triggered"),
}));
