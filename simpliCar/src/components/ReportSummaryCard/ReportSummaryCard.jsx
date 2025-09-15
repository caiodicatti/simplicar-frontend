import React from "react";
import "./ReportSummaryCard.css";

export default function ReportSummaryCard({ title, value }) {
    return (
        <div className="report-summary-card">
            <span className="report-summary-title">{title}</span>
            <span className="report-summary-value">{value}</span>
        </div>
    );
}