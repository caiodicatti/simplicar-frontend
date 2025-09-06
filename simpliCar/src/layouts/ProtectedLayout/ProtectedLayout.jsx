import React, { useEffect, useState } from "react";
import SidebarMenu from "../../components/SidebarMenu/SidebarMenu";
import MobileDrawerMenu from "../../components/MobileDrawerMenu/MobileDrawerMenu";
import "./ProtectedLayout.css";

export default function ProtectedLayout({ children }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 600);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="protected-layout">
            {isMobile ? <MobileDrawerMenu /> : <SidebarMenu />}
            <div className="protected-layout-content">{children}</div>
        </div>
    );
}