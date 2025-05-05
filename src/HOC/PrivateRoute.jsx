import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const token = window.localStorage.getItem('token');
  if (loading) {
    return <div>Loading...</div>; // add spinner
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
