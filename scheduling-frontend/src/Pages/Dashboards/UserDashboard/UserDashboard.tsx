import React, { useEffect } from 'react'
import Button from '../../../Components/Button/Button'
import { useAuth } from '../../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import SimpleHeader from '../../../Components/SimpleHeader/SimpleHeader';

export default function UserDashboard() {
    const { isAuthenticated, onLogout, currentUser } = useAuth();
    const navigation = useNavigate();

    useEffect(() => {
        if(!isAuthenticated){
            navigation('/');
        }
    }, [isAuthenticated]);

    const handleLogout = async () => {
        await onLogout();
        console.log("Logout clicked");
    }
    
    return (
        <div className='main-container'>
            <SimpleHeader />
            <Button variant='danger' onClick={handleLogout}>Sign out</Button>
        </div>
    );
}
