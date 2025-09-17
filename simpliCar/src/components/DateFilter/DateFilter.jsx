import React from "react";
import "./DateFilter.css";

export default function DateFilter({ startDate, endDate, onChange }) {
    return (
        <div className="date-filter">
            <div className="form-group">
                <label htmlFor="startDate">Data Início:</label>
                <input
                    id="startDate"
                    type="date"
                    value={startDate || ""}
                    onChange={e => onChange(e.target.value, endDate)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="endDate">Data Fim:</label>
                <input
                    id="endDate"
                    type="date"
                    value={endDate || ""}
                    onChange={e => onChange(startDate, e.target.value)}
                />
            </div>
        </div>
    );
}