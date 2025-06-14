import React from 'react'
import { useAuth } from '../Hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedUserRoutes() {
    const { isAuthenticated, userRole } = useAuth();

    if (!isAuthenticated) return <Navigate to='/login' />;
    if (userRole !== 'User') return <Navigate to='/' />;
    return <Outlet />;
}
