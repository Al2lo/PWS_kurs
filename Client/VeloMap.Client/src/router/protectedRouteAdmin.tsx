import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/userHooks';

interface ProtectedRouteProps {
  children: JSX.Element; // Дочерний элемент
}

const protectedRouteAdmin: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = useUser();
  return user != null && user.role == 0 ? children : <Navigate to="/auth" />;
};

export default protectedRouteAdmin;

