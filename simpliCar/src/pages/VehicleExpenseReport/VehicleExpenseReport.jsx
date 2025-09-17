import React, { useState } from "react";
import VehicleSearchFilter from "../../components/VehicleSearchFilter/VehicleSearchFilter";
import ReportSummaryCard from "../../components/ReportSummaryCard/ReportSummaryCard";
import ReportTable from "../../components/ReportTable/ReportTable";
import ExportButton from "../../components/ExportButton/ExportButton";
import { formatCurrency, formatDate } from "../../utils/formatters";
import { getVehicleByPlateOrModel } from "../../services/apiMock";
import "./VehicleExpenseReport.css";

export default function VehicleExpenseReport() {
    const [filters, setFilters] = useState({
        veiculo: ""
    });
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [totalDespesas, setTotalDespesas] = useState(0);

    const columns = [
        { key: "description", label: "Despesa" },
        { key: "value", label: "Valor (R$)", formatter: formatCurrency },
        { key: "data", label: "Data", formatter: formatDate }
    ];

    async function handleSearch() {
        setLoading(true);
        const found = await getVehicleByPlateOrModel(filters.veiculo, "car");
        if (found && found.length > 0) {
            const vehicle = found[0];
            const expenses = (vehicle.expenses || []).map(e => ({
                ...e,
                data: vehicle.dtCreated
            }));
            setData(expenses);
            setTotalDespesas(
                expenses.reduce((acc, curr) => acc + Number(curr.value), 0)
            );
        } else {
            setData([]);
            setTotalDespesas(0);
        }
        setLoading(false);
    }

    function handleFilterChange(key, value) {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    }

    return (
        <div className="vehicle-expense-report-page">
            <h2>Relatório de Despesas por Veículo</h2>
            <div className="filters-row-vehicle-expense">
                <VehicleSearchFilter
                    value={filters.veiculo}
                    onChange={val => handleFilterChange("veiculo", val)}
                    type="car"
                    className="vehicle-search-select"
                />
                <button
                    className="search-btn-vehicle-expense"
                    onClick={handleSearch}
                    disabled={loading || !filters.veiculo}
                >
                    {loading ? "Buscando..." : "Buscar"}
                </button>
            </div>
            <div className="report-summary-cards">
                <ReportSummaryCard
                    title="Total de Despesas"
                    value={formatCurrency(totalDespesas)}
                />
            </div>
            <ExportButton
                type="excel"
                columns={columns}
                data={data}
                fileName="relatorio-despesas-veiculo.xlsx"
            />
            <div style={{ marginTop: 32 }}>
                <ReportTable columns={columns} data={data} />
            </div>
        </div>
    );
}