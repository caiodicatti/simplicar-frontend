import React, { useState } from "react";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import "./PasswordChange.css";

const getStrength = password => {
    if (!password) return { label: '', color: '' };
    if (password.length < 6) return { label: 'Weak', color: '#d32f2f' };
    if (password.match(/[A-Z]/) && password.match(/[a-z]/) && password.match(/[0-9]/) && password.length >= 8)
        return { label: "Strong", color: "#388e3c" };
    return { label: "Medium", color: "#fbc02d" };
};

export default function PasswordChange({ onChange }) {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [touched, setTouched] = useState(false);

    const strength = getStrength(password);
    const match = password && confirm && password === confirm;

    function handleSubmit(e) {
        e.preventDefault();
        if (onChange) onChange(password);
        setPassword("");
        setConfirm("");
        setTouched(false);
    }

    return (
        <div className="password-change-form p-4 mx-auto">
            <h3 className="mb-4 text-center">Alterar Senha</h3>
            <Form onSubmit={handleSubmit} className="password-change-flex-form">
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nova senha</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={e => {
                                        setPassword(e.target.value);
                                        setTouched(true);
                                    }}
                                    required
                                />
                            </InputGroup>
                            {strength.label && (
                                <InputGroup.Text
                                    style={{
                                        color: strength.color,
                                        minWidth: 80,
                                        fontWeight: 600,
                                    }}
                                >
                                    {strength.label === "Weak"
                                        ? "Fraca"
                                        : strength.label === "Medium"
                                            ? "Intermediária"
                                            : "Forte"}
                                </InputGroup.Text>
                            )}
                            <small style={{ color: strength.color }}>
                                {strength.label === "Weak"
                                    ? "Escolha uma senha mais forte (mínimo 8 caracteres, letras maiúsculas, minúsculas e números)."
                                    : ""}
                            </small>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Confirmar nova senha</Form.Label>
                            <Form.Control
                                type="password"
                                value={confirm}
                                onChange={e => setConfirm(e.target.value)}
                                required
                                isInvalid={touched && confirm && password !== confirm}
                                isValid={touched && match}
                            />
                            <Form.Control.Feedback className="feedback-pass" type="invalid">
                                Senhas não conferem.
                            </Form.Control.Feedback>
                            <Form.Control.Feedback className="feedback-pass" type="valid">
                                Senhas conferem.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <div className="password-action-bar">
                    <span className="password-rule-label">
                        * A senha deve ter pelo menos 8 caracteres.
                    </span>
                    <Button
                        variant="success"
                        type="submit"
                        disabled={!match || password.length < 8}
                        className="ml-3"
                    >
                        Alterar Senha
                    </Button>
                </div>
            </Form>
        </div>
    );
}