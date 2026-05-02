'use client'

import Wrapper from "@/app/components/Wrapper";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();

  // Format title from slug
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="mt-20">
      <Wrapper>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-dark-grey/60 hover:text-dark-grey transition-colors mb-6 group cursor-pointer"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>

        <h1 className="text-3xl font-bold mb-8">{title}</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="aspect-3/4 bg-red-200 rounded-lg shadow-book flex items-center justify-center p-4 text-center text-dark-grey/40"
            >
              Book Placeholder {i + 1}
            </div>
          ))}
        </div>
      </Wrapper>
    </div>
  );
}
