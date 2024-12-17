import { useState } from "react";
import '../styles/AuthPage.css';
import AuthForm from "../components/AuthForm";

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
  
    const handleAuthSubmit = (data: { email: string; password: string }) => {
      console.log(isLogin ? 'Logging in with' : 'Registering with', data);
    };
  
    return (
      <div className='auth-container'>
        <div className='authBox'>
          <AuthForm onSubmit={handleAuthSubmit} isLogin={isLogin} />
          <button
            className='auth-toggleButton'
            onClick={() => {setIsLogin(!isLogin)}}
          >
            {isLogin ? 'Switch to Register' : 'Switch to Login'}
          </button>
        </div>
      </div>
    );
  };
  
  export default AuthPage;