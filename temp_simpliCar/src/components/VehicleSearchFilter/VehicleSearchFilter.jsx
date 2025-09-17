import React from "react";
import AsyncSelect from "react-select/async";
import { getVehicleByPlateOrModel } from "../../services/apiMock";

export default function VehicleSearchFilter({ value, onChange, type = "car", className }) {
    // Função para buscar veículos após 3 caracteres
    const loadOptions = async (inputValue, callback) => {
        if (inputValue.length < 3) {
            callback([]);
            return;
        }
        const res = await getVehicleByPlateOrModel(inputValue, type);
        callback(
            res.map(vehicle => ({
                value: vehicle.plate,
                label: `${vehicle.plate} - ${vehicle.brand} ${vehicle.model}`
            }))
        );
    };

    return (
        <div>
            <label>Veículo</label>
            <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions={false}
                onChange={opt => onChange(opt ? opt.value : "")}
                value={value ? { value, label: value } : null}
                placeholder="Busque por placa ou modelo (mínimo 3 letras)"
                isClearable
                className={className}
                classNamePrefix="react-select" />
        </div>
    );
}