import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Quando o app inicia, tenta ler o usuário do localStorage
        const storedUser = localStorage.getItem("userSession");
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    // Função para login
    const login = (userData) => {
        localStorage.setItem("userSession", JSON.stringify(userData));
        setUser(userData);
    };

    // Função para logout
    const logout = () => {
        localStorage.removeItem("userSession");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}