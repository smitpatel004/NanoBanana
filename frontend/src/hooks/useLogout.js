import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3003';

export const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { logout } = useAuth();

    const logoutUser = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Logout failed');
            }

            // Clear client-side state
            logout();

            return { success: true, data };
        } catch (err) {
            setError(err.message);
            // Even if API call fails, clear client-side state
            logout();
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    return { logoutUser, loading, error };
};

export default useLogout;
