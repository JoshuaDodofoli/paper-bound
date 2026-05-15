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

export async function getBookDetails(workKey: string) {
  try {
    const res = await fetch(`https://openlibrary.org${workKey}.json`);

    if (!res.ok) {
      console.error("Details API error:", res.status);
      return { description: "Description not available.", subjects: [] };
    }

    const data = await res.json();
    let description = "No description available for this title.";

    if (typeof data.description === 'string') {
      description = data.description;
    } else if (data.description?.value) {
      description = data.description.value;
    }


    return {
      description,
      subjects: data.subjects || [],
    };
  } catch (error) {
    console.error("Failed to fetch details:", error);
    return { description: "Error loading description.", subjects: [], firstSentence: null };
  }
}