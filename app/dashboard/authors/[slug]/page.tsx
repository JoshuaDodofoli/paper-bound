import AuthorClient from '../(components)/AuthorClient'
import BackButton from '../../(components)/ui/BackButton';
import { getAuthor } from '@/app/lib/utils/HardCoverSearch';
import { Author } from '@/app/lib/interface';

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

const page = async ({ params }: AuthorPageProps) => {

  const { slug } = await params;

  const raw = await getAuthor(slug);

  const { author: authorData, books } = raw;

  if (!authorData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center py-12 px-6">
        <h1 className="text-3xl font-serif font-bold text-dark-grey">Author not found</h1>
        <p className="text-dark-grey/60 max-w-md">
          We couldn&apos;t find an author with the slug &quot;{slug}&quot;. They might be hiding in a different library.
        </p>
        <BackButton label='Go back'/>
      </div>
    );
  }

  const formatDate = (dateStr: string | null, year: number | null): string => {
    if (!dateStr) return year ? year.toString() : 'Unknown';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const genresSet = new Set<string>();
  books.forEach((book: any) => {
    const bookGenres = book.cached_tags?.Genre;
    if (Array.isArray(bookGenres)) {
      bookGenres.forEach((g: any) => {
        const tag = g.tag ?? g.tagSlug;
        if (tag) genresSet.add(tag);
      });
    }
  });

  const author: Author = {
    id: authorData.id?.toString() ?? slug,
    name: authorData.name ?? 'Unknown Author',
    slug: authorData.slug ?? slug,
    bio: authorData.bio ?? 'No biography available for this author yet.',
    image: authorData.image?.url ?? authorData.cached_image?.url ?? '',
    born: formatDate(authorData.born_date, authorData.born_year),
    website: authorData.links?.[0]?.url ?? '',
    genres: Array.from(genresSet).slice(0, 8),
    topWork: books?.[0]?.title ?? '',
    workCount: authorData.books_count ?? books.length,
    works: books.map((book: any) => ({
      key: book.id.toString(),
      id: book.id.toString(),
      slug: book.slug ?? '',
      title: book.title ?? 'Unknown Title',
      author: authorData.name ?? 'Unknown Author',
      authorSlug: authorData.slug ?? slug,
      coverUrl: book.image?.url ?? null,
    })),
  };

  return (
    <AuthorClient author={author}/>
  )
}

export default page
