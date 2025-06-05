import React, { useEffect } from 'react'
import './RegisterUser.css';
import AuthForm from '../../../Components/AuthForm/AuthForm';

export default function RegisterUser() {
  const fields = [
    { type: 'email', placeholder: 'Your email', required: true },
    { type: 'text', placeholder: 'Your first name', required: true },
    { type: 'text', placeholder: 'Your last name', id: 'last-name', label: 'Optional', required: false },
    { type: 'tel', placeholder: 'Your phone number', id: 'phone-number', label: 'Optional', required: false },
    { type: 'password', placeholder: 'Your password', required: true },
    { type: 'password', placeholder: 'Confirm your password', required: true }
  ]

  const targetRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    targetRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  }

  return (
    <div className='main-container'>
      <div ref={targetRef} className='auth-container register-container transparent fade-in'>
        <AuthForm title="Welcome! Create your user account to get started!" fields={fields} buttonText='Create you account' onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
