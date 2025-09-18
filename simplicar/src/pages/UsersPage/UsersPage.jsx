import React, { useEffect, useState } from "react";
import apiMock from "../../services/apiMock";
import UserList from "../../components/UserList/UserList";
import UserModal from "../../components/UserModal/UserModal";
import PermissionDescriptionBox from "../../components/PermissionDescriptionBox/PermissionDescriptionBox";
import SearchInput from "../../components/SearchInput/SearchInput";
import Pagination from '../../components/Pagination/Pagination';
import "./UsersPage.css";

const PAGE_SIZE = 2;

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    // Busca roles
    useEffect(() => {
        apiMock.getRoles().then(setRoles);
    }, []);

    // Busca usuários
    useEffect(() => {
        setLoading(true);
        apiMock.getUsers().then(data => {
            // Enriquecer com label da role
            const usersWithRoleLabel = data.map(u => ({
                ...u,
                roleLabel: roles.find(r => r.key === u.role)?.label || u.role
            }));
            setUsers(usersWithRoleLabel);
            setLoading(false);
        });
    }, [roles]);

    // Abrir modal de cadastro
    function handleCreateUser() {
        setModalOpen(true);
        setModalMode("create");
        setCurrentUser(null);
    }

    // Abrir modal de edição
    function handleEditUser(user) {
        setModalOpen(true);
        setModalMode("edit");
        setCurrentUser(user);
    }

    // Salvar usuário (cadastro ou edição)
    function handleSaveUser(data) {
        setLoading(true);
        if (modalMode === "create") {
            apiMock.createUser(data).then(() => {
                setModalOpen(false);
                // Atualiza lista
                apiMock.getUsers().then(setUsers).finally(() => setLoading(false));
            });
        } else {
            apiMock.updateUser(currentUser.id, data).then(() => {
                setModalOpen(false);
                // Atualiza lista
                apiMock.getUsers().then(setUsers).finally(() => setLoading(false));
            });
        }
    }

    // Ativar/desativar usuário
    function handleToggleActive(active) {
        apiMock.toggleUserActive(currentUser.id, active).then(() => {
            setCurrentUser({ ...currentUser, active });
            // Atualiza lista
            apiMock.getUsers().then(setUsers);
        });
    }

    // Fechar modal
    function handleCancelModal() {
        setModalOpen(false);
        setCurrentUser(null);
    }

    // Filtragem local
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.login.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);

    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    const handlePageChange = (page) => setCurrentPage(page);

    // Busca local: reseta para página 1 ao buscar
    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    return (
        <div className="users-page-wrapper">
            <div className="users-page-form p-4">
                <h3 className="text-center mb-4">Usuários do sistema</h3>
                <div className="d-flex align-items-center gap-2 mb-3">
                    <SearchInput
                        value={searchTerm}
                        onChange={handleSearch}
                        onSearch={() => handleSearch(searchTerm)}
                        placeholder="Buscar por nome ou login..."
                    />
                    <button
                        className="btn btn-success"
                        onClick={handleCreateUser}
                        style={{ whiteSpace: "nowrap" }}
                    >
                        Cadastrar usuário
                    </button>
                </div>
                <PermissionDescriptionBox roles={roles} />
                {loading ? (
                    <div className="text-center py-4">Carregando...</div>
                ) : (
                    <UserList users={paginatedUsers} onEdit={handleEditUser} />
                )}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
            <UserModal
                open={modalOpen}
                mode={modalMode}
                user={currentUser}
                roles={roles}
                onSave={handleSaveUser}
                onCancel={handleCancelModal}
                onToggleActive={handleToggleActive}
            />
        </div>
    );
}