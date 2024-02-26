// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async (searchQuery) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`
      );
      setBooks(response.data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      searchBooks(query);
    }
  }, [query]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-semibold mb-8 text-center">Book Search App</h1>
        <SearchBar handleSearch={setQuery} />
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <BookList books={books} />
        )}
      </div>
    </div>
  );
}

export default App;
