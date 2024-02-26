// src/components/SearchBar.js
import React from 'react';

const SearchBar = ({ handleSearch }) => {
  return (
    <div className="mb-8 flex justify-center items-center">
      <input
        type="text"
        className="p-3 border border-gray-300 w-full max-w-md rounded-l"
        placeholder="Search for books..."
        onChange={(e) => handleSearch(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-3 rounded-r">Search</button>
    </div>
  );
};

export default SearchBar;
