import { useIsAuth } from '../hooks/userHooks';

interface ProtectedRouteProps {
  children: JSX.Element; // Дочерний элемент
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuth = useIsAuth();
  return isAuth ? children : null;
};

export default ProtectedRoute;

