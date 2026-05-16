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
export async function getRecommendations(subjects: string[], currentKey: string) {
  if (!subjects || subjects.length === 0) return [];

  const subject = subjects[0].toLowerCase().replace(/ /g, '_');
  console.log("Fetching recommendations for subject:", subject);
  const res = await fetch(
    `https://openlibrary.org/subjects/${encodeURIComponent(subject)}.json?limit=12`
  );
  const data = await res.json();
  console.log("Recommendations found:", data.works?.length || 0);

  return data.works
    ?.filter((work: any) => work.key !== `/works/${currentKey}`) 
    .slice(0, 8) 
    .map((work: any) => ({
      key: work.key.replace('/works/', ''),
      slug: work.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: work.title,
      author: work.authors?.[0]?.name ?? 'Unknown Author',
      coverId: work.cover_id ?? null,
    })) ?? [];
}
