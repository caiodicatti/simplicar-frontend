import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { FaBars, FaCar, FaMotorcycle, FaHome, FaCog, FaChartBar, FaReceipt, FaClipboardList, FaCalendarAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./MobileDrawerMenu.css";

export default function MobileDrawerMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [openAutomoveis, setOpenAutomoveis] = useState(false);
    const [openConfig, setOpenConfig] = useState(false);
    const [openRelatorios, setOpenRelatorios] = useState(false);

    const location = useLocation();

    const handleHamburgerClick = () => setIsOpen(isOpen ? false : true);

    const closeMenu = () => setIsOpen(false);

    const isCarros = location.pathname === "/carros";
    const isMotos = location.pathname === "/motos";
    const isHome = location.pathname === "/home";
    const isUsuarios = location.pathname === "/carros";
    const isQualquer = location.pathname === "/motos";
    const isFinanceiro = location.pathname === "/relatorio-financeiro";
    const isDespVeiculo = location.pathname === "/relatorio-despesa-veiculo";
    const isDespPeriodo = location.pathname === "/relatorio-despesa-periodo";
    const isInventario = location.pathname === "/relatorio-inventario";

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
                                className={`bm-submenu-items-link ${isFinanceiro ? "active" : ""}`}
                            >
                                <FaChartBar style={{ marginRight: 6 }} /> Resultado Financeiro
                            </Link>
                            <Link
                                to="/relatorio-despesa-veiculo"
                                onClick={closeMenu}
                                className={`bm-submenu-items-link ${isDespVeiculo ? "active" : ""}`}
                            >
                                <FaReceipt style={{ marginRight: 6 }} /> Despesas por Veículo
                            </Link>
                            <Link
                                to="/relatorio-despesa-periodo"
                                onClick={closeMenu}
                                className={`bm-submenu-items-link ${isDespPeriodo ? "active" : ""}`}
                            >
                                <FaCalendarAlt style={{ marginRight: 6 }} /> Despesas por Período
                            </Link>
                            <Link
                                to="/relatorio-inventario"
                                onClick={closeMenu}
                                className={`bm-submenu-items-link ${isInventario ? "active" : ""}`}
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