import React from 'react'
import './Home.css'
import Button from '../../Components/Button/Button'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigation = useNavigate();

    return (
        <div className='main-container'>
            <div className='header transparent fade-in'>
                <div className='left-header'>
                    <h1>Scheduling App</h1>
                </div>
                <div className='right-header'>
                    <Button onClick={() => console.log("About")}>About </Button>
                    <Button onClick={() => console.log("Pricing")}>Pricing</Button>
                    <Button onClick={() => navigation("/login")}>Sign in</Button>
                </div>
            </div>
            <div className='title-container transparent fade-in'>
                <h1 className='title'>Scheduling App</h1>
                <p className='subtitle'>An easy to use scheduling application for your business. Manage appointments and organize your schedule while maximizing efficiency for your business!</p>
                <div className='button-container'>
                    <Button onClick={() => console.log("Learn more")} variant='secondary' >Learn More</Button>
                    <Button onClick={() => navigation("/register-business")} variant='primary'>Get Started</Button>
                </div>
            </div>
        </div>
    )
}