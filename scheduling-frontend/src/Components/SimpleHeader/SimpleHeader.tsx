import React from 'react'
import './SimpleHeader.css'
import { useNavigate } from 'react-router-dom'


export default function SimpleHeader() {
    const navigation = useNavigate();

    return (
        <div className='header transparent fade-in'>
            <div className='left-header'>
                <h1 onClick={() => navigation('/')}>Scheduling App</h1>
            </div>
        </div>
    );
}
