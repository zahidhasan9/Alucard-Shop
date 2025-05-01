// src/components/PublicRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const { token } = useSelector((state) => state.user);
  console.log('prt', token);
  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
