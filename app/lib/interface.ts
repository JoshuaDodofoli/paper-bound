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
  key: string;
  id?: string;
  slug: string;

  title: string;    
  description?: string;     
  author: string;        
  authorSlug: string;    
  
  coverId: string;  

  //ebook access 
  ebookAccess?: boolean;   
  
  // publication info
  firstPublishYear?: number;  
  numberOfPages?: number;
  firstSentence?: string[];
  publisher?: string[];
  
  // series info
  seriesKey?: string;
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
  coverId: string;
}

export interface RecommendedBook {
    key: string;
    slug: string;
    title: string;
    author: string;
    coverId: number | null;
}