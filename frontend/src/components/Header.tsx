// Header.tsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

const Header: React.FC = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div>
        <Link to="/" className="logo">Моя Бібліотека</Link>
      </div>
      <div className="nav">
  <Link to="/books" className="nav-item">Книги</Link>
  {user ? (
    <>
      <span className="nav-item username">{user.username}</span>
      <button onClick={logout} className="nav-item logout-btn">
        Вийти
      </button>
    </>
  ) : (
    <>
      <Link to="/login" className="nav-item">Логін</Link>
      <Link to="/register" className="nav-item">Реєстрація</Link>
    </>
  )}
</div>
    </header>
  );
};

export default Header;
