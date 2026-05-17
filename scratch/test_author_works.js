async function test() {
    const key = "OL118077A";
    const res = await fetch(`https://openlibrary.org/authors/${key}/works.json?limit=10`);
    const data = await res.json();
    console.log("Works found:", data.entries.length);
    console.log("First work keys:", Object.keys(data.entries[0]));
    console.log("First work title:", data.entries[0].title);
}
test();
