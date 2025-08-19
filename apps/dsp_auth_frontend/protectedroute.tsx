'''
Higher-order component to protect routes based on authentication.
'''
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;