import React from "react";
import "./NoAccess.css"

export default function NoAccess() {
    return (
        <div style={{ textAlign: "center", marginTop: "80px" }}>
            <h2>Acesso negado</h2>
            <p>Você não tem permissão para acessar esta página.</p>
        </div>
    );
}