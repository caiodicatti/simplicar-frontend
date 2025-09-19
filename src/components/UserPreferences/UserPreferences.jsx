import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useAuth } from '../../context/AuthContext';
import "./UserPreferences.css";

const DEFAULT_PREFERENCES = {
    theme: "light",
    pageSize: 5,
};

export default function UserPreferences({ onSave }) {
    const [prefs, setPrefs] = useState(DEFAULT_PREFERENCES);
    const [saved, setSaved] = useState(false);
    const { user, logout, setUser, updatePrefs } = useAuth();

    // Carregar preferências do localStorage
    useEffect(() => {
        if (user.prefs) {
            setPrefs(user.prefs);
        }
        // Aplica o tema ao carregar
        const theme = user.prefs?.theme || DEFAULT_PREFERENCES.theme;
        document.body.setAttribute("data-theme", theme);
    }, []);

    // Sempre que mudar o tema, aplica no <body>
    useEffect(() => {
        document.body.setAttribute("data-theme", prefs.theme);
    }, [prefs.theme]);

    function handleChange(e) {
        const { name, value } = e.target;
        setPrefs(prev => ({
            ...prev,
            [name]: name === "pageSize" ? parseInt(value, 10) : value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        updatePrefs(prefs); // Agora funciona!
        document.body.setAttribute("data-theme", prefs.theme);
        setSaved(true);
        if (onSave) onSave(prefs);
        setTimeout(() => setSaved(false), 2000);
    }

    return (
        <div className="preferences-form p-4 mx-auto">
            <h3 className="mb-4 text-center">Preferências</h3>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Tema</Form.Label>
                            <Form.Select name="theme" value={prefs.theme} onChange={handleChange}>
                                <option value="light">Claro</option>
                                <option value="dark">Escuro</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Itens por página</Form.Label>
                            <Form.Control
                                type="number"
                                name="pageSize"
                                min={1}
                                max={50}
                                value={prefs.pageSize}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col className="d-flex justify-content-end">
                        <Button variant="success" type="submit">Salvar</Button>
                    </Col>
                </Row>
                {saved && (
                    <div className="text-success mt-3 text-end" style={{ fontSize: "0.98em" }}>
                        Preferências salvas!
                    </div>
                )}
            </Form>
        </div>
    );
}