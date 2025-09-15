import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FaCar, FaMotorcycle, FaBars, FaCog, FaHome, FaChartBar, FaReceipt, FaClipboardList } from "react-icons/fa";
import "./SidebarMenu.css";

export default function SidebarMenu() {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <Sidebar
            collapsed={collapsed}
            width="270px"
            collapsedWidth="60px"
            className="pro-sidebar"
        >
            <Menu iconShape="circle">
                <MenuItem
                    icon={<FaBars />}
                    onClick={() => setCollapsed(!collapsed)}
                    className="menu-toggle"
                >
                    {collapsed ? "" : "Menu"}
                </MenuItem>

                {!collapsed && (
                    <MenuItem
                        icon={<FaHome />}
                        className="menu-home"
                        component={<Link to="/home" />}
                        style={{
                            fontSize: "17px",
                            borderBottom: "1px solid rgba(0,0,0,0.13)"
                        }}
                    >
                        Página Principal
                    </MenuItem>
                )}

                {!collapsed && (
                    <SubMenu
                        label="Automóveis"
                        style={{
                            fontSize: "17px",
                            borderBottom: "1px solid rgba(0, 0, 0, 0.13)"
                        }}
                    >
                        <MenuItem icon={<FaCar />} className="pro-menu-item" component={<Link to="/carros" />}>
                            Carros
                        </MenuItem>
                        <MenuItem icon={<FaMotorcycle />} className="pro-menu-item" component={<Link to="/motos" />}>
                            Motos
                        </MenuItem>
                    </SubMenu>
                )}

                {!collapsed && (
                    <SubMenu
                        label="Relatórios"
                        style={{
                            fontSize: "17px",
                            borderBottom: "1px solid rgba(0, 0, 0, 0.13)"
                        }}
                    >
                        <MenuItem icon={<FaChartBar />} className="pro-menu-item" component={<Link to="/relatorio-financeiro" />}>
                            Resultado Financeiro
                        </MenuItem>
                        <MenuItem icon={<FaReceipt />} className="pro-menu-item" component={<Link to="/relatorio-despesa-veiculo" />}>
                            Despesas por Veículo
                        </MenuItem>
                        <MenuItem icon={<FaClipboardList />} className="pro-menu-item" component={<Link to="/relatorio-inventario" />}>
                            Inventário de Veículos
                        </MenuItem>
                    </SubMenu>
                )}

                {!collapsed && (
                    <SubMenu
                        label="Configurações"
                        style={{
                            fontSize: "17px",
                            borderBottom: "1px solid rgba(0, 0, 0, 0.13)"
                        }}
                    >
                        <MenuItem icon={<FaCog />} className="pro-menu-item" component={<Link to="/carros" />}>
                            Usuários
                        </MenuItem>
                        <MenuItem icon={<FaMotorcycle />} className="pro-menu-item" component={<Link to="/motos" />}>
                            Qualquer coisa
                        </MenuItem>
                    </SubMenu>
                )}

                {/* Adicione mais menus/submenus aqui */}
            </Menu>
        </Sidebar>
    );
}
