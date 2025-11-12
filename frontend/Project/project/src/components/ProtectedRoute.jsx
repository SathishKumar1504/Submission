import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isLoggedIn, decodedToken } = useSelector((state) => state.user);

  // 🚫 Not logged in → redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // 🧩 No token decoded yet → redirect to login
  if (!decodedToken) {
    return <Navigate to="/login" replace />;
  }

  // 🧠 Get role from decoded token
  const role = decodedToken.userType || decodedToken.role;

  // 🚫 Role not allowed → redirect to home
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/home" replace />;
  }

  // ✅ Access granted
  return children;
};

export default ProtectedRoute;
