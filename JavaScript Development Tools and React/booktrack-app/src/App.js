import React, { useState, useEffect } from 'react';
import { initialBooks } from './data/initialBooks'; // Import static data
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import AddBookForm from './components/AddBookForm';
import BookList from './components/BookList';

function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Only fetch from json-server in development
      fetch('http://localhost:3001/books')
        .then(response => response.json())
        .then(data => setBooks(data))
        .catch(error => console.error("Error fetching data:", error));
    } else {
      // Use static data for production builds
      setBooks(initialBooks);
    }
  }, []);

  const handleAddBook = (newBookData) => {
    if (process.env.NODE_ENV === 'development') {
      fetch('http://localhost:3001/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBookData),
      })
      .then(response => response.json())
      .then(addedBook => {
        setBooks(prevBooks => [...prevBooks, addedBook]);
      })
      .catch(error => console.error("Error adding book:", error));
    } else {
      console.log("Add book in production mode (static data):", newBookData);
      // For static data, we can simulate adding to the local state only
      // This won't persist beyond a page refresh on the deployed app
      setBooks(prevBooks => [...prevBooks, { ...newBookData, id: Date.now().toString() }]);
    }
  };

  const handleStatusUpdate = (bookId, newStatus) => {
    if (process.env.NODE_ENV === 'development') {
      fetch(`http://localhost:3001/books/${bookId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })
      .then(response => response.json())
      .then(updatedBook => {
        setBooks(prevBooks =>
          prevBooks.map(book => (book.id === bookId ? updatedBook : book))
        );
      })
      .catch(error => console.error("Error updating status:", error));
    } else {
      console.log("Update status in production mode (static data):", bookId, newStatus);
      // For static data, simulate update to local state only
      setBooks(prevBooks =>
        prevBooks.map(book =>
          book.id === bookId ? { ...book, status: newStatus } : book
        )
      );
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <Header onAddNewBookClick={() => setIsFormVisible(true)} />
      <main>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        {isFormVisible && (
          <AddBookForm
            onAddBook={handleAddBook}
            onCloseForm={() => setIsFormVisible(false)}
          />
        )}
        <BookList books={filteredBooks} onStatusUpdate={handleStatusUpdate} />
      </main>
    </div>
  );
}

export default App;