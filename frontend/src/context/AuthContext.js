// src/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../config/axiosConfig';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get('/auth-status/');
                setIsAuthenticated(response.data.isAuthenticated);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuthStatus();
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post('/login/', {
                username,
                password,
            });
            if (response.status === 200) {
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const logout = async () => {
        try {
            await axios.post('/logout/');
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
