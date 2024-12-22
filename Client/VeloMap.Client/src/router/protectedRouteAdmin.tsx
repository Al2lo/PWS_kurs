import { useUser } from '../hooks/userHooks';

interface ProtectedRouteProps {
  children: JSX.Element; // Дочерний элемент
}

const protectedRouteAdmin: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = useUser();
  return user != null && user.role == 0 ? children : null;
};

export default protectedRouteAdmin;

