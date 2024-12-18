import React, { useState } from 'react';
import '../styles/AuthPage.css';
import { LoginUser, RegisterUser } from '../models/models';
import { AuthService } from '../Services/AuthService';
import { useDispatch } from 'react-redux';
import { updateIsAuth, updateUser } from '../store/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface AuthFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  isLogin: boolean;
}

  const registerUser = async (user: RegisterUser) => {
      await AuthService.registerUser(user)
      .then(()=>{toast.success("Regiter was success")})
      .catch((error) => {toast.error(JSON.parse(error.response.data).Message)})
  };

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    onSubmit({ email, password });
  };

  const onclick = () =>{
    if(!isLogin)
    {
      let user = {
        Email: email,
        Name: name,
        Password: password
      }
      
      registerUser(user);
    }
    else{
      let user = {
        email: email,
        password: password
      }

      loginUser(user)
    }
  }

  const loginUser = async (user: LoginUser) => {
    await AuthService.loginUser(user)
    .then((data)=>{
      dispatch(updateUser(data));
      dispatch(updateIsAuth(true));
      toast.success("Login was success")
      navigate('/');
    })
    .catch ( ()=> toast.error("User not found"))
  };

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2 className='auth-title'>{isLogin ? 'Login' : 'Register'}</h2>
      <div className='auth-inputGroup'>
      {!isLogin && (
        <div className='auth-inputGroup first'>
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='auth-input'
            required
            />
        </div>
      )}
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='auth-input'
          required
        />
      </div>
      <div className='auth-inputGroup'>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='auth-input'
          required
        />
      </div>
      {!isLogin && (
        <div className='auth-inputGroup'>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='auth-input'
            required
          />
        </div>
      )}
      <button type="submit" className='auth-submitButton' onClick={()=>onclick()}>
        {isLogin ? 'Login' : 'Register'}
      </button>
    </form>
  );
};

export default AuthForm;