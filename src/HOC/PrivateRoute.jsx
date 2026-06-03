import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../Components/Loader';

const PrivateRoute = () => {
  const { isAuthenticated, authLoading, authChecked } = useSelector(
    (state) => state.user
  );

  if (authLoading || !authChecked) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;