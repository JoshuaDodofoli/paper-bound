const { searchBooks } = require('../app/lib/utils/BookSearch.ts');

async function testSearch() {
  try {
    const data = await searchBooks("tolkien");
    console.log("Docs count:", data.docs ? data.docs.length : "none");
    if (data.docs && data.docs.length > 0) {
      console.log("First doc key:", data.docs[0].key);
      console.log("First doc title:", data.docs[0].title);
      console.log("First doc author:", data.docs[0].author_name);
      console.log("First doc cover:", data.docs[0].cover_i);
    }
  } catch (err) {
    console.error("Error in testSearch:", err);
  }
}
testSearch();
