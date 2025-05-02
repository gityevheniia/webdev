import React from 'react';
import { Book } from '../types/Book';
import { Link } from 'react-router-dom';
import './BookCard.css';

const BookCard: React.FC<{ book: Book }> = ({ book }) => (
  <div className="book-card">
    <img src={book.file_url} alt={book.title} />
    <h3>{book.title}</h3>
    <p>{book.author}</p>
    <p>{book.description.substring(0, 100)}...</p>
    <Link to={`/books/${book.id}`}>Деталі книги</Link>
  </div>
);

export default BookCard;
