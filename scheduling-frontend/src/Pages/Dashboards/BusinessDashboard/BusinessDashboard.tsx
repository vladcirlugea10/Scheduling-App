import React, { useEffect, useState } from 'react'
import Button from '../../../Components/Button/Button'
import { useAuth } from '../../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import SimpleHeader from '../../../Components/SimpleHeader/SimpleHeader';
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
import { createViewDay, createViewWeek, createViewMonthAgenda, createViewMonthGrid } from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import '@schedule-x/theme-default/dist/index.css';

export default function BusinessDashboard() {
    const navigation = useNavigate();
    const { onLogout, isAuthenticated, currentUser } = useAuth();
    console.log("Current User in Business Dashboard:", currentUser);
    useEffect(() => {
        if(!isAuthenticated || currentUser?.role !== 'Business'){
            navigation('/');
        }
    }, [isAuthenticated]);

    const handleLogout = async () => {
        await onLogout();
        console.log("Logout clicked");
    }

    const businessProfile = currentUser?.role === 'Business' ? currentUser : null;

    const eventsService = useState(() => createEventsServicePlugin())[0];
    const calendar = useCalendarApp({
        views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
        events: [
            {
                id: '1',
                title: 'Test Event',
                start: '2025-06-16',
                end: '2025-06-16',
            },
        ],
        plugins: [eventsService]
    });

    useEffect(() => {
        eventsService.getAll()
    }, []);

    return (
        <div className='main-container'>
            <SimpleHeader />
            <h1>Welcome, {businessProfile?.data.businessName}</h1>
            <ScheduleXCalendar calendarApp={calendar} />
            <Button variant='danger' onClick={handleLogout}>Sign Out</Button>
        </div>
    );
}
