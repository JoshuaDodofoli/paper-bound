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
  topWork?: string;
  workCount?: number;
  ratingsAverage?: number;
  ratingsCount?: number;
}

export interface Book {
  key: string;
  id?: string;
  slug: string;
  title: string;
  description?: string;
  author: string;
  authorSlug: string;
  coverUrl?: string | null;
  color?: string;
  ebookAccess?: boolean;
  firstPublishYear?: number;
  numberOfPages?: number;
  firstSentence?: string[];
  publisher?: string[];
  seriesKey?: string;
  rating?: number;
  seriesName?: string;
  seriesPosition?: number;
  subjects?: string[];
  places?: string[];
  ratingsAverage?: number;
  ratingsCount?: number;
  sourceShelfId?: string;
  recommendations?: RecommendedBook[];
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
  coverUrl?: string | null;
}

export interface RecommendedBook {
  key: string;
  slug: string;
  title: string;
  author: string;
  coverUrl: string | null;
}