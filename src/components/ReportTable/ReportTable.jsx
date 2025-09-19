import React from "react";
import "./ReportTable.css";

export default function ReportTable({ columns = [], data = [] }) {
    return (
        <div className="report-table-wrapper">
            <table className="report-table">
                <thead>
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx}>{col.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="no-data">
                                Nenhum dado encontrado.
                            </td>
                        </tr>
                    ) : (
                        data.map((row, rIdx) => (
                            <tr key={rIdx}>
                                {columns.map((col, cIdx) => (
                                    <td key={cIdx}>
                                        {col.formatter
                                            ? col.formatter(row[col.key])
                                            : row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}