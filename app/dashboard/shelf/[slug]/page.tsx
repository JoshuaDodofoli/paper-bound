import Wrapper from '@/app/components/Wrapper';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import BookCard from '../../(components)/book/BookCard';

const MOCK_BOOKS = [
    {
        id: "1",
        slug: "the-midnight-library",
        title: "The Midnight Library",
        author: "Matt Haig",
        color: "bg-indigo-200",
        rating: 4.2,
        status: "Want to Read"
    },
    {
        id: "2",
        slug: "project-hail-mary",
        title: "Project Hail Mary",
        author: "Andy Weir",
        color: "bg-orange-200",
        rating: 4.8,
        status: "Read"
    },
    {
        id: "3",
        slug: "the-song-of-achilles",
        title: "The Song of Achilles",
        author: "Madeline Miller",
        color: "bg-red-200",
        rating: 4.7,
        status: "Read"
    },
    {
        id: "4",
        slug: "where-the-crawdads-sing",
        title: "Where the Crawdads Sing",
        author: "Delia Owens",
        color: "bg-yellow-200",
        rating: 4.5,
        status: "Want to Read"
    },
    {
        id: "5",
        slug: "the-seven-husbands-of-evelyn-hugo",
        title: "The Seven Husbands of Evelyn Hugo",
        author: "Taylor Jenkins Reid",
        color: "bg-purple-200",
        rating: 4.6,
        status: "Currently Reading"
    },
    {
        id: "6",
        slug: "atomic-habits",
        title: "Atomic Habits",
        author: "James Clear",
        color: "bg-blue-200",
        rating: 4.9,
        status: "Read"
    },
    {
        id: "7",
        slug: "the-invisible-life-of-addie-larue",
        title: "The Invisible Life of Addie LaRue",
        author: "V. E. Schwab",
        color: "bg-pink-200",
        rating: 4.4,
        status: "Want to Read"
    },
    {
        id: "8",
        slug: "circe",
        title: "Circe",
        author: "Madeline Miller",
        color: "bg-green-200",
        rating: 4.6,
        status: "Read"
    },
];

interface slugProps {
    params: Promise<{
        slug: string;
    }>
}

const page = async ({ params }: slugProps) => {

    const { slug } = await params;

    return (
        <div className='mt-12'>
            <Wrapper>
                <Link href={"/dashboard/shelf"}
                    className="flex items-center gap-2 text-dark-grey/60 hover:text-dark-grey transition-colors mb-6 group cursor-pointer"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back</span>
                </Link>
                <div className='flex flex-col gap-8'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-2xl font-bold'>{slug}</h2>
                        <p className='text-sm text-dark-grey/60'>{1000} books</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {MOCK_BOOKS.map((book) => (
                            <BookCard
                                key={book.id}
                                id={book.id}
                                slug={book.slug}
                                title={book.title}
                                author={book.author}
                                coverColor={book.color}
                                aspectRatio="aspect-3/4"
                            />
                        ))}
                    </div>
                </div>
            </Wrapper>
        </div>
    )
}

export default page