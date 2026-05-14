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

export async function getBookDescription(workKey: string) {
  try {
    // workKey is usually "/works/OL12345W"
    const res = await fetch(`https://openlibrary.org${workKey}.json`);

    if (!res.ok) {
      console.error("Description API error:", res.status);
      return "Description not available.";
    }

    const data = await res.json();

    // Open Library descriptions can be a string or an object { value: string }
    if (typeof data.description === 'string') {
      return data.description;
    } else if (data.description?.value) {
      return data.description.value;
    }

    return "No description available for this title.";
  } catch (error) {
    console.error("Failed to fetch description:", error);
    return "Error loading description.";
  }
}