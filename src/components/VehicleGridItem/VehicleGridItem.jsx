import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './VehicleGridItem.css';

function VehicleGridItem({ vehicle, onEdit, onDelete }) {
    return (
        <div className="vehicle-grid-row">
            <div className="vehicle-grid-info">
                <span className="vehicle-placa">{vehicle.placa}</span>
                <span className="vehicle-extra">
                    - {vehicle.modelo} - {vehicle.cor}
                </span>
            </div>
            <div className="vehicle-grid-actions">
                <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => onEdit(vehicle)}
                    title="Editar"
                >
                    <FaEdit />
                </button>
                <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => onDelete(vehicle)}
                    title="Excluir"
                >
                    <FaTrash />
                </button>
            </div>
        </div>
    );
}

export default VehicleGridItem;