import React from 'react'
import './Home.css'
import Button from '../../Components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Hooks/useAuth';
import AnimatedComponent from '../../Components/AnimatedComponent/AnimatedComponent';

export default function Home() {
    const navigation = useNavigate();
    const { isAuthenticated, currentUser } = useAuth();
    const targetRef = React.useRef<HTMLDivElement>(null);

    const handleLearnMore = () => {
        targetRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className='main-container'>
            <div className='header transparent fade-in'>
                <div className='left-header'>
                    <h1>Scheduling App</h1>
                </div>
                <div className='right-header'>
                    <Button onClick={() => console.log("About")}>About </Button>
                    <Button onClick={() => console.log("Pricing")}>Pricing</Button>
                    <Button onClick={() => currentUser?.role === 'Business' ? navigation(`/business-dashboard/${currentUser.data.userId}`) : currentUser?.role === 'User' ? navigation(`/user-dashboard/${currentUser.data.userId}`) : navigation('/login')}>Sign in</Button>
                </div>
            </div>
            <div className='title-container transparent fade-in'>
                <h1 className='title'>Scheduling App</h1>
                <p className='subtitle'>An easy to use scheduling application for your business. Manage appointments and organize your schedule while maximizing efficiency for your business!</p>
                <div className='button-container'>
                    <Button onClick={handleLearnMore} variant='secondary' >Learn More</Button>
                    <Button onClick={() => currentUser?.role === 'Business' ? navigation(`/business-dashboard/${currentUser.data.userId}`) : currentUser?.role === 'User' ? navigation(`/user-dashboard/${currentUser.data.userId}`) : navigation("/role-chooser")} variant='primary'>Get Started</Button>
                </div>
            </div>
            <div className='features-container'>
                <AnimatedComponent direction='left'>
                    <div ref={targetRef} className='transparent title-container'>
                        <h1>Easier time management</h1>
                        <p>Simplify the process of managing appointments for your business and save time to focus on other aspects of your business!</p>
                    </div>
                </AnimatedComponent>
                <AnimatedComponent direction='right'>
                    <div className='transparent title-container'>
                        <h1>Easier time management</h1>
                        <p>Simplify the process of managing appointments for your business and save time to focus on other aspects of your business!</p>
                    </div>
                </AnimatedComponent>
            </div>
        </div>
    )
}