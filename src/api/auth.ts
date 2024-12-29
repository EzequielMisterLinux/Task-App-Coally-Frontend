import { AuthResponse, RegisterData, User } from '../types/auth.types';
import { api } from './AxiosRouter';



export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/login', { email, password });
    return data;
  },

  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const formData = new FormData();
    
    Object.entries(userData).forEach(([key, value]) => {
      if (key === 'profileImage' && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });

    const { data } = await api.post<AuthResponse>('/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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