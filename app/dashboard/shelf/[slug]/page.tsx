import Wrapper from '@/app/components/Wrapper';

interface slugProps {
    params: Promise<{
        slug: string;
    }>
}

const page = async ({ params } : slugProps) => {

    const { slug } = await params;

  return (
    <div className='mt-12'>
        <Wrapper>
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