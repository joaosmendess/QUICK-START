import React from 'react';
import { Navigate } from 'react-router-dom';

interface RouteGuardProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RouteGuard;
