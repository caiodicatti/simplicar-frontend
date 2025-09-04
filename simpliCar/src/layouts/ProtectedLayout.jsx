import React from "react";
import SidebarMenu from "../components/SidebarMenu/SidebarMenu";

export default function ProtectedLayout({ children }) {
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <SidebarMenu />
            <div style={{ flex: 1, padding: "20px" }}>
                {children}
            </div>
        </div>
    );
}
