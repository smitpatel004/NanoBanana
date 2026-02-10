import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3003';

export const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { login } = useAuth();

    const signupUser = async (email, password, name = '') => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password, name }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Signup failed');
            }

            // Auto-login after successful signup - Note: backend returns { message, user } for signup currently
            // We might need to adjust userSignUp to return session or just return user
            login(data.user ? { user: data.user } : { user: { email, name } });

            return { success: true, data };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    return { signupUser, loading, error, setError };
};

export default useSignup;
