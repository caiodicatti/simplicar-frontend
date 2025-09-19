import React from "react";
import './UserModalStatusSwitch.css';

export default function UserModalStatusSwitch({ active, onChange }) {
    return (
        <div className="user-status-switch">
            <label className="switch">
                <input
                    type="checkbox"
                    checked={active}
                    onChange={e => onChange(e.target.checked)}
                />
                <span className="slider"></span>
            </label>
            <span className={`status-label ${active ? "active" : "inactive"}`}>
                {active ? "Ativo" : "Inativo"}
            </span>
        </div>
    );
}