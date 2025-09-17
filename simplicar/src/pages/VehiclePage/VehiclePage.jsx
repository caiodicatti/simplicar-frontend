import VehicleForm from "../../components/VehicleForm/VehicleForm";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import apiMock from '../../services/apiMock';


import "./VehiclePage.css";

export default function VehiclePage({ vehicleType = "", mode = "edit" }) {
    const { id } = useParams();
    const [vehicleData, setVehicleData] = useState(null);

    // useEffect(() => {
    //     if (mode === "edit" && id) {
    //         // Aqui você chama sua API para buscar os dados pelo id
    //         fetch(`/api/vehicle/${id}`)
    //             .then(res => res.json())
    //             .then(data => setVehicleData(data));
    //     }
    // }, [id, mode]);

    useEffect(() => {
        if (mode === "edit" && id) {
            var type = vehicleType.toLowerCase() === 'carro' ? 'car' : 'moto';
            apiMock.getVehicleById(Number(id), type)
                .then(data => setVehicleData(data));
        }
    }, [id, mode]);

    // Só renderiza o form quando os dados estiverem carregados
    if (mode === "edit" && !vehicleData) {
        return <div className="vehicle-loading">Carregando...</div>;
    }

    return (
        <div className="vehicle-page">

            <h2 className="title-vehicle-page">
                {mode === "edit" ? `Editar ${vehicleType}` : `Cadastro de ${vehicleType}`}
            </h2>

            <VehicleForm
                vehicleType={vehicleType}
                vehicleData={vehicleData}
                isEdit={mode === "edit"}
            />
        </div>
    );
}