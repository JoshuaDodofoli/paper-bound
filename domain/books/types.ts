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

export interface RecommendedBook {
  key: string;
  slug: string;
  title: string;
  author: string;
  coverUrl: string | null;
}

export interface SearchResults {
  key: string;
  slug: string;
  title: string;
  author: string;
  coverUrl?: string | null;
}
