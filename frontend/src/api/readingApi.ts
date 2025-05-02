import api from './axios';

export const startReading = async (bookId: string, userId: string) => {
  console.log("Sending start reading request with bookId:", bookId, "and userId:", userId); // Логування параметрів запиту
  const response = await api.post('/reading-progress', {
    book_id: bookId,
    user_id: userId,
    current_page: 0,
    percentage_read: 0,
  });
  console.log("Response from start reading:", response.data); // Логування відповіді
  return response.data;
};


export const getReadingProgress = async (userId: string) => {
  const response = await api.get(`/reading-progress/${userId}`);
  return response.data;
};
