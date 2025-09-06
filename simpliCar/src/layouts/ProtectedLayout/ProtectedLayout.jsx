import React from "react";
import SidebarMenu from "../../components/SidebarMenu/SidebarMenu";
import "./ProtectedLayout.css";

export default function ProtectedLayout({ children }) {
    return (
        <div className="protected-layout">
            <SidebarMenu />
            <div className="protected-layout-content">
                {children}
            </div>
        </div>
    );
}
