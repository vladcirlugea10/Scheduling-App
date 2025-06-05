import React, { FormEvent } from 'react'
import './Login.css'
import Button from '../../Components/Button/Button'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../../Components/AuthForm/AuthForm';

export default function Login() {
  const fields = [
    { type: 'email', placeholder: 'Your email', required: true },
    { type: 'password', placeholder: 'Your password', required: true }
  ];

  const navigation = useNavigate()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  }

  return (
    <div className='main-container'>
      <div className='auth-container transparent fade-in'>
        <div className='title'>
          <h1>Welcome back!</h1>
          <h1 className='wave emoji'>👋</h1>
        </div>
        <AuthForm title='' buttonText='Log in' onSubmit={handleSubmit} fields={fields} />
        <div className='options-container'>
          <text className='text-for-pressing' onClick={() => navigation("/role-chooser")}>Don't have an account? Register here!</text>
          <text className='text-for-pressing' onClick={() => navigation("/forgot-password")}>Forgot password?</text>
        </div>
      </div>
    </div>
  )
}
