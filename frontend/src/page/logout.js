import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const logout_excute = async () => {
            try {
                await logout();
                navigate('/');
            } catch (error) {
                console.error('Logout failed', error);
            }
        };
        logout_excute();
    }, []);
}
