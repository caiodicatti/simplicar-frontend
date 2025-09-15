import React, { useState } from "react";
import ReportSummaryCard from "../../components/ReportSummaryCard/ReportSummaryCard";
import ReportTable from "../../components/ReportTable/ReportTable";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import ExportButton from "../../components/ExportButton/ExportButton";
import "./InventoryReport.css";

export default function InventoryReport() {
    // Mock dos filtros
    const [filters, setFilters] = useState({
        tipo: "",
        status: "",
        cor: ""
    });

    // Mock das opções para filtros
    const tipoOptions = [
        { value: "", label: "Todos os tipos" },
        { value: "hatch", label: "Hatch" },
        { value: "sedan", label: "Sedan" },
        { value: "suv", label: "SUV" }
    ];
    const statusOptions = [
        { value: "", label: "Todos os status" },
        { value: "vendido", label: "Vendido" },
        { value: "estoque", label: "Em Estoque" }
    ];
    const corOptions = [
        { value: "", label: "Todas as cores" },
        { value: "preto", label: "Preto" },
        { value: "branco", label: "Branco" },
        { value: "vermelho", label: "Vermelho" }
    ];

    // Colunas da tabela (detalhada)
    const columns = [
        { key: "veiculo", label: "Veículo" },
        { key: "tipo", label: "Tipo" },
        { key: "cor", label: "Cor" },
        { key: "status", label: "Status" }
    ];

    // Dados mock para a tabela
    const data = [
        { veiculo: "ABC1234 - Fiat Uno", tipo: "hatch", cor: "preto", status: "Em Estoque" },
        { veiculo: "XYZ9876 - VW Gol", tipo: "hatch", cor: "branco", status: "Vendido" },
        { veiculo: "DEF5678 - Honda Civic", tipo: "sedan", cor: "vermelho", status: "Em Estoque" }
    ];

    // Quantidade de veículos vendidos e em estoque
    const vendidos = data.filter(v => v.status === "Vendido").length;
    const estoque = data.filter(v => v.status === "Em Estoque").length;

    // Função para atualizar filtros
    function handleFilterChange(key, value) {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    }

    return (
        <div className="inventory-report-page" style={{ padding: 32 }}>
            <h2>Inventário de Veículos</h2>
            <FilterPanel
                filters={[
                    { key: "tipo", label: "Tipo de Veículo", type: "select", options: tipoOptions },
                    { key: "status", label: "Status", type: "select", options: statusOptions },
                    { key: "cor", label: "Cor", type: "select", options: corOptions }
                ]}
                values={filters}
                onChange={handleFilterChange}
            />
            <div className="report-summary-cards" style={{ display: 'flex', gap: 16, margin: '32px 0' }}>
                <ReportSummaryCard title="Veículos em Estoque" value={estoque} />
                <ReportSummaryCard title="Veículos Vendidos" value={vendidos} />
            </div>
            <ExportButton type="excel" />
            <div style={{ marginTop: 32 }}>
                <ReportTable columns={columns} data={data} />
            </div>
        </div>
    );
}