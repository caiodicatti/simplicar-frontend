import React from "react";
import "./ExportButton.css";

export default function ExportButton({ type = "excel", onClick }) {
    // Você pode adicionar outros tipos depois (PDF etc)
    const label = type === "excel" ? "Exportar para Excel" : "Exportar";

    return (
        <button className="export-btn" onClick={onClick}>
            {label}
        </button>
    );
}