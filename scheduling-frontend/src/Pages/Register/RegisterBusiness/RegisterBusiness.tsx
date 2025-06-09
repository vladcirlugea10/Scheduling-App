import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../Hooks/useAuth';
import { BusinessRegistration } from '../../../Types/BusinessTypes';
import CustomBarLoader from '../../../Components/Spinners/CustomBarLoader';
import { Eye, EyeClosed } from 'lucide-react';
import Button from '../../../Components/Button/Button';

export default function RegisterBusiness() {
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const targetRef = React.useRef<HTMLDivElement>(null);

  const { onRegisterBusiness, loading, error } = useAuth();

  useEffect(() => {
    targetRef.current?.scrollIntoView({ behavior: 'smooth'});
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newBusiness: BusinessRegistration = {
      email: email,
      name: businessName,
      phone: phoneNumber,
      address: address,
      description: description,
      password: password,
      confirmPassword: confirmPassword
    };
    console.log("Data:", newBusiness);
    console.log("Form submitted");
    await onRegisterBusiness(newBusiness);
    console.log("Error:", error);
  }

  if (loading){
    return(
      <CustomBarLoader text='Creating your business account...' />
    );
  }

  return (
    <div className='main-container'>
      <div ref={targetRef} className='auth-container register-container transparent fade-in'>
        <form onSubmit={handleSubmit}>
          <h2 className="auth-form-title">Welcome! Create your business account to get started!</h2>
            <div className="input-container">
              <input type='email' placeholder='Business email' value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type='text' placeholder='Business name' value={businessName} onChange={(e) => setBusinessName(e.target.value)} required />
              <input type='tel' placeholder='Business phone number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
              <input type='text' placeholder='Business address' value={address} onChange={(e) => setAddress(e.target.value)} required />
              <textarea placeholder='Business description' value={description} onChange={(e) => setDescription(e.target.value)} required />
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input type={passwordVisible ? 'text' : 'password'} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                <div style={{position: 'absolute', right: 0, marginRight: '0.5rem', cursor: 'pointer'}} onClick={() => setPasswordVisible(!passwordVisible)}>
                  { passwordVisible ? (<Eye />) : (<EyeClosed />) }
                </div>
              </div>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input type={confirmPasswordVisible ? 'text' : 'password'} placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <div style={{position: 'absolute', right: 0, marginRight: '0.5rem', cursor: 'pointer'}} onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                  { confirmPasswordVisible ? (<Eye />) : (<EyeClosed />) }
                </div>
              </div>
              {error && <p className='error-text shake'>{error}</p>}
              <Button type='submit'>Create your account</Button>
            </div>
        </form>
      </div>
    </div>
  )
}
