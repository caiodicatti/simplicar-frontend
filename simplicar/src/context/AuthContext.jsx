import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("userSession");
        if (storedUser) setUser(JSON.parse(storedUser));
        setLoading(false);
    }, []);

    const login = (userData) => {
        localStorage.setItem("userSession", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("userSession");
        setUser(null);
    };

    const updatePrefs = (prefs) => {
        const updatedUser = { ...user, prefs };
        setUser(updatedUser);
        localStorage.setItem("userSession", JSON.stringify(updatedUser));
    };

    if (loading) return null;

    return (
        <AuthContext.Provider value={{ user, login, logout, updatePrefs }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}