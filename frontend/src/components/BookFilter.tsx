import React, { useState } from 'react';
import './BookFilter.css'; // новий CSS

interface BookFilterProps {
  onFilterChange: (author?: string, genre?: string) => void;
}

const BookFilter: React.FC<BookFilterProps> = ({ onFilterChange }) => {
  const [author, setAuthor] = useState<string>('');
  const [genre, setGenre] = useState<string>('');

  const handleFilterChange = () => {
    onFilterChange(author, genre);
  };

  return (
    
    <div className="filter-container">
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Автор"
        className="filter-input"
      />
      <input
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="Жанр"
        className="filter-input"
      />
      <button onClick={handleFilterChange} className="filter-button">
        Застосувати фільтри
      </button>
    </div>
  );
};

export default BookFilter;
