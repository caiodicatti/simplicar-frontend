import React, { useState } from 'react';
import './LoginForm.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function LoginForm({ onLogin, btnClass, loading }) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(e, user, password);
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <div>
                <label>Usuário:</label>
                <input
                    type="text"
                    value={user}
                    onChange={e => setUser(e.target.value)}
                    required
                    disabled={loading}
                />
            </div>
            <div>
                <label>Senha:</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    disabled={loading}
                />
            </div>

            <button
                className={btnClass}
                type="submit"
                disabled={loading}
            >
                {loading ? "Entrando..." : "Entrar"}
            </button>

        </form>
    );
}