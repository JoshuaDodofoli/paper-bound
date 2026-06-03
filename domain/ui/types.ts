export interface DropdownItem {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'danger';
  divider?: boolean;
  path?: string;
}

export interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  items: DropdownItem[];
  className?: string;
}
