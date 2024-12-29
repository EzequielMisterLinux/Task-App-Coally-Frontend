import axios from 'axios';
import { AuthResponse, RegisterData, User } from '../types/auth.types';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  withCredentials: true, 
});

export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/login', { email, password });
    return data;
  },

  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/register', userData);
    return data;
  },

  logout: async (): Promise<void> => {

    await api.post('/logout');
  },

  checkAuth: async (): Promise<User> => {
    const { data } = await api.get('/profile');
    return data.user;
  }
};