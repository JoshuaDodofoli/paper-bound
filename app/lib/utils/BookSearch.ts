export async function searchBooks(query: string) {
  try {
    const encodedQuery = encodeURIComponent(query);
    console.log("Fetching for query:", encodedQuery);
    const res = await fetch(`https://openlibrary.org/search.json?q=${encodedQuery}`);
    if (!res.ok) {
        console.error("API error:", res.status, res.statusText);
    }
    const data = await res.json();
    console.log("Found docs:", data.docs?.length);
    return data;
  } catch (error) {
    console.error("Fetch failed:", error);
    return { docs: [] };
  }
}
