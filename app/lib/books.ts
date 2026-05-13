import { Book, Author } from "./interface";

export const MOCK_BOOKS: Book[] = [
  { id: "1", slug: "the-hobbit", title: "The Hobbit", author: "J.R.R. Tolkien", authorSlug: "j-r-r-tolkien", color: "bg-stone" },
  { id: "2", slug: "1984", title: "1984", author: "George Orwell", authorSlug: "george-orwell", color: "bg-ash" },
  { id: "3", slug: "brave-new-world", title: "Brave New World", author: "Aldous Huxley", authorSlug: "aldous-huxley", color: "bg-paper" },
  { id: "4", slug: "the-great-gatsby", title: "The Great Gatsby", author: "F. Scott Fitzgerald", authorSlug: "f-scott-fitzgerald", color: "bg-rose-200" },
  { id: "5", slug: "dune", title: "Dune", author: "Frank Herbert", authorSlug: "frank-herbert", color: "bg-orange-200" },
  { id: "6", slug: "the-lord-of-the-rings", title: "The Lord of the Rings", author: "J.R.R. Tolkien", authorSlug: "j-r-r-tolkien", color: "bg-stone" },
  { id: "7", slug: "animal-farm", title: "Animal Farm", author: "George Orwell", authorSlug: "george-orwell", color: "bg-ash" },
  { id: "8", slug: "the-silmarillion", title: "The Silmarillion", author: "J.R.R. Tolkien", authorSlug: "j-r-r-tolkien", color: "bg-stone" },
];

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
    works: MOCK_BOOKS.filter(b => b.authorSlug === "j-r-r-tolkien")
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
    works: MOCK_BOOKS.filter(b => b.authorSlug === "george-orwell")
  }
];
