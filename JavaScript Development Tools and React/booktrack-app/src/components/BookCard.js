import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';
function BookCard({ book }) {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Year: {book.year}</p>
      <p>Genre: {book.genre}</p>
      <div className="book-card-status">
        Status: <span>{book.status}</span>
      </div>
      <ProgressBar progress={book.progress} totalPages={book.totalPages} />
    </div>
  );
}
BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    year: PropTypes.number,
    genre: PropTypes.string,
    status: PropTypes.string.isRequired,
    progress: PropTypes.number,
    totalPages: PropTypes.number,
  }).isRequired,
};
export default BookCard;
