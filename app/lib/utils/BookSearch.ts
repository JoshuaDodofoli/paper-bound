import { Book } from "../interface";

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

export async function searchAuthors(query: string) {
  try {
    const encodedQuery = encodeURIComponent(query);
    const res = await fetch(`https://openlibrary.org/search/authors.json?q=${encodedQuery}`);

    if (!res.ok) {
      console.error("Author search API error:", res.status);
      return { docs: [] };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Author fetch failed:", error);
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

export async function getAuthorDetailsBySlug(slug: string) {
  try {
    const query = slug.replace(/-/g, ' ');
    // 1. Search for author to get their key
    const searchRes = await fetch(`https://openlibrary.org/search/authors.json?q=${encodeURIComponent(query)}`);
    if (!searchRes.ok) return null;
    const searchData = await searchRes.json();
    
    if (!searchData.docs || searchData.docs.length === 0) return null;
    
    const bestDoc = searchData.docs[0];
    const authorKey = bestDoc.key;
    
    const [detailsRes, worksRes] = await Promise.all([
      fetch(`https://openlibrary.org/authors/${authorKey}.json`),
      fetch(`https://openlibrary.org/authors/${authorKey}/works.json?limit=12`)
    ]);
    
    if (!detailsRes.ok) return null;
    const details = await detailsRes.json();
    
    let works = [];
    if (worksRes.ok) {
      const worksData = await worksRes.json();
      works = worksData.entries?.map((work: any) => {
        const coverId = work.covers && work.covers.length > 0 ? String(work.covers[0]) : '';
        const workKey = work.key.replace('/works/', '');
        return {
          key: work.key,
          id: workKey,
          slug: work.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          title: work.title,
          author: details.name,
          authorSlug: slug,
          coverId: coverId,
          color: getRandomColor(),
        };
      }) || [];
    }
    
    let bio = "No biography available for this author yet.";
    if (typeof details.bio === 'string') {
      bio = details.bio;
    } else if (details.bio?.value) {
      bio = details.bio.value;
    }
    
    let imageUrl = "";
    if (details.photos && details.photos.length > 0) {
      const validPhotoId = details.photos.find((id: number) => id > 0);
      if (validPhotoId) {
        imageUrl = `https://covers.openlibrary.org/a/id/${validPhotoId}-L.jpg`;
      }
    }

    return {
      id: authorKey,
      name: details.name,
      slug: slug,
      bio: bio,
      image: imageUrl,
      born: details.birth_date || bestDoc.birth_date || "Unknown",
      website: details.links?.[0]?.url || "",
      genres: bestDoc.top_subjects?.slice(0, 5) || [],
      works: works,
      topWork: bestDoc.top_work || "",
      workCount: bestDoc.work_count || 0,
      ratingsAverage: bestDoc.ratings_average ? Number(bestDoc.ratings_average.toFixed(1)) : undefined,
      ratingsCount: bestDoc.ratings_count || undefined
    };
  } catch (error) {
    console.error("Error fetching author details:", error);
    return null;
  }
}

export async function getBooksBySubject(subject: string, limit: number = 8): Promise<Book[]> {
  try {
    const formattedSubject = subject.toLowerCase().replace(/ /g, '_');
    console.log("Fetching books for subject:", formattedSubject);
    const res = await fetch(
      `https://openlibrary.org/subjects/${encodeURIComponent(formattedSubject)}.json?limit=${limit}`
    );
    if (!res.ok) {
      console.error("Subject API error:", res.status);
      return [];
    }
    const data = await res.json();
    return data.works?.map((work: any) => {
      const generatedSlug = work.title
        ? work.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        : 'unknown';
      const authorName = work.authors?.[0]?.name ?? 'Unknown Author';
      const authorSlug = work.authors?.[0]?.name
        ? work.authors[0].name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        : 'unknown';

      return {
        key: work.key,
        id: work.key.replace('/works/', ''),
        slug: generatedSlug,
        title: work.title,
        author: authorName,
        authorSlug: authorSlug,
        coverId: work.cover_id ? String(work.cover_id) : (work.cover_i ? String(work.cover_i) : ''),
        color: getRandomColor(),
      };
    }) ?? [];
  } catch (error) {
    console.error("Error fetching subject books:", error);
    return [];
  }
}

function getRandomColor() {
  const colors = ['bg-stone', 'bg-ash', 'bg-paper', 'bg-red-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-purple-200', 'bg-orange-200', 'bg-pink-200'];
  return colors[Math.floor(Math.random() * colors.length)];
}
