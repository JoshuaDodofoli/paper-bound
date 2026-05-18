async function test() {
    const query = "the-hobbit".replace(/-/g, ' ');
    const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&fields=key,title,author_name,cover_i,subject`);
    const data = await res.json();
    const book = data.docs[0];
    console.log("Keys:", Object.keys(book));
    console.log("Subject:", book.subject ? book.subject.slice(0, 5) : "undefined");
}
test();
