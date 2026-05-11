export interface Book {
  id: string;
  slug: string;
  title: string;
  author: string;
  authorSlug: string;
  color: string;
}


export interface DropdownItem {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'danger';
  divider?: boolean;
  path?: string;
}

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  items: DropdownItem[];
  className?: string;
}