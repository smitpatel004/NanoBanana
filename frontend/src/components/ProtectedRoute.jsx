import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Protected Route - requires authentication
export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div
                className="min-h-screen flex items-center justify-center"
                style={{ background: '#0a0a0a' }}
            >
                <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-3 h-3 rounded-full animate-bounce"
                            style={{
                                background: '#3b82f6',
                                animationDelay: `${i * 0.1}s`
                            }}
                        />
                    ))}
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        // Redirect to login, but save the attempted URL
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

// Public Route - redirects to studio if already authenticated
export const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div
                className="min-h-screen flex items-center justify-center"
                style={{ background: '#0a0a0a' }}
            >
                <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-3 h-3 rounded-full animate-bounce"
                            style={{
                                background: '#3b82f6',
                                animationDelay: `${i * 0.1}s`
                            }}
                        />
                    ))}
                </div>
            </div>
        );
    }

    if (isAuthenticated) {
        // Redirect to the page they came from, or studio
        const from = location.state?.from?.pathname || '/studio';
        return <Navigate to={from} replace />;
    }

    return children;
};
