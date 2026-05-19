import Wrapper from "@/app/components/Wrapper";
import BackButton from "../../(components)/ui/BackButton";
import BookCard from "../../(components)/book/BookCard";
import { Book } from "@/app/lib/interface";

interface CategoryClientProps {
  slug: string;
  books: Book[];
}

const CategoryClient = ({ slug, books }: CategoryClientProps) => {

  const getCategoryTitle = (categorySlug: string) => {
    switch (categorySlug) {
      case 'reading': return 'Reading';
      case 'trending': return 'Trending';
      case 'new-arrivals': return 'New Arrivals';
      default: return categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).replace(/-/g, ' ');
    }
  };

  return (
    <div className="mt-20">
      <Wrapper>
        <BackButton className="mb-6" />

        <h1 className="text-3xl font-serif font-bold text-dark-grey mb-8">
          {getCategoryTitle(slug)}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.id ?? book.key}
              id={book.id ?? book.key}
              slug={book.slug}
              title={book.title}
              author={book.author}
              coverUrl={book.coverUrl}
              coverColor={book.color}
              aspectRatio="aspect-3/4"
              width="w-full"
            />
          ))}
        </div>
      </Wrapper>
    </div>
  )
}

export default CategoryClient