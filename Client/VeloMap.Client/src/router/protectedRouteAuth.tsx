import { useIsAuth } from '../hooks/userHooks';
import { Navigate  } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element; // Дочерний элемент
}

const ProtectedRouteAuth: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuth = useIsAuth();
  return isAuth ? children : <Navigate to="/auth" />;
};

export default ProtectedRouteAuth;

