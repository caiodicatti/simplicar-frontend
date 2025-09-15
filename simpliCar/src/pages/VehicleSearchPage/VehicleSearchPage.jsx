import React, { useState, useEffect } from 'react';
import SearchInput from '../../components/SearchInput/SearchInput';
import VehicleGrid from '../../components/VehicleGrid/VehicleGrid';
import Pagination from '../../components/Pagination/Pagination';
import apiMock from '../../services/apiMock';
import { useNavigate } from 'react-router-dom';
import './VehicleSearchPage.css';

const PAGE_SIZE = 5;

function VehicleSearchPage({ vehicleType = "Carro" }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchVehicles() {
            const vehiclesData = await apiMock.getVehicles();
            const mapped = vehiclesData.map(v => ({
                ...v,
                placa: v.plate,
                modelo: v.model,
                cor: v.color
            }));
            setVehicles(mapped);
        }
        fetchVehicles();
    }, []);

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

        const vehiclesData = await apiMock.getVehicleByPlateOrModel(searchTerm);
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
                <div className="d-flex flex-wrap gap-2 mb-3">
                    <div className="flex-grow-1">
                        <SearchInput
                            value={searchTerm}
                            onChange={setSearchTerm}
                            onSearch={handleSearch}
                            placeholder={`Digite a placa ou modelo do ${vehicleType.toLowerCase()}`}
                        />
                    </div>
                    <button className="btn btn-success" type="button" onClick={() => navigaeteToAddVehicle(vehicleType.toLowerCase())}>
                        {`Cadastrar novo ${vehicleType}`}
                    </button>
                </div>
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