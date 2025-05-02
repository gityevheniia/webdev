import api from './axios';

export const getBooks = async (author?: string, genre?: string) => {
  const params: { author?: string; genre?: string } = {};

  if (author) params.author = author;
  if (genre) params.genre = genre;

  const response = await api.get('/books', {
    params, 
  });

  return response.data; 
};

export const getBookById = async (bookId: string) => {
  const response = await api.get(`/books/${bookId}`);
  return response.data;
};
