import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/auth/Auth';
import { LoadingSpinner } from './LoadingSpinner';

export const AuthRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};