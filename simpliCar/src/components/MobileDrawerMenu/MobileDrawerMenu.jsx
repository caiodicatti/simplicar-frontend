import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { FaBars, FaCar, FaMotorcycle, FaHome, FaCog, FaChartBar, FaReceipt, FaClipboardList } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./MobileDrawerMenu.css";

export default function MobileDrawerMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [openAutomoveis, setOpenAutomoveis] = useState(false);
    const [openConfig, setOpenConfig] = useState(false);
    const [openRelatorios, setOpenRelatorios] = useState(false);

    // Detect rota para highlight
    const location = useLocation();

    // Fechar ao clicar em hamburger se aberto
    const handleHamburgerClick = () => setIsOpen(isOpen ? false : true);

    // Fechar ao clicar em link ou fora
    const closeMenu = () => setIsOpen(false);

    // Highlight route
    const isCarros = location.pathname === "/carros";
    const isMotos = location.pathname === "/motos";
    const isHome = location.pathname === "/home";
    const isUsuarios = location.pathname === "/carros";
    const isQualquer = location.pathname === "/motos";

    return (
        <>
            <button
                className="bm-hamburger"
                onClick={handleHamburgerClick}
                aria-label="Abrir menu"
                aria-expanded={isOpen}
            >
                <FaBars size={28} />
            </button>
            <Menu
                right
                isOpen={isOpen}
                onStateChange={({ isOpen }) => setIsOpen(isOpen)}
                customBurgerIcon={false}
                customCrossIcon={false}
                overlayClassName="bm-overlay"
                className="bm-drawer"
                width={"260px"}
            >
                <div className="bm-header">
                    <span className={`bm-main-item${isHome ? " active" : ""}`}>
                        <FaHome />
                        <Link to="/home" onClick={closeMenu}>Página Principal</Link>
                    </span>
                </div>
                <div className={`bm-submenu ${openAutomoveis ? "open" : ""}`}>
                    <button
                        className={`bm-submenu-toggle${openAutomoveis ? " expanded" : ""}`}
                        onClick={() => setOpenAutomoveis(!openAutomoveis)}
                    >
                        <span>Automóveis</span>
                        <span className="bm-arrow">{openAutomoveis ? "▲" : "▼"}</span>
                    </button>
                    {openAutomoveis && (
                        <div className="bm-submenu-items">
                            <Link
                                to="/carros"
                                onClick={closeMenu}
                                className={`bm-submenu-items-link ${isCarros ? "active" : ""}`}
                            >
                                <FaCar style={{ marginRight: 6 }} /> Carros
                            </Link>
                            <Link
                                to="/motos"
                                onClick={closeMenu}
                                className={`bm-submenu-items-link ${isMotos ? "active" : ""}`}
                            >
                                <FaMotorcycle style={{ marginRight: 6 }} /> Motos
                            </Link>
                        </div>
                    )}
                </div>

                <div className={`bm-submenu ${openRelatorios ? "open" : ""}`}>
                    <button
                        className={`bm-submenu-toggle${openRelatorios ? " expanded" : ""}`}
                        onClick={() => setOpenRelatorios(!openRelatorios)}
                    >
                        <span>Relatórios</span>
                        <span className="bm-arrow">{openRelatorios ? "▲" : "▼"}</span>
                    </button>
                    {openRelatorios && (
                        <div className="bm-submenu-items">
                            <Link
                                to="/relatorio-financeiro"
                                onClick={closeMenu}
                                className="bm-submenu-items-link"
                            >
                                <FaChartBar style={{ marginRight: 6 }} /> Resultado Financeiro
                            </Link>
                            <Link
                                to="/relatorio-despesa-veiculo"
                                onClick={closeMenu}
                                className="bm-submenu-items-link"
                            >
                                <FaReceipt style={{ marginRight: 6 }} /> Despesas por Veículo
                            </Link>
                            <Link
                                to="/relatorio-inventario"
                                onClick={closeMenu}
                                className="bm-submenu-items-link"
                            >
                                <FaClipboardList style={{ marginRight: 6 }} /> Inventário de Veículos
                            </Link>
                        </div>
                    )}
                </div>

                <div className={`bm-submenu ${openConfig ? "open" : ""}`}>
                    <button
                        className={`bm-submenu-toggle${openConfig ? " expanded" : ""}`}
                        onClick={() => setOpenConfig(!openConfig)}
                    >
                        <span>Configurações</span>
                        <span className="bm-arrow">{openConfig ? "▲" : "▼"}</span>
                    </button>
                    {openConfig && (
                        <div className="bm-submenu-items">
                            <Link
                                to="/carros"
                                onClick={closeMenu}
                                className={`bm-submenu-items-link ${isUsuarios ? "active" : ""}`}
                            >
                                <FaCog style={{ marginRight: 6 }} /> Usuários
                            </Link>
                            <Link
                                to="/motos"
                                onClick={closeMenu}
                                className={`bm-submenu-items-link ${isQualquer ? "active" : ""}`}
                            >
                                <FaMotorcycle style={{ marginRight: 6 }} /> Qualquer coisa
                            </Link>
                        </div>
                    )}
                </div>
            </Menu>
        </>
    );
}