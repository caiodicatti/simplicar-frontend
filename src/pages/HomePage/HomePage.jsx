import React from "react";
import { useAuth } from '../../context/AuthContext';
import "./HomePage.css";

const HomePage = () => {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="home-wrapper">
                <div className="user-card">Você não está logado.</div>
            </div>
        );
    }

    return (
        <div className="home-wrapper">
            <div className="user-card">
                <h1>
                    Bem-vindo, <span className="user-name">{user.name}</span>!
                </h1>
                <div className="user-info">
                    <div><strong>ID:</strong> {user.id}</div>
                    <div><strong>Função:</strong> {user.role}</div>
                    <div>
                        <strong>Expira em:</strong>{" "}
                        {new Date(user.exp * 1000).toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;