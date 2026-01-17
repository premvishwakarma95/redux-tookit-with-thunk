import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ element: Component }) => {
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Component />;
};

export default PublicRoute;
