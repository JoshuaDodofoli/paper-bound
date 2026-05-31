import { MOCK_BOOKS } from "@/domain/books/fixtures";
import type { Author } from "@/domain/authors/types";

export const MOCK_AUTHORS: Author[] = [
  {
    id: "a1",
    name: "J.R.R. Tolkien",
    slug: "j-r-r-tolkien",
    bio: "John Ronald Reuel Tolkien was an English writer, poet, philologist, and academic, best known as the author of the high fantasy works The Hobbit and The Lord of the Rings. He served as the Rawlinson and Bosworth Professor of Anglo-Saxon and Fellow of Pembroke College, Oxford, from 1925 to 1945 and Merton Professor of English Language and Literature and Fellow of Merton College, Oxford, from 1945 to 1959.",
    image: "",
    born: "1892-01-03",
    website: "https://www.tolkiensociety.org",
    genres: ["Fantasy", "High Fantasy", "Philology"],
    works: MOCK_BOOKS.filter((book) => book.authorSlug === "j-r-r-tolkien"),
  },
  {
    id: "a2",
    name: "George Orwell",
    slug: "george-orwell",
    bio: "Eric Arthur Blair, better known by his pen name George Orwell, was an English novelist, essayist, journalist, and critic. His work is characterized by lucid prose, social criticism, opposition to totalitarianism, and support of democratic socialism.",
    image: "",
    born: "1903-06-25",
    website: "https://www.orwellfoundation.com",
    genres: ["Dystopian", "Political Fiction", "Essays"],
    works: MOCK_BOOKS.filter((book) => book.authorSlug === "george-orwell"),
  },
];
