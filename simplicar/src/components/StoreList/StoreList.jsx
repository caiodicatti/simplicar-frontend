import React from "react";
import { formatDate } from "../../utils/formatters";
import { FaEdit } from "react-icons/fa";
import './StoreList.css';

const situacaoBadgeMap = {
    "Ativo": "success",
    "Bloqueado": "danger",
    "Inadimplente": "warning",
    "Em teste": "secondary"
};

export default function StoreList({ stores, onEdit }) {
    return (
        <div className="storelist-table-wrapper">
            <table className="table storelist-table align-middle">
                <thead>
                    <tr>
                        <th>Nome Fantasia</th>
                        <th className="storelist-hide-mobile">Situação</th>
                        <th className="storelist-hide-mobile">Ativo até</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {stores && stores.length > 0 ? (
                        stores.map(store => (
                            <tr key={store.id}>
                                <td>{store.nomeFantasia}</td>
                                <td className="storelist-hide-mobile">
                                    <span className={`badge bg-${situacaoBadgeMap[store.situacao] || "secondary"}`}>
                                        {store.situacao}
                                    </span>
                                </td>
                                <td className="storelist-hide-mobile">
                                    {formatDate(store.ativoAte)}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-outline-primary"
                                        title="Editar loja"
                                        style={{ padding: "6px 10px", lineHeight: 1 }}
                                        onClick={() => onEdit(store)}
                                    >
                                        <FaEdit size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center">
                                Nenhuma loja encontrada.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}