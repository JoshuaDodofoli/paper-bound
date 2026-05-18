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

    // Format first subject as a lowercase URL slug (e.g., "young-adult" or "fantasy")
    const tagSlug = subjects[0].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    console.log("Fetching Hardcover recommendations for tag slug:", tagSlug);

    try {
        const GENRE_QUERY = `
            query GetBooksByTag($tagSlug: String!) {
                books(
                    where: { 
                        taggings: { tag: { slug: { _eq: $tagSlug } } }
                        image: { url: { _is_null: false } }
                    }
                    limit: 12
                ) {
                    id
                    title
                    slug
                    image { url }
                    contributions {
                        author {
                            name
                            slug
                        }
                    }
                }
            }
        `;

        const data = await getBooks(GENRE_QUERY, { tagSlug });
        const books: any[] = data?.books ?? [];

        return books
            .map((book: any) => {
                const primaryAuthor = book.contributions?.[0]?.author;
                return {
                    key: book.id?.toString() ?? book.slug ?? "",
                    slug: book.slug ?? "",
                    title: book.title ?? "Unknown Title",
                    author: primaryAuthor?.name ?? "Unknown Author",
                    coverUrl: book.image?.url ?? null,
                };
            })
            .filter((book) => book.slug !== currentKey && book.title !== "Unknown Title")
            .slice(0, 8);
    } catch (error) {
        console.error("Failed to fetch hardcover recommendations:", error);
        return [];
    }
}

export async function getSeriesDetails(seriesSlug: string) {
    if (!seriesSlug) return null;
    console.log("Fetching series details for:", seriesSlug);

    try {
        const QUERY = `
            query GetSeriesDetails($seriesSlug: String!) {
                series(where: { slug: { _eq: $seriesSlug } }, limit: 1) {
                    id
                    name
                    description
                    books_count
                    primary_books_count
                    book_series(order_by: { position: asc }) {
                        position
                        compilation
                        book {
                            id
                            title
                            slug
                            users_count
                            image { url }
                            contributions {
                                author {
                                    name
                                    slug
                                }
                            }
                        }
                    }
                }
            }
        `;

        const data = await getBooks(QUERY, { seriesSlug });
        const seriesData = data?.series?.[0];
        if (!seriesData) return null;

        const rawList: any[] = seriesData.book_series ?? [];

        const primaryMap = new Map();
        const sideBooks: any[] = [];
        const seenSlugs = new Set();

        for (const item of rawList) {
            const b = item.book;
            if (!b || !b.image?.url) continue;

            const pos = item.position;
            const usersCount = b.users_count || 0;

            if (pos !== null && pos !== undefined) {
                const existing = primaryMap.get(pos);
                if (!existing || existing.book.users_count < usersCount) {
                    primaryMap.set(pos, { position: pos, book: b });
                }
            } else {
                sideBooks.push(b);
            }
        }

        // Gather primary books sorted by position
        const primaryBooks = Array.from(primaryMap.entries())
            .sort((a, b) => a[0] - b[0])
            .map(([pos, data]) => {
                seenSlugs.add(data.book.slug);
                const primaryAuthor = data.book.contributions?.[0]?.author;
                return {
                    key: data.book.id?.toString() ?? data.book.slug ?? "",
                    slug: data.book.slug ?? "",
                    title: data.book.title ?? "Unknown Title",
                    author: primaryAuthor?.name ?? "Unknown Author",
                    coverUrl: data.book.image?.url ?? null,
                    position: pos,
                };
            });

        // Gather side books and deduplicate them by slug, ordered by users_count descending
        sideBooks.sort((a, b) => (b.users_count || 0) - (a.users_count || 0));
        const finalSideBooks = [];
        for (const b of sideBooks) {
            if (seenSlugs.has(b.slug)) continue;
            seenSlugs.add(b.slug);
            const primaryAuthor = b.contributions?.[0]?.author;
            finalSideBooks.push({
                key: b.id?.toString() ?? b.slug ?? "",
                slug: b.slug ?? "",
                title: b.title ?? "Unknown Title",
                author: primaryAuthor?.name ?? "Unknown Author",
                coverUrl: b.image?.url ?? null,
                position: null,
            });
        }

        return {
            name: seriesData.name,
            description: seriesData.description,
            booksCount: seriesData.books_count,
            primaryBooksCount: seriesData.primary_books_count,
            books: [...primaryBooks, ...finalSideBooks]
        };
    } catch (error) {
        console.error("Failed to fetch series details:", error);
        return null;
    }
}