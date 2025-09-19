import React from "react";
import "./HomePage.css";

const HomePage = () => {
    const session = JSON.parse(localStorage.getItem("userSession") || "{}");

    if (!session) {
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
                    Bem-vindo, <span className="user-name">{session.name}</span>!
                </h1>
                <div className="user-info">
                    <div><strong>ID:</strong> {session.id}</div>
                    <div><strong>Função:</strong> {session.role}</div>
                    <div>
                        <strong>Expira em:</strong>{" "}
                        {new Date(session.exp * 1000).toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;