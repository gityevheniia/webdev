import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../api/bookApi';
import { startReading } from '../api/readingApi';
import { Book } from '../types/Book';
import { useAuth } from '../context/AuthContext';
import './BookDetailPage.css';

const BookDetailPage: React.FC = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBook = async () => {
      if (id) {
        const res = await getBookById(id);
        setBook(res);
      }
    };
    fetchBook();
  }, [id]);

  const handleStartReading = async () => {
    if (!id || !user?.username) {
      alert('Користувач не авторизований або книга не знайдена');
      return;
    }
    try {
      await startReading(id, user.username);
      alert('Читання розпочато!');
    } catch (err) {
      alert('Помилка під час запуску читання');
    }
  };

  if (!book) return <p>Завантаження...</p>;

  return (
    <div className="book-detail-container">
      <div className="book-detail-content">
        <img src={book.file_url} alt={book.title} className="book-cover" />
        <div className="book-info">
          <h1 className="book-title">{book.title}</h1>
          <p className="book-author"><strong>Автор:</strong> {book.author}</p>
          <p className="book-genre"><strong>Жанр:</strong> {book.genre}</p>
          <p className="book-publication_year"><strong>Рік публікації:</strong> {book.publication_year}</p>
          <p className="book-annotation"><strong>Анотація:</strong><br />{book.description}</p>
          <button onClick={handleStartReading} className="start-reading-button">
            Почати читання
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
