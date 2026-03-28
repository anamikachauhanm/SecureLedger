import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading, token, user } = useAuth();

  console.log('🔒 ProtectedRoute check:', { isAuthenticated, loading, token: !!token, user: !!user });

  if (loading) {
    console.log('⏳ ProtectedRoute: still loading...');
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('❌ ProtectedRoute: not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  console.log('✅ ProtectedRoute: authenticated, rendering children');
  return <>{children}</>;
};

export default ProtectedRoute;
