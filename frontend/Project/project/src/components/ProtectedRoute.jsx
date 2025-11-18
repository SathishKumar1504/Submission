import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const userState = useSelector((state) => state.user);

  const isLoggedIn = userState?.isLoggedIn;
  const decodedToken = userState?.decodedToken;

  // ❌ Not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Missing token (rare but safe to check)
  if (!decodedToken) {
    return <Navigate to="/login" replace />;
  }

  // 🎯 Extract user role (most accurate: decodedToken.role)
  const userRole =
    decodedToken.role ||  // correct JWT claim
    decodedToken.userType ||
    decodedToken.UserRole ||
    decodedToken.Role ||
    null;

  // ❌ No role → reject
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  // ❌ User does not have permission
  if (
    Array.isArray(allowedRoles) &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(userRole)
  ) {
    return <Navigate to="/home" replace />;
  }

  // ✅ Authorized
  return children;
};

export default ProtectedRoute;
