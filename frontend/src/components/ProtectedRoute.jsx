import { useAuth } from '../contexts/authContext';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ redirectPath = '/', children }) {
  const [{ user }] = useAuth();

  if (!user?.admin) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
