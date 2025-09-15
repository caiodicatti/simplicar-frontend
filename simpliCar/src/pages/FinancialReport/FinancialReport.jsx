import React from "react";
import DateFilter from "../../components/DateFilter/DateFilter";
import ReportSummaryCard from "../../components/ReportSummaryCard/ReportSummaryCard";
import ReportTable from "../../components/ReportTable/ReportTable";
import ExportButton from "../../components/ExportButton/ExportButton";
import "./FinancialReport.css";

export default function FinancialReport() {
    // Exemplo de states iniciais para filtros, dados, etc.
    // Você vai depois conectar com seu mock/api/backend

    // Exemplo de colunas e dados para tabela
    const columns = [
        { key: "descricao", label: "Descrição" },
        { key: "tipo", label: "Tipo" },
        { key: "valor", label: "Valor (R$)" },
        { key: "data", label: "Data" }
    ];
    const data = [
        // Exemplo vazio; insira seus dados aqui
    ];

    return (
        <div className="financial-report-page" style={{ padding: 32 }}>
            <h2>Relatório Financeiro</h2>
            <DateFilter />
            <div className="report-summary-cards" style={{ display: 'flex', gap: 16, margin: '32px 0' }}>
                <ReportSummaryCard title="Total Compras" value={0} />
                <ReportSummaryCard title="Total Vendas" value={0} />
                <ReportSummaryCard title="Total Despesas" value={0} />
                <ReportSummaryCard title="Lucro Total" value={0} />
            </div>
            <ExportButton type="excel" />
            <div style={{ marginTop: 32 }}>
                <ReportTable columns={columns} data={data} />
            </div>
        </div>
    );
}