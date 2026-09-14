import { create } from "zustand";
import type { Collection } from "@/domain/collections/types";
import { createCollectionSlug } from "@/features/shelf/lib/slugify";

export interface ShelfStoreState {
  collections: Collection[];
  addCollection: (name: string) => void;
  deleteCollection: (id: number) => void;
  renameCollection: (id: number, name: string) => void;
}

export const useShelfStore = create<ShelfStoreState>((set) => ({
  collections: [],
  addCollection: (name) =>
    set((state) => {
      const trimmedName = name.trim();

      if (!trimmedName) {
        return state;
      }

      return {
        collections: [
          ...state.collections,
          {
            id: Date.now(),
            name: trimmedName,
            slug: createCollectionSlug(trimmedName, state.collections),
            bookCount: 0,
          },
        ],
      };
    }),
  deleteCollection: (id) =>
    set((state) => ({
      collections: state.collections.filter((collection) => collection.id !== id),
    })),
  renameCollection: (id, name) =>
    set((state) => {
      const trimmedName = name.trim();

      if (!trimmedName) {
        return state;
      }

      return {
        collections: state.collections.map((collection) =>
          collection.id === id
            ? {
                ...collection,
                name: trimmedName,
                slug: createCollectionSlug(trimmedName, state.collections, id),
              }
            : collection,
        ),
      };
    }),
}));
