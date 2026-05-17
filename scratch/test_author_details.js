async function test() {
    const key = "OL118077A";
    const res = await fetch(`https://openlibrary.org/authors/${key}.json`);
    const data = await res.json();
    console.log("Author Details Keys:", Object.keys(data));
    console.log("Bio:", data.bio);
    console.log("Links:", data.links);
}
test();
