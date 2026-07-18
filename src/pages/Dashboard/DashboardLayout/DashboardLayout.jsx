import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import TopNavbar from "../components/TopNavbar/TopNavbar";
import "./DashboardLayout.css";

export default function DashboardLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <div className={`dashboard-container ${isCollapsed ? "sidebar-collapsed" : ""} ${isMobileOpen ? "sidebar-mobile-open" : ""}`}>
            {/* Mobile Drawer Backdrop */}
            {isMobileOpen && (
                <div 
                    className="dashboard-overlay" 
                    onClick={() => setIsMobileOpen(false)}
                    aria-hidden="true"
                />
            )}
            
            <Sidebar 
                isCollapsed={isCollapsed} 
                setIsCollapsed={setIsCollapsed} 
                isMobileOpen={isMobileOpen} 
                setIsMobileOpen={setIsMobileOpen} 
            />
            
            <div className="dashboard-main-wrapper">
                <TopNavbar 
                    isCollapsed={isCollapsed} 
                    setIsCollapsed={setIsCollapsed} 
                    isMobileOpen={isMobileOpen} 
                    setIsMobileOpen={setIsMobileOpen} 
                />
                
                <main className="dashboard-content-area">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
