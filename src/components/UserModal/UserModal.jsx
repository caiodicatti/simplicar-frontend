import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import UserModalStatusSwitch from '../UserModalStatusSwitch/UserModalStatusSwitch';
import './UserModal.css';

export default function UserModal({
    open,
    mode = "create",
    user = {},
    roles = [],
    stores = [],
    currentUser = {},
    onSave,
    onCancel,
    onToggleActive
}) {
    const isSuperAdmin = currentUser?.role === "superadmin";
    const userStoreId = currentUser?.storeId || "";

    const [form, setForm] = useState({
        login: "",
        name: "",
        email: "",
        birthDate: "",
        role: roles[0]?.key || "",
        active: true,
        storeId: isSuperAdmin ? "" : userStoreId
    });

    useEffect(() => {
        if (mode === "edit" && user) {
            setForm({
                login: user.login || "",
                name: user.name || "",
                email: user.email || "",
                birthDate: user.birthDate || "",
                role: user.role || roles[0]?.key || "",
                active: user.active !== undefined ? user.active : true,
                storeId: user.storeId || "",
            });
        } else {
            setForm({
                login: "",
                name: "",
                email: "",
                birthDate: "",
                role: roles[0]?.key || "",
                active: true,
                storeId: "",
            });
        }
    }, [user, mode, roles, isSuperAdmin, userStoreId]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (onSave) onSave(form);
    }

    function handleToggleActive() {
        if (onToggleActive) onToggleActive(!form.active);
        setForm(prev => ({ ...prev, active: !prev.active }));
    }

    return (
        <Modal show={open} onHide={onCancel} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    {mode === "create" ? "Cadastrar novo usuário" : "Editar usuário"}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Login</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="login"
                                    value={form.login}
                                    onChange={handleChange}
                                    autoFocus
                                    disabled={mode === "edit"}
                                    required
                                    maxLength={32}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Data de Nascimento</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="birthDate"
                                    value={form.birthDate}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Permissão</Form.Label>
                                <Form.Select
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}
                                    required
                                >
                                    {roles.map(r => (
                                        <option key={r.key} value={r.key}>{r.label}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        {isSuperAdmin && (
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Loja vinculada</Form.Label>
                                    <Form.Select
                                        name="storeId"
                                        value={form.storeId}
                                        onChange={handleChange}
                                        required
                                        disabled={mode === "edit"}
                                    >
                                        <option value="">Selecione uma loja</option>
                                        {stores.map(store => (
                                            <option key={store.id} value={store.id}>{store.nomeFantasia}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        )}
                        {mode === "edit" && (
                            <Col md={6} className={!isSuperAdmin ? "" : "mt-4"}>
                                <Form.Group>
                                    <Form.Label>Status</Form.Label>
                                    <div>
                                        <UserModalStatusSwitch
                                            active={form.active}
                                            onChange={handleToggleActive}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                        )}
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" type="submit">Salvar</Button>
                    <Button variant="outline-secondary" onClick={onCancel}>Cancelar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}