import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import LoginForm from '../../components/LoginForm/LoginForm';
import { login } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function handleLogin(user, password) {
        if (login(user, password)) {
            //setLoggedIn(true);
            localStorage.setItem("userToken", "fakeToken");
            setError('');
            navigate('/home');
        } else {
            setError('Usuário ou senha inválidos!');
        }
    }

    return (
        <div className="login-bg">
            <Container>
                <Row className="justify-content-center align-items-center vh-100">
                    <Col xs={12} sm={10} md={8} lg={6} xl={5}>
                        <div className="login-card">
                            <h2 className="login-title">Login</h2>
                            <div className="login-form-wrapper">
                                <LoginForm onLogin={handleLogin} btnClass="" />
                                {error && <div className="error text-center">{error}</div>}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}