import React from 'react';
import VehicleGridItem from '../VehicleGridItem/VehicleGridItem';
import './VehicleGrid.css';

function VehicleGrid({ vehicles, onEdit, onDelete }) {
    return (
        <div className="vehicle-grid-list">
            {vehicles.map((vehicle) => (
                <VehicleGridItem
                    key={vehicle.id}
                    vehicle={vehicle}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default VehicleGrid;