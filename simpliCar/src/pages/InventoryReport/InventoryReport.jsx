import React, { useState } from "react";
import ReportSummaryCard from "../../components/ReportSummaryCard/ReportSummaryCard";
import ReportTable from "../../components/ReportTable/ReportTable";
import ExportButton from "../../components/ExportButton/ExportButton";
import Select from "react-select";
import { getVehicles } from "../../services/apiMock";
import "./InventoryReport.css";

export default function InventoryReport() {
    const [filters, setFilters] = useState({
        tipo: "",
        status: "",
        cor: ""
    });
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [colorOptions, setColorOptions] = useState([{ value: "", label: "Todas as cores" }]);

    const tipoOptions = [
        { value: "", label: "Todos os tipos" },
        { value: "car", label: "Carro" },
        { value: "moto", label: "Moto" }
    ];

    const statusOptions = [
        { value: "", label: "Todos os status" },
        { value: "sim", label: "Vendido" },
        { value: "nao", label: "Em Estoque" }
    ];

    const columns = [
        { key: "veiculo", label: "Veículo" },
        { key: "tipo", label: "Tipo" },
        { key: "color", label: "Cor" },
        { key: "status", label: "Status" }
    ];

    function formatStatus(sold) {
        if (sold === "sim") return "Vendido";
        if (sold === "nao") return "Em Estoque";
        return sold;
    }
    function formatTipo(type) {
        if (type === "car") return "Carro";
        if (type === "moto") return "Moto";
        return type;
    }

    async function handleSearch() {
        setLoading(true);
        let vehicles = await getVehicles(filters.tipo || "car");
        if (filters.status) {
            vehicles = vehicles.filter(v => v.sold === filters.status);
        }
        if (filters.cor) {
            vehicles = vehicles.filter(v => v.color.trim().toLowerCase() === filters.cor);
        }
        setData(
            vehicles.map(v => ({
                veiculo: `${v.plate} - ${v.brand} ${v.model}`,
                tipo: formatTipo(v.type),
                color: v.color,
                status: formatStatus(v.sold)
            }))
        );
        setLoading(false);
    }

    async function fetchColorOptions(tipo) {
        const vehicles = await getVehicles(tipo || "car");
        const coresUnicas = Array.from(
            new Set(vehicles.map(v => v.color.trim().toLowerCase()))
        );
        return [
            { value: "", label: "Todas as cores" },
            ...coresUnicas.map(cor => ({
                value: cor,
                label: cor.charAt(0).toUpperCase() + cor.slice(1)
            }))
        ];
    }

    function handleFilterChange(key, value) {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    }

    React.useEffect(() => {
        async function getColors() {
            const options = await fetchColorOptions(filters.tipo || "car");
            setColorOptions(options);
        }
        getColors();
    }, [filters.tipo]);

    React.useEffect(() => {
        handleSearch();
    }, []);

    const vendidos = data.filter(v => v.status === "Vendido").length;
    const estoque = data.filter(v => v.status === "Em Estoque").length;

    return (
        <div className="inventory-report-page">
            <h2>Inventário de Veículos</h2>
            <div className="inventory-filters-row">
                <div className="inventory-filter-group">
                    <label>Tipo de Veículo</label>
                    <Select
                        className="inventory-select"
                        options={tipoOptions}
                        value={tipoOptions.find(opt => opt.value === filters.tipo)}
                        onChange={opt => handleFilterChange("tipo", opt ? opt.value : "")}
                        placeholder="Selecione"
                        isClearable
                    />
                </div>
                <div className="inventory-filter-group">
                    <label>Status</label>
                    <Select
                        className="inventory-select"
                        options={statusOptions}
                        value={statusOptions.find(opt => opt.value === filters.status)}
                        onChange={opt => handleFilterChange("status", opt ? opt.value : "")}
                        placeholder="Selecione"
                        isClearable
                    />
                </div>
                <div className="inventory-filter-group">
                    <label>Cor</label>
                    <Select
                        className="inventory-select"
                        options={colorOptions}
                        value={colorOptions.find(opt => opt.value === filters.cor)}
                        onChange={opt => handleFilterChange("cor", opt ? opt.value : "")}
                        placeholder="Todas as cores"
                        isClearable
                    />
                </div>
                <button
                    className="inventory-search-btn"
                    onClick={handleSearch}
                    disabled={loading}
                >
                    {loading ? "Buscando..." : "Buscar"}
                </button>
            </div>
            <div className="inventory-report-summary-cards">
                <ReportSummaryCard title="Veículos em Estoque" value={estoque} />
                <ReportSummaryCard title="Veículos Vendidos" value={vendidos} />
            </div>
            <ExportButton type="excel" columns={columns} data={data} fileName="inventario-veiculos.xlsx" />
            <div style={{ marginTop: 32 }}>
                <ReportTable columns={columns} data={data} />
            </div>
        </div>
    );
}