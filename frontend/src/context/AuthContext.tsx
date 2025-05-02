import React, { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import { login as loginApi } from '../api/authApi';

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  user: { username: string; id: string } | null; 
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  logout: () => {},
  isAuthenticated: false,
  login: async () => false,
  user: null, 
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });

  const [user, setUser] = useState<{ username: string; id: string } | null>(null); 

  useEffect(() => {
    if (token) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Встановлюємо користувача зі сховища
      }
    }
  }, [token]);

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
    setTokenState(newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null); 
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await loginApi(email, password);
      if (data.token) {
        setToken(data.token);
      
        const user = { 
          username: email.split('@')[0], 
          id: email 
        };
        
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        return true;
      }
      return false;
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    }
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, setToken, logout, isAuthenticated, login, user }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);