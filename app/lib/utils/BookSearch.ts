export async function searchBooks(query: string) {
  const encodedQuery = encodeURIComponent(query);
  const res = await fetch(`https://openlibrary.org/search.json?q=${encodedQuery}`);
  const data = await res.json();
  return data;
}
