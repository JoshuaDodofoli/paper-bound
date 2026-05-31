'use client'

import { LogOut, Palette, User } from "lucide-react";
import { useState } from "react";
import Dropdown from "@/components/overlays/Dropdown";
import type { DropdownItem } from "@/components/overlays/dropdown.types";
import { useUserPreferencesStore } from "@/features/profile/state/useUserPreferencesStore";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const logout = useUserPreferencesStore((state) => state.logout);
  const user = useUserPreferencesStore((state) => state.user);

  const menuItems: DropdownItem[] = [
    {
      label: "Profile",
      icon: <User size={18} />,
      path: "/dashboard/profile",
    },
    {
      label: "Theme",
      icon: <Palette size={18} />,
      path: "/dashboard/profile",
    },
    {
      label: "Sign out",
      icon: <LogOut size={18} />,
      onClick: logout,
      variant: "danger",
      divider: true,
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex focus:outline-none transition-transform active:scale-95"
      >
        <div className="size-10 rounded-full bg-green-200 shadow-book flex items-center justify-center text-lg font-serif text-dark-grey">
          {user.name.charAt(0)}
        </div>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={menuItems}
        className="top-12"
      />
    </div>
  );
};

export default UserMenu;
