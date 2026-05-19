const fs = require('fs');
const path = require('path');

// Read API key from .env.local
const envFile = fs.readFileSync(path.join(__dirname, '../.env.local'), 'utf-8');
const match = envFile.match(/HARDCOVER_API_KEY=['"]?([^'"\n\r]+)['"]?/);
const apiKey = match ? match[1] : null;

if (!apiKey) {
  console.error("No API key found!");
  process.exit(1);
}

const query = `
query GetNewArrivals {
  books(
    where: { 
      image: { url: { _is_null: false } }
      release_year: { _is_null: false }
    }
    order_by: { release_year: desc }
    limit: 15
  ) {
    id
    title
    slug
    image { url }
  }   
}
`;

async function run() {
  try {
    const res = await fetch("https://api.hardcover.app/v1/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": apiKey
      },
      body: JSON.stringify({ query })
    });
    const json = await res.json();
    console.log(JSON.stringify(json, null, 2));
  } catch (err) {
    console.error(err);
  }
}
run();
