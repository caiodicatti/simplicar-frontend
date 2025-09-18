import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaUserTie, FaUserShield, FaUser } from "react-icons/fa";
import './PermissionDescriptionBox.css';

const roleIcons = {
    admin: <FaUserShield className="role-icon admin" />,
    manager: <FaUserTie className="role-icon manager" />,
    operator: <FaUser className="role-icon operator" />
};

export default function PermissionDescriptionBox({ roles = [], highlightRole }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="permission-box vehicleform-form p-4 mb-4">
            <button
                className="permission-toggle-row"
                type="button"
                onClick={() => setOpen(!open)}
            >
                <span className={open ? "permission-open-tip" : "permission-closed-tip"}>
                    {open
                        ? "Veja abaixo o que cada nível de acesso permite:"
                        : "Veja o que cada nível de acesso permite"}
                </span>
                {open
                    ? <FaChevronUp size={18} className="chevron-icon" />
                    : <FaChevronDown size={18} className="chevron-icon" />}
            </button>
            {open && (
                <div className="permission-list">
                    {roles.map(r => (
                        <div
                            key={r.key}
                            className={`permission-card mb-3${highlightRole === r.key ? " permission-highlight" : ""}`}
                        >
                            <div className="d-flex align-items-center mb-1">
                                {roleIcons[r.key]}
                                <span className={`permission-label ms-2 ${r.key}`}>{r.label}</span>
                            </div>
                            <ul className="permission-details mb-0">
                                {r.details.map((desc, idx) => (
                                    <li key={idx}>
                                        <span className="checkmark">✔</span> {desc}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}