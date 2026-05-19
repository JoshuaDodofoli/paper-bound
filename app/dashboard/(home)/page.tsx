import BookCarousel from "../(components)/book/BookCarousel";
import Wrapper from "@/app/components/Wrapper";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { getTrendingBooks } from "@/app/lib/utils/hardCover/GetTrendingBooks";
import { getReadingBooks } from "@/app/lib/utils/hardCover/GetReadingBooks";
import { getNewArrivals } from "@/app/lib/utils/hardCover/GetNewArrivals";

const Page = async () => {
  const [readingBooks, trendingBooks, arrivalsBooks] = await Promise.all([
    getReadingBooks(),
    getTrendingBooks(),
    getNewArrivals()
  ]);

  return (
    <div className="mt-14 space-y-12">

      <section>
        <Wrapper>
          <Link href="/dashboard/reading" className="flex items-center gap-1 group w-fit mb-4">
            <h2 className="text-xl">Reading</h2>
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform text-dark-grey/90" />
          </Link>

          <BookCarousel books={readingBooks} aspectRatio="aspect-video" width="w-72" />
        </Wrapper>
      </section>

      <section className="section-gradient">
        <Wrapper>
          <Link href="/dashboard/trending" className="flex items-center gap-1 group w-fit mb-4">
            <h2 className="text-xl">Trending</h2>
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform text-dark-grey/90" />
          </Link>

          <BookCarousel books={trendingBooks} />
        </Wrapper>
      </section>

      <section className="section-gradient">
        <Wrapper>
          <h2 className="text-xl">Genre Spotlights</h2>

          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex w-full shadow-lg items-center justify-between bg-stone/40 p-6 rounded-2xl border border-stone">
              <div className="space-y-1">
                <h3 className="text-2xl">Fiction</h3>
                <p className="text-sm text-dark-grey/60 font-medium">1,240 books</p>
              </div>
              <div className="bg-amber-100 w-24 h-32 rounded-sm shadow-book -rotate-6" />
            </div>
            <div className="flex w-full shadow-lg items-center justify-between bg-stone/40 p-6 rounded-2xl border border-stone">
              <div className="space-y-1">
                <h3 className="text-2xl">Non-Fiction</h3>
                <p className="text-sm text-dark-grey/60 font-medium">850 books</p>
              </div>
              <div className="bg-blue-100 w-24 h-32 rounded-sm shadow-book rotate-6" />
            </div>
          </div>
        </Wrapper>
      </section>

      <section className="section-gradient">
        <Wrapper>
          <Link href="/dashboard/new-arrivals" className="flex items-center gap-1 group w-fit mb-4">
            <h2 className="text-xl">New arrivals</h2>
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform text-dark-grey/90" />
          </Link>

          <BookCarousel books={arrivalsBooks} />
        </Wrapper>
      </section>

    </div>
  );
};

export default Page;