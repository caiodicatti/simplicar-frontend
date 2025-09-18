import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from '../../components/LoginForm/LoginForm';
import { login } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function handleLogin(e, user, password) {
        e.preventDefault();
        setLoading(true);
        setError('');

        await sleep(1500);

        try {
            const userData = await login(user, password);
            if (userData) {
                const session = JSON.parse(localStorage.getItem("userSession") || "{}");
                session.token = userData;
                localStorage.setItem("userSession", JSON.stringify(session));
                setError('');
                navigate('/home');
            } else {
                setError('Usuário ou senha inválidos!');
            }
        } catch (err) {
            console.log(err);
            setError('Erro ao conectar!');
        } finally {
            setLoading(false);
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
                                <LoginForm onLogin={handleLogin} btnClass="" loading={loading} />
                                {loading && (
                                    <div className="login-loader">
                                        <div className="loader"></div>
                                        <span>Entrando...</span>
                                    </div>
                                )}
                                {error && <div className="error text-center">{error}</div>}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}