import { MOCK_BOOKS } from '@/app/lib/books';
import AuthorClient from '../(components)/AuthorClient'
import Link from 'next/link';

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

const page = async ({ params }: AuthorPageProps) => {

  const { slug } = await params;
  const author = MOCK_BOOKS.find(author => author.authorSlug === slug);

  if (!author) {
    return (
      <div className="flex flex-col gap-2 text-center py-12">
        <h1 className="text-2xl font-semibold text-dark-grey">Author not found.</h1>
        <p className="text-dark-grey/70">
          We couldn't find an author with the slug "{slug}".
        </p>
        <Link href="/dashboard" className="text-brand-green hover:underline font-medium">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <AuthorClient author={author}/>
  )
}

export default page