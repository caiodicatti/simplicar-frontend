import React, { useState, useRef } from "react";
import { Form, Button, InputGroup, ListGroup, Spinner } from "react-bootstrap";
import './TradeInSearchSelector.css';

// Simulação de API (remover quando integrar)
const mockApi = (query) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const carros = [
                { id: 1, name: "Gol 1.0" },
                { id: 2, name: "Golf" },
                { id: 3, name: "Polo" },
                { id: 4, name: "Uno" },
            ];
            const result = carros.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
            resolve(result);
        }, 600);
    });
};

export default function TradeInSearchSelector({ value, onChange }) {
    const [inputValue, setInputValue] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const timerRef = useRef();

    const handleInputChange = (e) => {
        const val = e.target.value;
        setInputValue(val);

        if (val.length >= 3) {
            setLoading(true);
            clearTimeout(timerRef.current);

            // debounce para evitar chamadas excessivas
            timerRef.current = setTimeout(async () => {
                // Troque mockApi pela chamada real
                const res = await mockApi(val);
                setResults(res);
                setLoading(false);
            }, 350);
        } else {
            setResults([]);
        }
    };

    const handleSelectCar = (car) => {
        setInputValue(car.name);
        setResults([]);
        setShowSearch(false);
        onChange({ target: { name: "tradeInValue", value: car.id } });
    };

    return (
        <Form.Group controlId="tradeInValue">
            <Form.Label>Carro na troca</Form.Label>
            <InputGroup>
                <Form.Control
                    type="text"
                    value={inputValue}
                    onFocus={() => setShowSearch(true)}
                    onChange={handleInputChange}
                    placeholder="Busque pelo modelo (mínimo 3 letras)"
                    autoComplete="off"
                />
                {/* <Button variant="outline-secondary" onClick={() => setShowSearch(true)}>
                    Buscar
                </Button> */}
            </InputGroup>
            {showSearch && inputValue.length >= 3 && (
                <div style={{ position: "relative", zIndex: 999 }}>
                    {loading ? (
                        <Spinner animation="border" size="sm" />
                    ) : (
                        <ListGroup>
                            {results.length > 0 ? results.map(car => (
                                <ListGroup.Item
                                    key={car.id}
                                    action
                                    onClick={() => handleSelectCar(car)}
                                >
                                    {car.name}
                                </ListGroup.Item>
                            )) : (
                                <ListGroup.Item disabled>Nenhum carro encontrado</ListGroup.Item>
                            )}
                        </ListGroup>
                    )}
                </div>
            )}
        </Form.Group>
    );
}