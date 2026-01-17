import React from 'react';
import { Navigate } from 'react-router-dom'; // Use Navigate for redirection
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isLoggedIn } = useSelector(state => state.auth);

  // Return the component if logged in, otherwise redirect to login
  return isLoggedIn ? <Element {...rest} /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
