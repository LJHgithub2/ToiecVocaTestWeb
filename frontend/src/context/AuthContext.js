// src/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../config/axiosConfig';

// 환경 변수에서 API URL 가져오기
const API_URL = process.env.REACT_APP_API_URL;

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                console.log('인증 상태 확인 중... 현재상태:', isAuthenticated);
                const response = await axios.get('/auth-status/');
                setIsAuthenticated(response.data.isAuthenticated);
                if (response.data.isAuthenticated) {
                    response.data.user.profile_image =
                        API_URL + response.data.user.profile_image;
                    console.log(response.data.user.profile_image);
                    setUser(response.data.user);
                }
            } catch (error) {
                console.log('인증 상태 확인 중 오류 발생:', error);
                setIsAuthenticated(false);
                setUser(null);
            }
        };
        checkAuthStatus();
    }, []);

    useEffect(() => {
        console.log('isAuthenticated 상태가 변경되었습니다:', isAuthenticated);
    }, [isAuthenticated]); // isAuthenticated가 변경될 때마다 이 효과가 실행됩니다.
    useEffect(() => {
        console.log('회원 상태가 변경되었습니다');
        console.log(user);
    }, [user]); // isAuthenticated가 변경될 때마다 이 효과가 실행됩니다.

    const login = async (username, password) => {
        try {
            const response = await axios.post('/login/', {
                username,
                password,
            });
            if (response.status === 200) {
                response.data.user.profile_image =
                    API_URL + response.data.user.profile_image;
                setIsAuthenticated(true);
                setUser(response.data.user);
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const register = async (formData) => {
        try {
            const response = await axios.post('/register/', formData); // 서버의 회원가입 엔드포인트
            if (response.status === 201) {
                // setIsAuthenticated(true);
                console.log(response.data);
            }
        } catch (error) {
            console.error('Registration failed', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            console.log('로그아웃 시작');
            await axios.post('/logout/');
            setIsAuthenticated(false);
            setUser(null);
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                user,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
