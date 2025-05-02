import api from './axios';

export const login = async (email: string, password: string) => {
  const response = await api.post('/users/login', { email, password });
  return response.data;
};

export const register = async (data: { name: string; email: string; password: string }) => {
  const response = await api.post('/users/register', data);
  return response.data;
};

export const getUserInfo = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};
