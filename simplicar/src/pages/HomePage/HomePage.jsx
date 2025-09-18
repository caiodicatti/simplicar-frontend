import React from "react";
import "./HomePage.css";

const HomePage = () => {
    const session = JSON.parse(localStorage.getItem("userSession") || "{}");
    const token = session.token;

    if (!token) {
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
                    Bem-vindo, <span className="user-name">{token.name}</span>!
                </h1>
                <div className="user-info">
                    <div><strong>ID:</strong> {token.id}</div>
                    <div><strong>Função:</strong> {token.role}</div>
                    <div>
                        <strong>Expira em:</strong>{" "}
                        {new Date(token.exp * 1000).toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;