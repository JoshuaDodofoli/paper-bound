import AuthorClient from '../(components)/AuthorClient'
import BackButton from '../../(components)/ui/BackButton';
import { getAuthorDetailsBySlug } from '@/app/lib/utils/BookSearch';

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

const page = async ({ params }: AuthorPageProps) => {

  const { slug } = await params;
  
  // Fetch dynamically from Open Library API (No mock data fallback)
  const author = await getAuthorDetailsBySlug(slug);

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
