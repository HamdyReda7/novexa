import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "../../../../hooks/useTranslation";
import { 
    FiGrid, 
    FiLayers, 
    FiBriefcase, 
    FiMail, 
    FiLogOut,
    FiChevronLeft,
    FiChevronRight,
    FiX
} from "react-icons/fi";
import { useAuth } from "../../../../context/AuthContext";
import "./Sidebar.css";

export default function Sidebar({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) {
    const { t, language } = useTranslation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const menuItems = [
        { path: "/dashboard", name: t("dashboard.nav.home"), icon: <FiGrid size={20} />, exact: true },
        { path: "/dashboard/messages", name: t("dashboard.nav.messages"), icon: <FiMail size={20} /> },
        { path: "/dashboard/categories", name: t("dashboard.nav.categories"), icon: <FiLayers size={20} /> },
        { path: "/dashboard/projects", name: t("dashboard.nav.projects"), icon: <FiBriefcase size={20} /> },
    ];

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const isRtl = language === "ar";

    return (
        <aside className={`dashboard-sidebar ${isCollapsed ? "collapsed" : ""} ${isMobileOpen ? "mobile-open" : ""}`} aria-label={t("dashboard.nav.title")}>
            {/* Sidebar Header */}
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <div className="logo-icon">N</div>
                    {!isCollapsed && <span className="logo-text">Novexa Admin</span>}
                </div>
                
                {/* Mobile Close Button */}
                <button 
                    className="mobile-close-btn" 
                    onClick={() => setIsMobileOpen(false)}
                    aria-label={t("navbar.closeMenu")}
                >
                    <FiX size={20} />
                </button>
            </div>

            {/* Menu Items */}
            <nav className="sidebar-nav" aria-label={t("navbar.primaryNavigation")}>
                <ul className="sidebar-menu-list">
                    {menuItems.map((item) => (
                        <li key={item.path} className="sidebar-menu-item">
                            <NavLink
                                to={item.path}
                                end={item.exact}
                                className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                                title={isCollapsed ? item.name : undefined}
                                onClick={() => setIsMobileOpen(false)}
                            >
                                <span className="sidebar-link-icon" aria-hidden="true">{item.icon}</span>
                                {!isCollapsed && <span className="sidebar-link-text">{item.name}</span>}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Sidebar Footer */}
            <div className="sidebar-footer">
                <button 
                    onClick={handleLogout}
                    className="sidebar-link logout-btn"
                    title={isCollapsed ? t("dashboard.nav.logout") : undefined}
                >
                    <span className="sidebar-link-icon" aria-hidden="true"><FiLogOut size={20} /></span>
                    {!isCollapsed && <span className="sidebar-link-text">{t("dashboard.nav.logout")}</span>}
                </button>

                {/* Collapse Toggle for Desktop */}
                <button
                    className="desktop-toggle-btn"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    aria-label={t("dashboard.nav.toggleSidebar")}
                    aria-expanded={!isCollapsed}
                >
                    {isCollapsed ? (
                        isRtl ? <FiChevronLeft size={16} /> : <FiChevronRight size={16} />
                    ) : (
                        isRtl ? <FiChevronRight size={16} /> : <FiChevronLeft size={16} />
                    )}
                </button>
            </div>
        </aside>
    );
}
