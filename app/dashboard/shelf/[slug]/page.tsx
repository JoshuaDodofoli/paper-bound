import Wrapper from '@/app/components/Wrapper';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

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
                <div>
                    <h2>{slug}</h2>
                    <p>Books in this collection</p>
                    <div></div>
                </div>
            </Wrapper>
        </div>
    )
}

export default page