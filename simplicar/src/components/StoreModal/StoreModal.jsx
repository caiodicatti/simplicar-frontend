import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { validateCNPJ } from '../../utils/validators';
import { formatCNPJ, formatDate } from '../../utils/formatters';
import './StoreModal.css';

export default function StoreModal({
    open,
    mode = "create",
    store = {},
    onSave,
    onCancel
}) {
    const [form, setForm] = useState({
        nomeFantasia: "",
        cnpj: "",
        proprietario: "",
        situacao: "Ativo",
        ativoAte: "",
        enderecos: [""],
        telefone: "",
        email: "",
        plano: "Mensal",
        observacoes: "",
        criadoEm: "",
        atualizadoEm: ""
    });

    useEffect(() => {
        if (mode === "edit" && store) {
            setForm({
                nomeFantasia: store.nomeFantasia || "",
                cnpj: formatCNPJ(store.cnpj || ""),
                proprietario: store.proprietario || "",
                situacao: store.situacao || "Ativo",
                ativoAte: store.ativoAte || "",
                enderecos: store.enderecos?.length ? [...store.enderecos] : [""],
                telefone: store.telefone || "",
                email: store.email || "",
                plano: store.plano || "Mensal",
                observacoes: store.observacoes || "",
                criadoEm: store.criadoEm || "",
                atualizadoEm: store.atualizadoEm || ""
            });
        } else {
            setForm({
                nomeFantasia: "",
                cnpj: "",
                proprietario: "",
                situacao: "Ativo",
                ativoAte: "",
                enderecos: [""],
                telefone: "",
                email: "",
                plano: "Mensal",
                observacoes: "",
                criadoEm: "",
                atualizadoEm: ""
            });
        }
    }, [store, mode]);

    // Input CNPJ: sempre exibe formatado
    function handleChange(e) {
        const { name, value } = e.target;
        if (name === "cnpj") {
            setForm(prev => ({
                ...prev,
                cnpj: formatCNPJ(value)
            }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    }

    function handleSituacaoChange(e) {
        setForm(prev => ({ ...prev, situacao: e.target.value }));
    }

    function handleEnderecoChange(idx, value) {
        setForm(prev => ({
            ...prev,
            enderecos: prev.enderecos.map((end, i) => i === idx ? value : end)
        }));
    }

    function handleAddEndereco() {
        setForm(prev => ({
            ...prev,
            enderecos: [...prev.enderecos, ""]
        }));
    }

    function handleRemoveEndereco(idx) {
        setForm(prev => ({
            ...prev,
            enderecos: prev.enderecos.filter((_, i) => i !== idx)
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Antes de salvar, normaliza o CNPJ (apenas dígitos)
        const submitForm = { ...form, cnpj: form.cnpj.replace(/[^\d]+/g, "") };
        if (!validateCNPJ(submitForm.cnpj)) return; // bloqueia submit se inválido
        if (onSave) onSave(submitForm);
    }

    // Validação do CNPJ
    const isCNPJValid = validateCNPJ(form.cnpj);
    const cnpjValidationMsg = form.cnpj.length >= 18 // 18 = máscara completa
        ? (isCNPJValid ? 'CNPJ válido' : 'CNPJ inválido')
        : '';

    return (
        <Modal show={open} onHide={onCancel} centered size="lg" className="store-modal-overlay">
            <Modal.Header closeButton>
                <Modal.Title>
                    {mode === "create" ? "Cadastrar nova loja" : "Editar loja"}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome Fantasia</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nomeFantasia"
                                    value={form.nomeFantasia}
                                    onChange={handleChange}
                                    required
                                    autoFocus
                                    maxLength={64}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>CNPJ</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cnpj"
                                    value={form.cnpj}
                                    onChange={handleChange}
                                    maxLength={18}
                                />
                                {form.cnpj && (
                                    <small
                                        style={{
                                            color: isCNPJValid ? 'green' : 'red',
                                            fontSize: '0.93em',
                                            marginTop: 2,
                                            display: 'block'
                                        }}
                                    >
                                        {cnpjValidationMsg}
                                    </small>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Proprietário</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="proprietario"
                                    value={form.proprietario}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Situação</Form.Label>
                                <Form.Select
                                    name="situacao"
                                    value={form.situacao}
                                    onChange={handleSituacaoChange}
                                    required
                                >
                                    <option value="Ativo">Ativo</option>
                                    <option value="Inadimplente">Inadimplente</option>
                                    <option value="Bloqueado">Bloqueado</option>
                                    <option value="Em teste">Em teste</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Ativo até</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="ativoAte"
                                    value={form.ativoAte}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Plano</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="plano"
                                    value={form.plano}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Endereço(s)</Form.Label>
                                {form.enderecos.map((end, idx) => (
                                    <div key={idx} className="d-flex mb-2 align-items-center">
                                        <Form.Control
                                            type="text"
                                            value={end}
                                            onChange={e => handleEnderecoChange(idx, e.target.value)}
                                            placeholder={`Endereço ${idx + 1}`}
                                        />
                                        {form.enderecos.length > 1 && (
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => handleRemoveEndereco(idx)}
                                                className="ms-2"
                                            >Remover</Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={handleAddEndereco}
                                    className="mt-2"
                                >Adicionar endereço</Button>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Telefone/Contato</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="telefone"
                                    value={form.telefone}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>E-mail de contato</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Observações</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="observacoes"
                                    value={form.observacoes}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    {mode === "edit" && (
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Criado em</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formatDate(form.criadoEm)}
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Atualizado em</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formatDate(form.atualizadoEm)}
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="success"
                        type="submit"
                        disabled={!isCNPJValid && form.cnpj.length >= 18}
                    >Salvar</Button>
                    <Button variant="outline-secondary" onClick={onCancel}>Cancelar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}