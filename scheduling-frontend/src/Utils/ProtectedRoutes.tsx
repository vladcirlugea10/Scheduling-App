import React from 'react'
import { useAuth } from '../Hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoutes() {
    const { isAuthenticated, userRole } = useAuth();
    
    if (!isAuthenticated) return <Navigate to="/login" />;
    if (userRole !== 'Business') return <Navigate to="/" />;
    return <Outlet />
}
