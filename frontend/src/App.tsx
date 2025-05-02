import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/BookDetailPage';
import { useAuth } from './hooks/useAuth';
import Header from './components/Header';
import './index.css';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app-container">
      <Header />
      <main className="main-container">
        <div className="content-wrapper">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/books" /> : <Navigate to="/login" />
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/books"
              element={
                isAuthenticated ? <BookListPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/books/:id"
              element={
                isAuthenticated ? <BookDetailPage /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </div>
      </main>
      <footer className="footer">
        © 2025 Library Platform. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
