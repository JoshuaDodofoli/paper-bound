import { MOCK_BOOKS, MOCK_AUTHORS } from '@/app/lib/books';
import AuthorClient from '../(components)/AuthorClient'
import BackButton from '../../(components)/ui/BackButton';
import { Author } from '@/app/lib/interface';

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

const page = async ({ params }: AuthorPageProps) => {

  const { slug } = await params;
  
  // Try to find detailed author first
  let author = MOCK_AUTHORS.find(a => a.slug === slug);

  // If not found, try to find in books and create a minimal author object
  if (!author) {
    const bookAuthor = MOCK_BOOKS.find(b => b.authorSlug === slug);
    if (bookAuthor) {
      author = {
        id: `temp-${slug}`,
        name: bookAuthor.author,
        slug: bookAuthor.authorSlug,
        bio: "No biography available for this author yet.",
        image: "",
        born: "Unknown",
        website: "",
        genres: [],
        works: MOCK_BOOKS.filter(b => b.authorSlug === slug)
      };
    }
  }

  if (!author) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center py-12 px-6">
        <h1 className="text-3xl font-serif font-bold text-dark-grey">Author not found</h1>
        <p className="text-dark-grey/60 max-w-md">
          We couldn't find an author with the slug "{slug}". They might be hiding in a different library.
        </p>
        <BackButton label='Go back'/>
      </div>
    );
  }

  return (
    <AuthorClient author={author}/>
  )
}

export default page
