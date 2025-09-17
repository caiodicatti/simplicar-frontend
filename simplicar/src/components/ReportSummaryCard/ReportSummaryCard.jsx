import React from "react";
import "./ReportSummaryCard.css";

export default function ReportSummaryCard({ title, value, className = "" }) {
    return (
        <div className={`report-summary-card ${className}`}>
            <span className="report-summary-title">{title}</span>
            <span className="report-summary-value">{value}</span>
        </div>
    );
}