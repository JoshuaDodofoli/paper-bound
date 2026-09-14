import type { Book } from "@/domain/books/types";

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
