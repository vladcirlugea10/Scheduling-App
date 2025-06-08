import React, { useEffect, useRef } from 'react'
import AuthForm from '../../../Components/AuthForm/AuthForm';
import { useAuth } from '../../../Hooks/useAuth';
import { BusinessRegistration } from '../../../Types/BusinessTypes';
import CustomBarLoader from '../../../Components/Spinners/CustomBarLoader';

export default function RegisterBusiness() {
  const fields = [
    { type: 'email', placeholder: 'Business email', required: true },
    { type: 'text', placeholder: 'Business name', required: true },
    { type: 'tel', placeholder: 'Business phone number', required: true },
    { type: 'text', placeholder: 'Business address', required: true },
    { type: 'text', placeholder: 'Business description', required: true, textArea: true },
    { type: 'password', placeholder: 'Password', required: true },
    { type: 'password', placeholder: 'Confirm password', required: true }
  ];
  const emailRef = useRef<HTMLInputElement>(null);
  const businessNameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const targetRef = React.useRef<HTMLDivElement>(null);

  const { onRegisterBusiness, loading, error } = useAuth();

  useEffect(() => {
    targetRef.current?.scrollIntoView({ behavior: 'smooth'});
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newBusiness: BusinessRegistration = {
      email: emailRef.current?.value || '',
      name: businessNameRef.current?.value || '',
      phone: phoneNumberRef.current?.value || null,
      address: addressRef.current?.value || '',
      description: descriptionRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || ''
    };
    console.log("Data:", newBusiness);
    console.log("Form submitted");
    await onRegisterBusiness(newBusiness);
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
        <AuthForm refs={[emailRef, businessNameRef, phoneNumberRef, addressRef, descriptionRef, passwordRef, confirmPasswordRef]} title='Welcome! Create your business account to get started!' buttonText='Create Business' onSubmit={handleSubmit} fields={fields} />
      </div>
    </div>
  )
}
