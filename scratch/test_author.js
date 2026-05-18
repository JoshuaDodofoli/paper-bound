async function test() {
    const slug = "george-orwell";
    const query = slug.replace(/-/g, ' ');
    const res = await fetch(`https://openlibrary.org/search/authors.json?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    console.log("Author docs:", data.docs ? data.docs.slice(0, 2) : "none");
}
test();
