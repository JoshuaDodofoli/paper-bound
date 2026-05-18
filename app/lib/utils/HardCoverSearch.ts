export async function getBooks(query: string, variables = {}) {
    const token = process.env.HARDCOVER_API_KEY;

    if (!token) {
        throw new Error("Missing HARDCOVER_API_KEY environment variable in .env.local");
    }

    try {
        const res = await fetch("https://api.hardcover.app/v1/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
            body: JSON.stringify({
                query: query,
                variables: variables,
            }),
            next: { revalidate: 3600 },
        });

        const json = await res.json();

        if (json.errors) {
            console.error("GraphQL Server Errors:", json.errors);
            return null;
        }

        return json.data;
    } catch (error) {
        console.error("Network error hitting Hardcover API:", error);
        return null;
    }
}

export async function getAuthor(slug: string) {
    const AUTHOR_QUERY = `
        query GetAuthorAndBooks($slug: String!) {
            authors(where: { slug: { _eq: $slug } }, limit: 1) {
                id
                name
                slug
                bio
                books_count
                born_date
                born_year
                image { url }
                links
            }
            books(
                where: { contributions: { author: { slug: { _eq: $slug } } } }
                order_by: { users_count: desc }
                limit: 12
            ) {
                id
                title
                slug
                image { url }
                rating
                cached_tags
            }
        }
    `;

    const data = await getBooks(AUTHOR_QUERY, { slug });
    return {
        author: data?.authors?.[0] ?? null,
        books: data?.books ?? []
    };
}

export async function getRecommendations(subjects: string[], currentKey: string) {
    if (!subjects || subjects.length === 0) return [];

    const subject = subjects[0];
    console.log("Fetching Hardcover recommendations for subject:", subject);

    try {
        const SEARCH_QUERY = `
            query SearchBooks($query: String!) {
                search(query: $query) {
                    results
                }
            }
        `;

        const data = await getBooks(SEARCH_QUERY, { query: subject });
        const hits: any[] = data?.search?.results?.hits ?? [];

        return hits
            .map((hit: any) => {
                const doc = hit.document;
                const primaryAuthor = doc.contributions?.[0]?.author;
                return {
                    key: doc.id?.toString() ?? doc.slug ?? "",
                    slug: doc.slug ?? "",
                    title: doc.title ?? "Unknown Title",
                    author: primaryAuthor?.name ?? "Unknown Author",
                    coverUrl: doc.image?.url ?? null,
                };
            })
            .filter((work) => work.slug !== currentKey && work.title !== "Unknown Title")
            .slice(0, 8);
    } catch (error) {
        console.error("Failed to fetch hardcover recommendations:", error);
        return [];
    }
}