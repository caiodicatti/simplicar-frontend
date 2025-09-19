import React from "react";
import * as XLSX from "xlsx";
import "./ExportButton.css";

export default function ExportButton({
    type = "excel",
    columns = [],
    data = [],
    fileName
}) {
    // Define label e nome do arquivo padrão
    const label =
        type === "excel"
            ? "Exportar para Excel"
            : type === "csv"
                ? "Exportar para CSV"
                : "Exportar";

    const defaultFileName =
        type === "excel" ? "relatorio.xlsx" : type === "csv" ? "relatorio.csv" : "relatorio.txt";

    function handleExport() {
        // Monta os dados para exportação (aplica formatter se existir)
        const exportData = data.map(row =>
            columns.map(col =>
                col.formatter ? col.formatter(row[col.key]) : row[col.key]
            )
        );
        const header = columns.map(col => col.label);

        if (type === "excel") {
            const ws = XLSX.utils.aoa_to_sheet([header, ...exportData]);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Relatório");
            XLSX.writeFile(wb, fileName || defaultFileName);

        } else if (type === "csv") {
            const ws = XLSX.utils.aoa_to_sheet([header, ...exportData]);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Relatório");
            XLSX.writeFile(wb, fileName || defaultFileName, { bookType: "csv" });

        } else {
            alert("Tipo de exportação não suportado!");
        }
    }

    return (
        <button className="export-btn" onClick={handleExport}>
            {label}
        </button>
    );
}