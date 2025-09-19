import React, { useEffect, useState } from "react";
import { getStores, createStore, updateStore } from "../../services/apiMock";
import StoreList from "../../components/StoreList/StoreList";
import StoreModal from "../../components/StoreModal/StoreModal";
import SearchInput from "../../components/SearchInput/SearchInput";
import Pagination from "../../components/Pagination/Pagination";
import { Row, Col } from "react-bootstrap";
import "./StoresPage.css";

const PAGE_SIZE = 5;

export default function StoresPage() {
    const [stores, setStores] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [currentStore, setCurrentStore] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        getStores().then(data => {
            setStores(data);
            setLoading(false);
        });
    }, []);

    function handleCreateStore() {
        setModalOpen(true);
        setModalMode("create");
        setCurrentStore(null);
    }

    function handleEditStore(store) {
        setModalOpen(true);
        setModalMode("edit");
        setCurrentStore(store);
    }

    function handleSaveStore(data) {
        setLoading(true);
        if (modalMode === "create") {
            createStore(data).then(() => {
                setModalOpen(false);
                getStores().then(setStores).finally(() => setLoading(false));
            });
        } else {
            updateStore(currentStore.id, data).then(() => {
                setModalOpen(false);
                getStores().then(setStores).finally(() => setLoading(false));
            });
        }
    }

    function handleCancelModal() {
        setModalOpen(false);
        setCurrentStore(null);
    }

    // Filtragem local
    const filteredStores = stores.filter(store =>
        store.nomeFantasia.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredStores.length / PAGE_SIZE);

    const paginatedStores = filteredStores.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    const handlePageChange = (page) => setCurrentPage(page);

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    return (
        <div className="stores-page-wrapper">
            <div className="stores-page-form p-4">
                <h3 className="text-center mb-4">Lojas</h3>
                <Row className="mb-3 gx-2 gy-2">
                    <Col xs={12} md={9}>
                        <SearchInput
                            value={searchTerm}
                            onChange={handleSearch}
                            onSearch={() => handleSearch(searchTerm)}
                            placeholder="Buscar por nome fantasia..."
                        />
                    </Col>
                    <Col xs={12} md={3}>
                        <button
                            className="btn btn-success w-100 w-md-auto"
                            onClick={handleCreateStore}
                            style={{ whiteSpace: "nowrap" }}
                        >
                            Cadastrar loja
                        </button>
                    </Col>
                </Row>
                {loading ? (
                    <div className="text-center py-4">Carregando...</div>
                ) : (
                    <StoreList stores={paginatedStores} onEdit={handleEditStore} />
                )}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
            <StoreModal
                open={modalOpen}
                mode={modalMode}
                store={currentStore}
                onSave={handleSaveStore}
                onCancel={handleCancelModal}
            />
        </div>
    );
}