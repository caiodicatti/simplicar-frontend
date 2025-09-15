import React from "react";
import "./DateFilter.css";

export default function DateFilter({ startDate, endDate, onChange }) {

    return (
        <div className="date-filter">
            <label>
                Data Início:
                <input
                    type="date"
                    value={startDate || ""}
                    onChange={e => onChange(e.target.value, endDate)}
                />
            </label>
            <label>
                Data Fim:
                <input
                    type="date"
                    value={endDate || ""}
                    onChange={e => onChange(startDate, e.target.value)}
                />
            </label>
        </div>
    );
}