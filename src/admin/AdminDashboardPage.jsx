import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/AdminDashboardPage.scss';

export function AdminDashboardPage() {
    return (
        <div className='AdminDashboard'>
            <div className='backgroundAdmin'><span>Admin Dashboard</span></div>
            <div className='dashboard'>
            <div className='links'>
                <Link to="/admin/add/packages">Manage Tours</Link>
            </div>
            <div className='links'>
                <Link to="/admin/booking">View Bookings</Link>
            </div>
            </div>
        </div>
    );
}
