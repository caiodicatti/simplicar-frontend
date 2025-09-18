import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { FaBars, FaCar, FaMotorcycle, FaHome, FaCog, FaChartBar, FaReceipt, FaClipboardList, FaCalendarAlt, FaUser, FaUsers, FaPalette, FaKey } from "react-icons/fa";
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
    const isFinanceiro = location.pathname === "/relatorio-financeiro";
    const isDespVeiculo = location.pathname === "/relatorio-despesa-veiculo";
    const isDespPeriodo = location.pathname === "/relatorio-despesa-periodo";
    const isInventario = location.pathname === "/relatorio-inventario";
    const isPerfil = location.pathname === "/configuracoes/perfil";
    const isUsuarios = location.pathname === "/configuracoes/usuarios";
    const isPreferencias = location.pathname === "/configuracoes/preferencias";
    const isSenha = location.pathname === "/configuracoes/senha";

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
                                to="/configuracoes/perfil"
                                onClick={closeMenu}
                                className={`bm-submenu-items-link ${isPerfil ? "active" : ""}`}
                            >
                                <FaUser style={{ marginRight: 6 }} /> Perfil
                            </Link>
                            <Link
                                to="/configuracoes/usuarios"
                                onClick={closeMenu}
                                className={`bm-submenu-items-link ${isUsuarios ? "active" : ""}`}
                            >
                                <FaUsers style={{ marginRight: 6 }} /> Usuários
                            </Link>
                            <Link
                                to="/configuracoes/preferencias"
                                onClick={closeMenu}
                                className={`bm-submenu-items-link ${isPreferencias ? "active" : ""}`}
                            >
                                <FaPalette style={{ marginRight: 6 }} /> Preferências
                            </Link>
                            <Link
                                to="/configuracoes/senha"
                                onClick={closeMenu}
                                className={`bm-submenu-items-link ${isSenha ? "active" : ""}`}
                            >
                                <FaKey style={{ marginRight: 6 }} /> Alterar Senha
                            </Link>
                        </div>
                    )}
                </div>
            </Menu>
        </>
    );
}