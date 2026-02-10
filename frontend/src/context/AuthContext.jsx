import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const storedSession = localStorage.getItem('nanobanana_session');
        if (storedSession) {
            try {
                setUser(JSON.parse(storedSession));
            } catch (e) {
                localStorage.removeItem('nanobanana_session');
            }
        }
        setLoading(false);
    }, []);

    const login = (sessionData) => {
        setUser(sessionData);
        localStorage.setItem('nanobanana_session', JSON.stringify(sessionData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('nanobanana_session');
    };

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
