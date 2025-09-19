import React, { useEffect, useState } from "react";
import apiMock from '../../services/apiMock';
import util from "../../utils/formatters";
import DateFilter from "../../components/DateFilter/DateFilter";
import ReportSummaryCard from "../../components/ReportSummaryCard/ReportSummaryCard";
import ReportTable from "../../components/ReportTable/ReportTable";
import ExportButton from "../../components/ExportButton/ExportButton";
import "./FinancialReport.css";

function getToday() {
    const today = new Date();
    return today.toISOString().slice(0, 10);
}

function getOneMonthAgo() {
    const today = new Date();
    today.setMonth(today.getMonth() - 1);
    return today.toISOString().slice(0, 10);
}

export default function FinancialReport() {

    const [startDateInput, setStartDateInput] = useState(getOneMonthAgo());
    const [endDateInput, setEndDateInput] = useState(getToday());

    const [startDate, setStartDate] = useState(startDateInput);
    const [endDate, setEndDate] = useState(endDateInput);

    // Dados financeiros
    const [summary, setSummary] = useState({
        totalComprados: 0,
        totalVendidos: 0,
        valorCompras: 0,
        valorVendas: 0,
        valorDespesas: 0,
        lucroBruto: 0,
        listaVeiculos: []
    });

    const lucroBrutoClass =
        summary.lucroBruto >= 0 ? "gross-profit-positive" : "gross-profit-negative";


    useEffect(() => {
        apiMock.getFinancialSummary(startDate, endDate).then(setSummary);
    }, [startDate, endDate]);

    // Exemplo de colunas e dados para tabela
    const columns = [
        { key: "plate", label: "Placa" },
        { key: "brand", label: "Marca" },
        { key: "model", label: "Modelo" },
        { key: "year", label: "Ano" },
        { key: "color", label: "Cor" },
        { key: "purchaseValue", label: "Valor Compra (R$)", formatter: util.formatCurrency },
        { key: "saleValue", label: "Valor Venda (R$)", formatter: util.formatCurrency },
        { key: "sold", label: "Vendido" },
        { key: "dtCreated", label: "Cadastro", formatter: util.formatDate }
    ];

    function handleBuscar() {
        setStartDate(startDateInput);
        setEndDate(endDateInput);
    }

    return (
        <div className="financial-report-page" style={{ padding: 32 }}>
            <h2>Relatório Financeiro</h2>
            <div className="filters-row">
                <DateFilter
                    startDate={startDateInput}
                    endDate={endDateInput}
                    onChange={(start, end) => {
                        setStartDateInput(start);
                        setEndDateInput(end);
                    }}
                />
                <button className="search-btn" onClick={handleBuscar}>
                    Buscar
                </button>
            </div>

            <div className="report-summary-cards" style={{ display: 'flex', gap: 16, margin: '32px 0' }}>
                <ReportSummaryCard title="Veículos Comprados" value={summary.totalComprados} />
                <ReportSummaryCard title="Veículos Vendidos" value={summary.totalVendidos} />
                <ReportSummaryCard title="Total em Compras" value={summary.valorCompras.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                <ReportSummaryCard title="Total em Vendas" value={summary.valorVendas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                <ReportSummaryCard title="Total em Despesas" value={summary.valorDespesas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                <ReportSummaryCard title="Lucro Bruto" value={summary.lucroBruto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} className={lucroBrutoClass} />
            </div>

            <ExportButton
                type="excel"
                columns={columns}
                data={summary.listaVeiculos}
                fileName="relatorio-financeiro.xlsx"
            />

            <div style={{ marginTop: 32 }}>
                <ReportTable columns={columns} data={summary.listaVeiculos} />
            </div>
        </div>
    );
}