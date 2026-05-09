import CategoryClient from "../(Components)/CategoryClient";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <CategoryClient slug={slug} />;
}
