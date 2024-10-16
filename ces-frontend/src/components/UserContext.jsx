import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Use jwtDecode without destructuring

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: '',
        accountType: '',
        department: '',
        position: '',
    });

    const updateUser = (userInfo) => {
        setUser(userInfo || {
            name: '',
            accountType: '',
            department: '',
            position: '',
        });
    };

    // Load the user data from the token stored in localStorage on initial load
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser({
                name: decodedToken.name,
                accountType: decodedToken.accountType,
                department: decodedToken.department,
                position: decodedToken.position,
            });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
