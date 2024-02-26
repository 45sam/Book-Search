// src/components/BookList.js
import React, { useState } from 'react';
import './BookList.css';

const BookList = ({ books }) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [userFeedback, setUserFeedback] = useState('');

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setUserRating(book.userRating || 0);
    setUserFeedback(book.userFeedback || '');
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  const handleDownloadBook = (book) => {
    const downloadLink = book.accessInfo?.webReaderLink || book.volumeInfo.previewLink;
    if (downloadLink) {
      window.open(downloadLink, '_blank');
    } else {
      console.error('Download link not available for the selected book.');
    }
  };

  const handleRatingChange = (event) => {
    setUserRating(Number(event.target.value));
  };

  const handleFeedbackChange = (event) => {
    setUserFeedback(event.target.value);
  };

  const handleSubmitRatingAndFeedback = () => {
    // Update the selected book with user rating and feedback
    setSelectedBook((prevBook) => ({
      ...prevBook,
      userRating,
      userFeedback,
    }));
  };

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {books.map((book) => (
        <div
          key={book.id}
          className="border p-4 transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
          onClick={() => handleBookClick(book)}
        >
          <img
            src={book.volumeInfo.imageLinks?.thumbnail || ''}
            alt={book.volumeInfo.title}
            className="mb-4 object-cover h-48 w-full rounded-lg shadow-md"
          />
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-2">{book.volumeInfo.title}</h2>
            <p className="text-gray-700">{book.volumeInfo.authors?.join(', ')}</p>
          </div>
        </div>
      ))}
      {selectedBook && (
        <div className="Modal">
          <div className="ModalContent">
            <h2 className="ModalTitle">{selectedBook.volumeInfo.title}</h2>
            <p className="ModalDescription">{selectedBook.volumeInfo.description || 'No description available.'}</p>
            <div className="flex justify-end">
              <div className="flex items-center mr-4">
                <label className="mr-2">Your Rating:</label>
                <select value={userRating} onChange={handleRatingChange} className="p-2 border border-gray-300">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                placeholder="Your Feedback"
                value={userFeedback}
                onChange={handleFeedbackChange}
                className="p-2 border border-gray-300 mr-4"
              ></textarea>
              <button className="ModalDownloadButton mr-2" onClick={() => handleDownloadBook(selectedBook)}>
                Download
              </button>
              <button className="ModalCloseButton" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
