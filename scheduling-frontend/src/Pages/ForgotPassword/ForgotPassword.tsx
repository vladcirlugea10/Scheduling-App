import React, { useRef } from 'react'

export default function ForgotPassword() {
    const fields = [
        { type: 'email', placeholder: 'Email', required: true }
    ];
    const emailRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = emailRef.current?.value || '';
        console.log("Email:", email);
        console.log("Forgot password form submitted");
    }

    return (
        <div className='main-container'>
            <div className='auth-container transparent fade-in'>
            </div>
        </div>
    );
}
