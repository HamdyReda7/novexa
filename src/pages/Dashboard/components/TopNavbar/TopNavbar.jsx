import { useLocation } from "react-router-dom";
import { useTheme } from "../../../../context/ThemeContext";
import { useLanguage } from "../../../../context/LanguageContext";
import { useTranslation } from "../../../../hooks/useTranslation";
import { useAuth } from "../../../../context/AuthContext";
import { resolveImageUrl } from "../../../../services/api";
import { 
    FiMenu, 
    FiGlobe, 
    FiSun, 
    FiMoon 
} from "react-icons/fi";
import "./TopNavbar.css";

export default function TopNavbar({ isMobileOpen, setIsMobileOpen }) {
    const { t } = useTranslation();
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const { language, toggleLanguage } = useLanguage();
    const { user } = useAuth();

    const getPageTitle = (pathname) => {
        if (pathname === "/dashboard") return t("dashboard.nav.home");
        if (pathname.startsWith("/dashboard/categories")) return t("dashboard.nav.categories");
        if (pathname.startsWith("/dashboard/projects")) return t("dashboard.nav.projects");
        if (pathname.startsWith("/dashboard/messages")) return t("dashboard.nav.messages");
        return t("dashboard.nav.title");
    };

    return (
        <header className="dashboard-navbar">
            <div className="navbar-left">
                {/* Mobile Drawer Trigger */}
                <button 
                    className="mobile-toggle-burger" 
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    aria-label={t("navbar.openMenu")}
                    aria-expanded={isMobileOpen}
                >
                    <FiMenu size={22} />
                </button>

                <h1 className="navbar-page-title">{getPageTitle(location.pathname)}</h1>
            </div>

            <div className="navbar-right">
                <div className="navbar-actions">
                    {/* Language Switch */}
                    <button 
                        className="navbar-action-btn" 
                        onClick={toggleLanguage}
                        title={t("navbar.switchLanguage")}
                        aria-label={t("navbar.switchLanguage")}
                    >
                        <FiGlobe size={20} />
                        <span className="lang-code">{language.toUpperCase()}</span>
                    </button>

                    {/* Theme Toggle */}
                    <button 
                        className="navbar-action-btn" 
                        onClick={toggleTheme}
                        title={t("navbar.switchTheme")}
                        aria-label={t("navbar.switchTheme")}
                    >
                        {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
                    </button>

                    {/* Static User Profile Card */}
                    <div className="profile-container">
                        {user && user.image ? (
                            <img src={resolveImageUrl(user.image)} alt={user.name} className="profile-avatar-img" />
                        ) : (
                            <div className="profile-avatar">{user ? user.name.charAt(0).toUpperCase() : "?"}</div>
                        )}
                        <div className="profile-details-text">
                            <span className="profile-name">{user ? user.name : "Guest"}</span>
                            {/* <span className="profile-role">{user ? user.role : "Guest"}</span> */}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
