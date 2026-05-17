async function testSearchPage() {
  try {
    const res = await fetch("http://localhost:3000/dashboard/search?q=tolkien");
    const html = await res.text();
    console.log("Includes 'Hobbit':", html.includes("Hobbit"));
    console.log("Includes 'Tolkien':", html.includes("Tolkien"));
    console.log("Includes 'Silmarillion':", html.includes("Silmarillion"));
    console.log("Includes 'bg-red-200':", html.includes("bg-red-200"));
    console.log("Includes 'shadow-book':", html.includes("shadow-book"));
  } catch (err) {
    console.error("Fetch search page failed:", err);
  }
}
testSearchPage();
