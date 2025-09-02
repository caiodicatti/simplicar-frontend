import React, { useState } from 'react';
import './LoginForm.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function LoginForm({ onLogin, btnClass }) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(user, password);
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
                />
            </div>
            <div>
                <label>Senha:</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </div>

            <button className={btnClass} type="submit">Entrar</button>

        </form>
    );
}