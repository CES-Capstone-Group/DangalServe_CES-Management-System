import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// A private route component to protect routes based on roles
const PrivateRoute = ({ allowedRoles }) => {
const accessToken = localStorage.getItem('access_token');
const accountType = localStorage.getItem('accountType'); // Assume accountType is stored on login

// Check if the user is logged in and has the correct role
if (!accessToken) {
// If no access token, redirect to login
    return <Navigate to="/unauthorized" />;
}

if (!allowedRoles.includes(accountType)) {
// If the account type doesn't match allowed roles, redirect to unauthorized page or login
    return <Navigate to="/unauthorized" />;
}

// If the user is authenticated and has the correct role, allow access
    return <Outlet />;
};

export default PrivateRoute;