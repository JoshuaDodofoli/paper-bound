import type { ReactNode } from "react";

export interface DropdownItem {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
  variant?: "default" | "danger";
  divider?: boolean;
  path?: string;
}
