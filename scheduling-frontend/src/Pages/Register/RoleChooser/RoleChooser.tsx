import React from 'react'
import './RoleChooser.css'
import Button from '../../../Components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { StoreIcon, User } from "lucide-react";
import SimpleHeader from '../../../Components/SimpleHeader/SimpleHeader';

export default function RoleChooser() {
    const navigation = useNavigate();
    return (
        <div className='main-container'>
            <SimpleHeader />
            <div className='role-chooser-container'>
                <h1>You are registering as</h1>
                <div className='roles-container'>
                    <div className='role-container slide-from-down transparent'>
                        <div className='role-header'>
                            <h1>Business</h1>
                            <StoreIcon size={50} />
                        </div>
                        <p>Register your business and create a business page to manage appointments and organize your schedule while maximizing efficiency for your business!</p>
                        <Button onClick={() => navigation("/register-business")}>Register as Business</Button>
                    </div>
                    <div className='role-container slide-from-down transparent'>
                        <div className='role-header'>
                            <h1>User</h1>
                            <User size={50} />
                        </div>
                        <p>Register as a normal user to search and book appointments for your favourite services and manage your personal schedule!</p>
                        <Button onClick={() => navigation("/register-user")}>Register as User</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
