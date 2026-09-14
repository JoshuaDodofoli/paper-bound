import { create } from "zustand";
import type { User } from "@/domain/users/types";

const DEFAULT_USER: User = {
  name: "Joshua Dodofoli",
  username: "joshua",
  joinedDate: "May 2024",
  location: "Ghana",
  theme: "paper",
};

export interface UserPreferencesStoreState {
  user: User;
  updateUser: (data: Partial<User>) => void;
  setTheme: (theme: User["theme"]) => void;
  logout: () => void;
  deleteAccount: () => void;
}

export const useUserPreferencesStore = create<UserPreferencesStoreState>((set) => ({
  user: DEFAULT_USER,
  updateUser: (data) => set((state) => ({ user: { ...state.user, ...data } })),
  setTheme: (theme) => set((state) => ({ user: { ...state.user, theme } })),
  logout: () => undefined,
  deleteAccount: () => undefined,
}));
