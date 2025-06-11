import React, { useEffect } from 'react'
import Button from '../../Components/Button/Button'
import { useAuth } from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function BusinessDashboard() {
    const navigation = useNavigate();
    const { onLogout, isAuthenticated } = useAuth();

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
        <div>
            <Button variant='danger' onClick={handleLogout}>Sign Out</Button>
        </div>
    );
}
