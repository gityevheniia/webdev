import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/authApi';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registering user:', { name, email, password }); 
  
    try {
      const result = await register({ name, email, password });
      console.log('Registration success:', result); 
      alert('Реєстрація успішна! Тепер увійдіть.');
      navigate('/login');
    }  catch (error: any) {
      console.error('Registration error:', error); 
      if (error.response) {
        console.error('Error response:', error.response);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Unknown error:', error.message);
      }
      alert('Помилка при реєстрації: ' + (error?.response?.data?.message || error.message || 'Невідома помилка'));
    }
    
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Реєстрація</h1>
      <form onSubmit={handleRegister} className="space-y-4">
      <input
          type="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Зареєструватися
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;