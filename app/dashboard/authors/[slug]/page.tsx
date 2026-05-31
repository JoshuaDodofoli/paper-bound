import { getAuthorBySlug } from '@/domain/authors/queries';
import { getBooksByAuthorSlug } from '@/domain/books/queries';
import AuthorClient from '../_components/AuthorClient'
import BackButton from '@/components/primitives/BackButton';

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

const AuthorPage = async ({ params }: AuthorPageProps) => {

  const { slug } = await params;
  
  // Try to find detailed author first
  let author = getAuthorBySlug(slug);

  // If not found, try to find in books and create a minimal author object
  if (!author) {
    const works = getBooksByAuthorSlug(slug);
    const bookAuthor = works[0];

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
        works,
      };
    }
  }

  if (!author) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center py-12 px-6">
        <h1 className="text-3xl font-serif font-bold text-dark-grey">Author not found</h1>
        <p className="text-dark-grey/60 max-w-md">
          We couldn&apos;t find an author with the slug &quot;{slug}&quot;. They might be hiding in a different library.
        </p>
        <BackButton label='Go back to Dashboard' />
      </div>
    );
  }

  return (
    <AuthorClient author={author}/>
  )
}

export default AuthorPage
