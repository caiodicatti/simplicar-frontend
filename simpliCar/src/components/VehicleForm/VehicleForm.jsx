import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Spinner, Table, InputGroup } from "react-bootstrap";
import TradeInSearchSelector from "../TradeInSearchSelector/TradeInSearchSelector";
import { formatCurrency, formatDate, formatNumber, normalizeCurrencyInput, parseCurrencyString } from "../../utils/formatters";
import FormattedInput from "../FormattedInput/FormattedInput";
import apiMock from "../../services/apiMock";
import "./VehicleForm.css";

const initialState = {
    plate: "",
    brand: "",
    model: "",
    year: "",
    color: "",
    fipeValue: "",
    referenceMonth: "",
    mileage: "",
    purchaseValue: "",
    saleValue: "",
    tradeInValue: "",
    sold: "",
    expenses: [],
    notes: "",
    tradeInLabel: "",
};

export default function VehicleForm({ vehicleType = "", vehicleData = null, isEdit = false }) {
    const [form, setForm] = useState(vehicleData || initialState);
    const [loadingPlate, setLoadingPlate] = useState(false);
    const [expenseRows, setExpenseRows] = useState([{ description: "", value: "" }]);

    useEffect(() => {
        if (isEdit && vehicleData) {
            setForm({
                ...vehicleData,
                purchaseValue: formatCurrency(vehicleData.purchaseValue),
                saleValue: formatCurrency(vehicleData.saleValue),
                mileage: formatNumber(vehicleData.mileage),
            });
            setExpenseRows(
                vehicleData.expenses.length > 0
                    ? vehicleData.expenses.map(e => ({
                        ...e,
                        value: formatCurrency(e.value)
                    }))
                    : [{ description: "", value: "" }]
            );
        }
    }, [vehicleData, isEdit]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value.toUpperCase() }));
    }

    function handlePlateBlur() {
        if (form.plate.trim()) {
            setLoadingPlate(true);
            var type = vehicleType.toLowerCase() === 'carro' ? 'car' : 'moto';

            // Simulação de chamada à API
            apiMock.getVehicleByPlate(form.plate.trim().toUpperCase(), type)
                .then(data => {
                    if (data) {
                        setForm(data)
                    } else {
                        setForm(prev => ({
                            ...initialState,
                            plate: prev.plate,
                        }));
                    }
                    setLoadingPlate(false);
                });
        }
    }

    function handleExpenseChange(idx, field, value) {
        setExpenseRows((prev) =>
            prev.map((row, i) => (i === idx ? { ...row, [field]: value } : row))
        );
    }

    function addExpenseRow() {
        setExpenseRows((prev) => [...prev, { description: "", value: "" }]);
    }

    function removeExpenseRow(idx) {
        setExpenseRows((prev) => prev.filter((_, i) => i !== idx));
    }

    const totalExpenses = expenseRows.reduce(
        (sum, row) => sum + parseCurrencyString(row.value),
        0
    );

    return (
        <div className="vehicleform-wrapper">
            <Form className="vehicleform-form p-4">
                {/* Placa */}
                <Form.Group as={Row} className="mb-3" controlId="plate">
                    <Form.Label column sm={3} md={3} lg={2}>Digite a Placa <span className="text-danger">*</span></Form.Label>
                    <Col sm={4}>
                        <Form.Control
                            type="text"
                            name="plate"
                            value={form.plate}
                            onChange={handleChange}
                            onBlur={handlePlateBlur}
                            disabled={loadingPlate}
                            placeholder="ABC1D23"
                            required
                            maxLength={7}
                        />
                    </Col>
                    <Col sm={2}>
                        {loadingPlate && <Spinner animation="border" />}
                    </Col>
                </Form.Group>

                {/* Informações do Veículo */}
                <h5 className="mt-4">Informações do Veículo</h5>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="brand">
                            <Form.Label>Marca <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                name="brand"
                                value={form.brand}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="model">
                            <Form.Label>Modelo <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                name="model"
                                value={form.model}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group controlId="year">
                            <Form.Label>Ano <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                name="year"
                                value={form.year}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group controlId="color">
                            <Form.Label>Cor</Form.Label>
                            <Form.Control
                                type="text"
                                name="color"
                                value={form.color}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="fipeValue">
                            <Form.Label>Valor Fipe</Form.Label>
                            <Form.Control
                                type="text"
                                name="fipeValue"
                                value={formatCurrency(form.fipeValue)}
                                onChange={handleChange}
                                disabled
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="referenceMonth">
                            <Form.Label>Mês de Referência</Form.Label>
                            <Form.Control
                                type="text"
                                name="referenceMonth"
                                value={form.referenceMonth}
                                onChange={handleChange}
                                disabled
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="mileage">
                            <Form.Label>Quilometragem</Form.Label>
                            <FormattedInput
                                name="mileage"
                                value={form.mileage}
                                onChange={handleChange}
                                formatFn={formatNumber}
                                normalizeFn={val => val.replace(/\D/g, "")}
                                className="form-control"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* Informações de Negócio */}
                <h5 className="mt-4">Informações de Negócio</h5>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="purchaseValue">
                            <Form.Label>Valor de compra</Form.Label>
                            <FormattedInput
                                name="purchaseValue"
                                value={form.purchaseValue}
                                onChange={handleChange}
                                formatFn={formatCurrency}
                                normalizeFn={normalizeCurrencyInput}
                                className="form-control"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="saleValue">
                            <Form.Label>Valor de venda</Form.Label>
                            <FormattedInput
                                name="saleValue"
                                value={form.saleValue}
                                onChange={handleChange}
                                formatFn={formatCurrency}
                                normalizeFn={normalizeCurrencyInput}
                                className="form-control"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="sold">
                            <Form.Label>Foi vendido?</Form.Label>
                            <Form.Select
                                name="sold"
                                value={form.sold}
                                onChange={handleChange}
                            >
                                <option value="">Selecione</option>
                                <option value="sim">Sim</option>
                                <option value="nao">Não</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={8}>
                        <TradeInSearchSelector
                            value={form.tradeInValue && form.tradeInLabel
                                ? { value: form.tradeInValue, label: form.tradeInLabel }
                                : null}
                            onChange={e => setForm(prev => ({
                                ...prev,
                                tradeInValue: e.target.value,
                                tradeInLabel: e.target.label
                            }))}
                            className="tradein-search-select"
                        />
                    </Col>
                </Row>

                {/* Gastos com o veículo */}
                <h5 className="mt-4">Gastos com o veículo</h5>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Valor (R$)</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenseRows.map((row, idx) => (
                            <tr key={idx}>
                                <td>
                                    <Form.Control
                                        type="text"
                                        value={row.description}
                                        onChange={(e) => handleExpenseChange(idx, "description", e.target.value)}
                                        placeholder="Ex: Troca de óleo"
                                    />
                                </td>
                                <td>
                                    <InputGroup>
                                        <FormattedInput
                                            type="text"
                                            name="value"
                                            value={row.value}
                                            onChange={e => handleExpenseChange(idx, "value", e.target.value)}
                                            formatFn={formatCurrency}
                                            normalizeFn={normalizeCurrencyInput}
                                            className="form-control"
                                        />
                                    </InputGroup>
                                </td>
                                <td>
                                    {expenseRows.length > 1 && (
                                        <Button variant="danger" size="sm" onClick={() => removeExpenseRow(idx)}>Remover</Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Button variant="secondary" onClick={addExpenseRow}>
                    Adicionar gasto
                </Button>
                <div className="mt-2"><strong>Valor total de gastos: </strong>{formatCurrency(totalExpenses.toString())}</div>

                {/* Anotações gerais */}
                <h5 className="mt-4">Anotações gerais</h5>
                <Form.Group className="mb-3" controlId="notes">
                    <Form.Label>Campo livre para observações</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                    />
                </Form.Group>

                {/* Ações */}
                <div className="d-flex gap-2 justify-content-end mt-4">
                    <Button variant="success">Salvar</Button>
                    <Button variant="outline-secondary">Cancelar</Button>
                </div>
            </Form>
        </div>
    );
}