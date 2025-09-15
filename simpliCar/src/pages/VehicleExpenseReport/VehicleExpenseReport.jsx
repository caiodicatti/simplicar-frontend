import React, { useState } from "react";
import DateFilter from "../../components/DateFilter/DateFilter";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import ReportSummaryCard from "../../components/ReportSummaryCard/ReportSummaryCard";
import ReportTable from "../../components/ReportTable/ReportTable";
import ExportButton from "../../components/ExportButton/ExportButton";
import "./VehicleExpenseReport.css";

export default function VehicleExpenseReport() {
    // Mock dos filtros
    const [filters, setFilters] = useState({
        startDate: "",
        endDate: "",
        veiculo: ""
    });

    // Mock das opções para o filtro de veículo
    const veiculoOptions = [
        { value: "", label: "Todos" },
        { value: "ABC1234", label: "ABC1234 - Fiat Uno" },
        { value: "XYZ9876", label: "XYZ9876 - VW Gol" }
    ];

    // Exemplo de colunas para a tabela
    const columns = [
        { key: "veiculo", label: "Veículo" },
        { key: "tipoDespesa", label: "Tipo de Despesa" },
        { key: "valor", label: "Valor (R$)" },
        { key: "data", label: "Data" }
    ];

    // Dados mock para a tabela
    const data = [
        {
            veiculo: "ABC1234 - Fiat Uno",
            tipoDespesa: "Manutenção",
            valor: 350.00,
            data: "2025-08-10"
        },
        {
            veiculo: "XYZ9876 - VW Gol",
            tipoDespesa: "IPVA",
            valor: 800.00,
            data: "2025-07-05"
        }
    ];

    // Exemplo de valor total das despesas no período
    const totalDespesas = data.reduce((acc, curr) => acc + curr.valor, 0);

    // Função para atualizar filtros
    function handleFilterChange(key, value) {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    }

    return (
        <div className="vehicle-expense-report-page" style={{ padding: 32 }}>
            <h2>Relatório de Despesas por Veículo</h2>
            <DateFilter
                startDate={filters.startDate}
                endDate={filters.endDate}
                onChange={(startDate, endDate) => handleFilterChange("startDate", startDate) || handleFilterChange("endDate", endDate)}
            />
            <FilterPanel
                filters={[
                    {
                        key: "veiculo",
                        label: "Veículo",
                        type: "select",
                        options: veiculoOptions
                    }
                ]}
                values={filters}
                onChange={handleFilterChange}
            />
            <div className="report-summary-cards" style={{ display: 'flex', gap: 16, margin: '32px 0' }}>
                <ReportSummaryCard title="Total de Despesas no Período" value={totalDespesas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
            </div>
            <ExportButton type="excel" />
            <div style={{ marginTop: 32 }}>
                <ReportTable columns={columns} data={data} />
            </div>
        </div>
    );
}