import React, { FormEvent, useEffect, useRef, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Hooks/useAuth';
import CustomBarLoader from '../../Components/Spinners/CustomBarLoader';
import { Eye, EyeClosed } from 'lucide-react';
import Button from '../../Components/Button/Button';
import { toast, ToastContainer } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigation = useNavigate()

  const { loading, error, onLogin } = useAuth();

  useEffect(() => {
    if(error){
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
  }, [error]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");

    await onLogin(email, password);
  }

  if (loading){
    return(
      <CustomBarLoader text='Logging you in...' />
    );
  }

  return (
    <div className='main-container'>
      <div className='auth-container transparent fade-in'>
        <form onSubmit={handleSubmit}>
          <div className='title'>
            <h1>Welcome back!</h1>
            <h1 className='wave emoji'>👋</h1>
          </div>
          <div className='input-container'>
            <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input type={passwordVisible ? 'text' : 'password'} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
              <div style={{position: 'absolute', right: 0, marginRight: '0.5rem', cursor: 'pointer'}} onClick={() => setPasswordVisible(!passwordVisible)}>
                { passwordVisible ? (<Eye />) : (<EyeClosed />) }
              </div>
            </div>
            {error && <p className='error-text shake'>{error}</p>}
            <Button type='submit'>Login</Button>
          </div>
          <div className='options-container'>
            <text className='text-for-pressing' onClick={() => navigation("/role-chooser")}>Don't have an account? Register here!</text>
            <text className='text-for-pressing' onClick={() => navigation("/forgot-password")}>Forgot password?</text>
          </div>
        </form>
      </div>
      <ToastContainer position='top-center' />
    </div>
  )
}
