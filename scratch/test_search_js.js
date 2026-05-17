async function test() {
  const query = "tolkien";
  const encodedQuery = encodeURIComponent(query);
  const res = await fetch(`https://openlibrary.org/search.json?q=${encodedQuery}`);
  const data = await res.json();
  console.log("Docs length:", data.docs ? data.docs.length : "none");
}
test();
