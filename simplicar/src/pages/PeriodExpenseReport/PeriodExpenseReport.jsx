import React, { useState } from "react";
import DateFilter from "../../components/DateFilter/DateFilter";
import ReportSummaryCard from "../../components/ReportSummaryCard/ReportSummaryCard";
import ReportTable from "../../components/ReportTable/ReportTable";
import ExportButton from "../../components/ExportButton/ExportButton";
import { formatCurrency, formatDate } from "../../utils/formatters";
import { getFinancialSummary } from "../../services/apiMock";
import "./PeriodExpenseReport.css";

function getToday() {
    const today = new Date();
    return today.toISOString().slice(0, 10);
}
function getOneMonthAgo() {
    const today = new Date();
    today.setMonth(today.getMonth() - 1);
    return today.toISOString().slice(0, 10);
}

export default function PeriodExpenseReport() {
    const [filters, setFilters] = useState({
        startDate: getOneMonthAgo(),
        endDate: getToday(),
    });
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [totalDespesas, setTotalDespesas] = useState(0);

    // Colunas: mostra placa/modelo pois pode ser vários veículos
    const columns = [
        { key: "plate", label: "Placa" },
        { key: "model", label: "Modelo" },
        { key: "description", label: "Despesa" },
        { key: "value", label: "Valor (R$)", formatter: formatCurrency },
        { key: "data", label: "Data", formatter: formatDate }
    ];

    async function handleSearch() {
        setLoading(true);
        const { listaVeiculos } = await getFinancialSummary(filters.startDate, filters.endDate, "car");
        const expenses = listaVeiculos.flatMap(vehicle =>
            (vehicle.expenses || []).map(e => ({
                ...e,
                data: vehicle.dtCreated,
                plate: vehicle.plate,
                model: vehicle.model
            }))
        );
        setData(expenses);
        setTotalDespesas(
            expenses.reduce((acc, curr) => acc + Number(curr.value), 0)
        );
        setLoading(false);
    }

    function handleFilterChange(key, value) {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    }

    return (
        <div className="period-expense-report-page">
            <h2>Relatório de Despesas por Período</h2>
            <div className="filters-row">
                <DateFilter
                    startDate={filters.startDate}
                    endDate={filters.endDate}
                    onChange={(startDate, endDate) =>
                        handleFilterChange("startDate", startDate) ||
                        handleFilterChange("endDate", endDate)
                    }
                />
                <button
                    className="search-btn"
                    onClick={handleSearch}
                    disabled={loading}
                >
                    {loading ? "Buscando..." : "Buscar"}
                </button>
            </div>
            <div className="report-summary-cards">
                <ReportSummaryCard
                    title="Total de Despesas no Período"
                    value={formatCurrency(totalDespesas)}
                />
            </div>
            <ExportButton
                type="excel"
                columns={columns}
                data={data}
                fileName="relatorio-despesas-periodo.xlsx"
            />
            <div style={{ marginTop: 32 }}>
                <ReportTable columns={columns} data={data} />
            </div>
        </div>
    );
}