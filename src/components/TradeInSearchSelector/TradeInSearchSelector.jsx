import React from "react";
import AsyncSelect from "react-select/async";
import { getVehicleByPlateOrModel } from "../../services/apiMock";
import './TradeInSearchSelector.css';

const mockApi = async (query) => {
    if (!query || query.length < 3) return [];
    var carros = await getVehicleByPlateOrModel(query);
    return carros.map(c => ({ id: c.id, name: `${c.plate} - ${c.model}` }));
};

export default function TradeInSearchSelector({ value, onChange, className }) {
    const loadOptions = async (inputValue, callback) => {
        if (inputValue.length < 3) {
            callback([]);
            return;
        }
        const result = await mockApi(inputValue);
        callback(result.map(car => ({
            value: car.id,
            label: car.name
        })));
    };

    return (
        <div className="tradein-search-group">
            <label class="form-label">Carro na troca</label>
            <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions={false}
                onChange={opt => onChange({
                    target: {
                        name: "tradeInValue",
                        value: opt ? opt.value : "",
                        label: opt ? opt.label : ""
                    }
                })}
                value={value || null}
                placeholder="Busque pelo modelo ou placa"
                isClearable
                className={className}
                classNamePrefix="react-select"
            />
        </div>
    );
}