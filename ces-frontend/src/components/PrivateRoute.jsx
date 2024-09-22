import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ allowedRoles }) => {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
        return <Navigate to="/unauthorized" />;
    }

    try {
        const decodedToken = jwtDecode(accessToken);
        const accountType = decodedToken.accountType;

        if (!allowedRoles.includes(accountType)) {
            return <Navigate to="/unauthorized" />;
        }
    } catch (error) {
        console.error("Error decoding token:", error);
        return <Navigate to="/unauthorized" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
