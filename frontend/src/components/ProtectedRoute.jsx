import { useAuth } from '../contexts/authContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function ProtectedRoute({ redirectPath = '/', authLevel, children }) {
  const [{ user }] = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  if (authLevel === 'admin' && !user.admin) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
