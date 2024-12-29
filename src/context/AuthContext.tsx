import { useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthState, RegisterData } from '../types/auth.types';
import { authApi } from '../api/auth';
import { AuthContext } from './AuthType';


const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const user = await authApi.checkAuth();
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      } catch (error) {
        console.error(error);
        
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        });
        navigate('/login');
      }
    };

    verifyAuth();
  }, [navigate]);

  const login = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const { user } = await authApi.login(email, password);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      
      setState(prev => ({
        ...prev,
        error: 'Invalid credentials',
        isLoading: false
      }));
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const { user } = await authApi.register(userData);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      
      setState(prev => ({
        ...prev,
        error: 'Registration failed',
        isLoading: false
      }));
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const value = {
    ...state,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

