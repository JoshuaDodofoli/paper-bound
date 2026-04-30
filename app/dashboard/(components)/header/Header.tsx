'use client'
import React, { useState } from 'react'

const Header = () => {

   const [query, setQuery] = useState("");

  const searchBooks = async () => {
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
    const data = await response.json();
    console.log(data.docs.slice(0, 15));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    searchBooks();
  }
  

  return (
   
    <div className="">
      <form onSubmit={handleSubmit} className="">
        <input
          type="text"
          name="name"
          placeholder="Search books"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="bg-blue-400" type="submit">Submit</button>
      </form>

      <div className="">
       <p>{}</p>
      </div>
    </div>
  )
}

export default Header