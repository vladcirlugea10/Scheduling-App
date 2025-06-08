import React, { useEffect, useRef } from 'react'
import './RegisterUser.css';
import AuthForm from '../../../Components/AuthForm/AuthForm';
import { useAuth } from '../../../Hooks/useAuth';
import { UserRegistration } from '../../../Types/UserTypes';
import CustomBarLoader from '../../../Components/Spinners/CustomBarLoader';

export default function RegisterUser() {
  const fields = [
    { type: 'email', placeholder: 'Your email', required: true },
    { type: 'text', placeholder: 'Your first name', required: true },
    { type: 'text', placeholder: 'Your last name', id: 'last-name', label: 'Optional', required: false },
    { type: 'tel', placeholder: 'Your phone number', id: 'phone-number', label: 'Optional', required: false },
    { type: 'password', placeholder: 'Your password', required: true },
    { type: 'password', placeholder: 'Confirm your password', required: true }
  ];
  const emailRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const targetRef = React.useRef<HTMLDivElement>(null);

  const { onRegisterUser, loading, error } = useAuth();

  useEffect(() => {
    targetRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser: UserRegistration = {
      email: emailRef.current?.value || '',
      firstName: firstNameRef.current?.value || '',
      lastName: lastNameRef.current?.value || '',
      phoneNumber: phoneNumberRef.current?.value || null,
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || ''
    };
    console.log("Data:", newUser);
    console.log("Form submitted");

    await onRegisterUser(newUser);
    console.log("Error:", error);
  }

  if (loading){
    return(
      <CustomBarLoader />
    );
  }

  return (
    <div className='main-container'>
      <div ref={targetRef} className='auth-container register-container transparent fade-in'>
        <AuthForm refs={[emailRef, firstNameRef, lastNameRef, phoneNumberRef, passwordRef, confirmPasswordRef]} title="Welcome! Create your user account to get started!" fields={fields} buttonText='Create you account' onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
