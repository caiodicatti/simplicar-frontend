import React from "react";
import "./FilterPanel.css";

export default function FilterPanel({ filters = [], values = {}, onChange }) {
    return (
        <div className="filter-panel">
            {filters.map((filter, idx) => (
                <div key={idx} className="filter-panel-item">
                    <label htmlFor={filter.key}>{filter.label}</label>
                    {filter.type === "select" ? (
                        <select
                            id={filter.key}
                            value={values[filter.key] || ""}
                            onChange={e => onChange(filter.key, e.target.value)}
                        >
                            <option value="">Selecione</option>
                            {filter.options.map(opt => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            id={filter.key}
                            type={filter.type || "text"}
                            value={values[filter.key] || ""}
                            onChange={e => onChange(filter.key, e.target.value)}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}