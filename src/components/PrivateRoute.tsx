import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/auth/Auth';
import { LoadingSpinner } from './LoadingSpinner';

export const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};