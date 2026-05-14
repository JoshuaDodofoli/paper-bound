export interface Author {
  id: string;
  name: string;
  slug: string;
  bio: string;
  image: string;
  born: string;
  website: string;
  genres: string[];
  works: Book[];
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  author: string;
  authorSlug: string;
  coverId: string;
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

export interface SearchResults {
  key: string;
  slug: string;
  title: string;
  author: string;
  coverId: string;
}