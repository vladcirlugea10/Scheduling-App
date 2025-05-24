import React from 'react'
import './Home.css'
import Button from '../../Components/Button/Button'

export default function Home() {
  return (
    <div className='main-container'>
        <div className='header'>
            <div className='left-header'>
                <h1>Scheduling App</h1>
            </div>
            <div className='right-header'>
                <Button onClick={() => console.log("About")}>About </Button>
                <Button onClick={() => console.log("Pricing")}>Pricing</Button>
                <Button onClick={() => console.log("Sign up")}>Sign up</Button>
            </div>
        </div>
        <div className='title-container'>
            <h1 className='title'>Scheduling App</h1>
            <p className='subtitle'>An easy to use scheduling application for your business.</p>
        </div>
    </div>
  )
}