import React, { useEffect, useState } from 'react';
import { getBooks } from '../api/bookApi';
import BookCard from '../components/BookCard';
import { Book } from '../types/Book';
import './BookListPage.css';

const BookListPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const fetchedBooks = await getBooks(author, genre);
      setBooks(fetchedBooks);
      setError(null);
    } catch (err) {
      setError('Не вдалося завантажити книжки');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBooks();
  };

  return (
    <div className="book-list-container">
      <h1 className="page-title">Список книжок</h1>

      <form onSubmit={handleFilterSubmit} className="filter-form">
        <input
          type="text"
          placeholder="Автор"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="filter-input"
        />
        <input
          type="text"
          placeholder="Жанр"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="filter-input"
        />
        <button type="submit" className="filter-button">
          Застосувати фільтри
        </button>
      </form>

     
      {loading && <div className="status-message">Завантаження...</div>}
      {error && <div className="status-message error">{error}</div>}

      {!loading && !error && (
        <div className="book-grid">
          {books.length > 0 ? (
            books.map((book) => <BookCard key={book.id} book={book} />)
          ) : (
            <div className="no-books">Книжок не знайдено за заданими фільтрами.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookListPage;
