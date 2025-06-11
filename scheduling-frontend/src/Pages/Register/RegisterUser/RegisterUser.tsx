import React, { useEffect, useState } from 'react'
import './RegisterUser.css';
import { useAuth } from '../../../Hooks/useAuth';
import { UserRegistration } from '../../../Types/UserTypes';
import CustomBarLoader from '../../../Components/Spinners/CustomBarLoader';
import { Eye, EyeClosed } from 'lucide-react';
import Button from '../../../Components/Button/Button';
import SimpleHeader from '../../../Components/SimpleHeader/SimpleHeader';

export default function RegisterUser() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const targetRef = React.useRef<HTMLDivElement>(null);

  const { onRegisterUser, loading, error } = useAuth();

  useEffect(() => {
    targetRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser: UserRegistration = {
      email: email,
      firstName: firstName,
      lastName: lastName || '',
      phoneNumber: phoneNumber || null,
      password: password,
      confirmPassword: confirmPassword
    };
    console.log("Form submitted");

    await onRegisterUser(newUser);
    console.log("Error:", error);
  }

  if (loading){
    return(
      <CustomBarLoader text='Creating your account...' />
    );
  }

  return (
    <div className='main-container'>
      <SimpleHeader />
      <div ref={targetRef} className='auth-container register-container transparent fade-in'>
        <form onSubmit={handleSubmit}>
          <h2 className="auth-form-title">Welcome! Create your user account to get started!</h2>
          <div className='input-container'>
            <input type='email' placeholder='Your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type='text' placeholder='Your First name' value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <label>Optional field</label>
              <input type='text' placeholder='Your Last name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <label>Optional field</label>
              <input type='tel' placeholder='Your Phone number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input type={passwordVisible ? 'text' : 'password'} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
              <div style={{ position: 'absolute', right: 0, marginRight: '0.5rem', cursor: 'pointer' }} onClick={() => setPasswordVisible(!passwordVisible)}>
                { passwordVisible ? (<Eye />) : (<EyeClosed />) }
              </div>
            </div>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input type={confirmPasswordVisible ? 'text' : 'password'} placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              <div style={{ position: 'absolute', right: 0, marginRight: '0.5rem', cursor: 'pointer' }} onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
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
