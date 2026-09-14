import { create } from "zustand";

export interface ShelfUiStoreState {
  activeEditId: number | null;
  editingCollectionId: number | null;
  deletingCollectionId: number | null;
  viewMode: "grid" | "list";
  setActiveEditId: (id: number | null) => void;
  setEditingCollectionId: (id: number | null) => void;
  setDeletingCollectionId: (id: number | null) => void;
  setViewMode: (mode: "grid" | "list") => void;
  clearActiveCollectionUi: () => void;
}

export const useShelfUiStore = create<ShelfUiStoreState>((set) => ({
  activeEditId: null,
  editingCollectionId: null,
  deletingCollectionId: null,
  viewMode: "grid",
  setActiveEditId: (id) => set({ activeEditId: id }),
  setEditingCollectionId: (id) => set({ editingCollectionId: id }),
  setDeletingCollectionId: (id) => set({ deletingCollectionId: id }),
  setViewMode: (mode) => set({ viewMode: mode }),
  clearActiveCollectionUi: () =>
    set({
      activeEditId: null,
      editingCollectionId: null,
      deletingCollectionId: null,
    }),
}));
