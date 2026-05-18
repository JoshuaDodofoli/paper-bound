async function test() {
    const key = "OL118077A";
    const res = await fetch(`https://openlibrary.org/authors/${key}/works.json?limit=10`);
    const data = await res.json();
    data.entries.forEach(work => {
        console.log(`Title: ${work.title}, Cover: ${work.covers ? work.covers[0] : 'none'}`);
    });
}
test();
