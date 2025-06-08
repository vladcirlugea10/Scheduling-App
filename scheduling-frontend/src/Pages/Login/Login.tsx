import React, { FormEvent, useEffect, useRef } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../../Components/AuthForm/AuthForm';
import { useAuth } from '../../Hooks/useAuth';
import CustomBarLoader from '../../Components/Spinners/CustomBarLoader';

export default function Login() {
  const fields = [
    { type: 'email', placeholder: 'Your email', required: true },
    { type: 'password', placeholder: 'Your password', required: true }
  ];
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigation = useNavigate()

  const { loading, error, onLogin } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Form submitted");

    await onLogin(email, password);
    console.log("In login", error);
  }

  if (loading){
    return(
      <CustomBarLoader />
    );
  }

  return (
    <div className='main-container'>
      <div className='auth-container transparent fade-in'>
        <div className='title'>
          <h1>Welcome back!</h1>
          <h1 className='wave emoji'>👋</h1>
        </div>
        <AuthForm refs={[emailRef, passwordRef]} title='' buttonText='Log in' onSubmit={handleSubmit} fields={fields} />
        <div className='options-container'>
          <text className='text-for-pressing' onClick={() => navigation("/role-chooser")}>Don't have an account? Register here!</text>
          <text className='text-for-pressing' onClick={() => navigation("/forgot-password")}>Forgot password?</text>
        </div>
      </div>
    </div>
  )
}
