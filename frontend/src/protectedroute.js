import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    // User not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;