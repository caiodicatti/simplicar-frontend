import React from "react";
import { FaUserEdit, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import './UserList.css';

export default function UserList({ users, onEdit }) {
    return (
        <div className="userlist-table-wrapper">
            <table className="table userlist-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th className="userlist-hide-mobile">Login</th>
                        <th className="userlist-hide-mobile">Permissão</th>
                        <th>Ativo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td className="userlist-hide-mobile">{user.login}</td>
                                <td className="userlist-hide-mobile">{user.roleLabel || user.role}</td>
                                <td>
                                    {user.active ? (
                                        <FaCheckCircle color="#22c55e" title="Ativo" />
                                    ) : (
                                        <FaTimesCircle color="#e22" title="Desativado" />
                                    )}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-outline-primary"
                                        title="Editar usuário"
                                        onClick={() => onEdit(user)}
                                    >
                                        <FaUserEdit />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center">
                                Nenhum usuário encontrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}