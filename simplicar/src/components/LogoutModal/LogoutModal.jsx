import React from "react";
import "./LogoutModal.css";

export default function LogoutModal({ open, onCancel, onConfirm }) {
    if (!open) return null;
    return (
        <div className="bm-modal-overlay">
            <div className="bm-modal">
                <p>Tem certeza que deseja sair?</p>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 14 }}>
                    <button className="btn btn-secondary" onClick={onCancel}>
                        Cancelar
                    </button>
                    <button className="btn btn-danger" onClick={onConfirm}>
                        Sair
                    </button>
                </div>
            </div>
        </div>
    );
}