import React, { useState, useEffect } from 'react';
import SearchInput from '../../components/SearchInput/SearchInput';
import VehicleGrid from '../../components/VehicleGrid/VehicleGrid';
import Pagination from '../../components/Pagination/Pagination';
import apiMock from '../../services/apiMock';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from "react-bootstrap";
import { useAuth } from '../../context/AuthContext';
import './VehicleSearchPage.css';

function VehicleSearchPage({ vehicleType = "Carro" }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { user } = useAuth();
    const navigate = useNavigate();

    const PAGE_SIZE = user.prefs?.pageSize ?? 5;

    useEffect(() => {
        async function fetchVehicles() {
            var type = vehicleType.toLowerCase() === 'carro' ? 'car' : 'moto';
            const vehiclesData = await apiMock.getVehicles(type);
            const mapped = vehiclesData.map(v => ({
                ...v,
                placa: v.plate,
                modelo: v.model,
                cor: v.color
            }));
            setVehicles(mapped);
        }
        fetchVehicles();
    }, [vehicleType]);

    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.modelo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredVehicles.length / PAGE_SIZE);
    const paginatedVehicles = filteredVehicles.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    const handleSearch = async () => {
        setCurrentPage(1);
        var type = vehicleType.toLowerCase() === 'carro' ? 'car' : 'moto';
        const vehiclesData = await apiMock.getVehicleByPlateOrModel(searchTerm, type);
        const mapped = vehiclesData.map(v => ({
            ...v,
            placa: v.plate,
            modelo: v.model,
            cor: v.color
        }));

        setVehicles(mapped);
    };

    const handleEdit = (vehicle) => {
        navigate(`/edit-${vehicleType.toLowerCase()}/${vehicle.id}`);
    };

    const handleDelete = (vehicle) => {
        if (window.confirm(`Excluir ${vehicleType.toLowerCase()} ${vehicle.placa}?`)) {
            setVehicles(prev => prev.filter(v => v.id !== vehicle.id));
        }
    };

    const handlePageChange = (page) => setCurrentPage(page);

    function navigaeteToAddVehicle(vehicle) {
        navigate(`/cad-${vehicle}`);
    }


    return (
        <div className="vehicle-search-center">
            <div className="vehicle-search-content">
                <h2 className="mb-4 text-center">{vehicleType}s</h2>
                <Row className="mb-3 gx-2 gy-2">
                    <Col xs={12} md={9}>
                        <SearchInput
                            value={searchTerm}
                            onChange={setSearchTerm}
                            onSearch={handleSearch}
                            placeholder={`Digite a placa ou modelo do ${vehicleType.toLowerCase()}`}
                        />
                    </Col>
                    <Col xs={12} md={3}>
                        <button
                            className="btn btn-success w-100 w-md-auto"
                            type="button"
                            onClick={() => navigaeteToAddVehicle(vehicleType.toLowerCase())}
                            style={{ whiteSpace: "nowrap" }}
                        >
                            {vehicleType.toLowerCase() == `carro` ? `Cadastrar novo ${vehicleType}` : `Cadastrar nova ${vehicleType}`}
                        </button>
                    </Col>
                </Row>
                <VehicleGrid
                    vehicles={paginatedVehicles}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}

export default VehicleSearchPage;