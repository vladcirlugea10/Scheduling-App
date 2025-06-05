import React, { useEffect } from 'react'
import AuthForm from '../../../Components/AuthForm/AuthForm';

export default function RegisterBusiness() {
  const fields = [
    { type: 'email', placeholder: 'Business email', required: true },
    { type: 'text', placeholder: 'Business name', required: true },
    { type: 'tel', placeholder: 'Business phone number', required: false },
    { type: 'text', placeholder: 'Business address', required: false },
    { type: 'text', placeholder: 'Business description', required: true, textArea: true },
    { type: 'password', placeholder: 'Password', required: true },
    { type: 'password', placeholder: 'Confirm password', required: true }
  ]
  const targetRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    targetRef.current?.scrollIntoView({ behavior: 'smooth'});
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  }

  return (
    <div className='main-container'>
      <div ref={targetRef} className='auth-container register-container transparent fade-in'>
        <AuthForm title='Welcome! Create your business account to get started!' buttonText='Create Business' onSubmit={() => handleSubmit} fields={fields} />
      </div>
    </div>
  )
}
