import { useState, useEffect, useRef, useCallback } from "react";
import { 
    FiMenu, 
    FiX, 
    FiSun, 
    FiMoon, 
    FiGlobe, 
    FiHome, 
    FiGrid, 
    FiBriefcase, 
    FiUser, 
    FiSend 
} from "react-icons/fi";
import useTranslation from "../../hooks/useTranslation";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import NovexaLogo from "../NovexaLogo/NovexaLogo";
import "./Navbar.css";

const NAV_ITEMS = [
    { key: "home", icon: <FiHome /> },
    { key: "services", icon: <FiGrid /> },
    { key: "projects", icon: <FiBriefcase /> },
    { key: "about", icon: <FiUser /> },
    { key: "contact", icon: <FiSend /> },
];

function Navbar() {
    const { t, language } = useTranslation();
    const { toggleLanguage } = useLanguage();
    const { theme, toggleTheme } = useTheme();

    const [isScrolled, setIsScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    const sidebarRef = useRef(null);
    const hamburgerRef = useRef(null);
    const closeButtonRef = useRef(null);

    const isProgrammaticScrollRef = useRef(false);

    const isDarkTheme = theme === "dark";
    const isArabic = language === "ar";

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 12);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const openSidebar = useCallback(() => setIsSidebarOpen(true), []);
    const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

    const handleToggleLanguage = useCallback(() => {
        closeSidebar();
        toggleLanguage();
    }, [toggleLanguage, closeSidebar]);

    useEffect(() => {
        if (!isSidebarOpen) return undefined;
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                closeSidebar();
                hamburgerRef.current?.focus();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [closeSidebar, isSidebarOpen]);

    useEffect(() => {
        if (!isSidebarOpen) return undefined;
        const handlePointerDown = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                closeSidebar();
            }
        };
        document.addEventListener("pointerdown", handlePointerDown);
        return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [closeSidebar, isSidebarOpen]);

    useEffect(() => {
        document.body.style.overflow = isSidebarOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isSidebarOpen]);

    const handleNavClick = useCallback((e, sectionId) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (!element) return;

        const computedStyle = window.getComputedStyle(element);
        const scrollMarginTop = parseInt(computedStyle.scrollMarginTop, 10) || 84;

        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const targetPosition = sectionId === "home" ? 0 : elementPosition - scrollMarginTop;

        if (isSidebarOpen) {
            closeSidebar();
        }

        isProgrammaticScrollRef.current = true;
        setActiveSection(sectionId);

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

        setTimeout(() => {
            isProgrammaticScrollRef.current = false;
        }, 800);
    }, [isSidebarOpen, closeSidebar]);

    useEffect(() => {
        const sections = ["home", "services", "projects", "about", "contact"];
        const visibleSections = {};

        const observerCallback = (entries) => {
            if (isProgrammaticScrollRef.current) return;
            entries.forEach((entry) => {
                visibleSections[entry.target.id] = entry.isIntersecting;
            });
            const active = sections.find((id) => visibleSections[id]);
            if (active) {
                setActiveSection(active);
            }
        };

        const observerOptions = {
            root: null,
            rootMargin: "-84px 0px -40% 0px",
            threshold: 0,
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
                <div className="navbar__container">
                    {/* Logo */}
                    <a href="#home" className="navbar__logo" onClick={(e) => handleNavClick(e, "home")}>
                        <NovexaLogo size={36} />
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="navbar__nav navbar__nav--desktop" aria-label={t("navbar.primaryNavigation")}>
                        <ul className="navbar__links">
                            {NAV_ITEMS.map((item) => (
                                <li key={item.key}>
                                    <a
                                        href={`#${item.key}`}
                                        className={`navbar__link ${activeSection === item.key ? "navbar__link--active" : ""}`}
                                        onClick={(e) => handleNavClick(e, item.key)}
                                    >
                                        {t(`navbar.${item.key}`)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Actions */}
                    <div className="navbar__actions navbar__actions--desktop">
                        <button
                            type="button"
                            className="navbar__icon-btn"
                            onClick={handleToggleLanguage}
                            aria-label={t("navbar.switchLanguage")}
                        >
                            <FiGlobe className="navbar__icon" />
                            <span className="navbar__lang-code">{isArabic ? "EN" : "AR"}</span>
                        </button>

                        <button
                            type="button"
                            className="navbar__icon-btn"
                            onClick={toggleTheme}
                            aria-label={t("navbar.switchTheme")}
                        >
                            {isDarkTheme ? <FiMoon className="navbar__icon" /> : <FiSun className="navbar__icon" />}
                        </button>

                        <a href="#contact" className="navbar__cta" onClick={(e) => handleNavClick(e, "contact")}>
                            {t("navbar.startProject")}
                        </a>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        type="button"
                        ref={hamburgerRef}
                        className={`navbar__hamburger ${isSidebarOpen ? "navbar__hamburger--active" : ""}`}
                        onClick={openSidebar}
                        aria-label={t("navbar.openMenu")}
                    >
                        <FiMenu className="navbar__icon" />
                    </button>
                </div>
            </header>

            {/* Mobile Overlay & Sidebar Drawer */}
            <div
                className={`navbar__overlay ${isSidebarOpen ? "navbar__overlay--visible" : ""}`}
                onClick={closeSidebar}
            />

            <aside
                id="navbar-sidebar"
                ref={sidebarRef}
                className={`navbar__sidebar ${isSidebarOpen ? "navbar__sidebar--open" : ""}`}
            >
                <div className="navbar__sidebar-top">
                    <NovexaLogo size={32} />
                    <button
                        type="button"
                        ref={closeButtonRef}
                        className="navbar__drawer-close-btn"
                        onClick={closeSidebar}
                        aria-label={t("navbar.closeMenu")}
                    >
                        <FiX size={18} />
                    </button>
                </div>

                <nav className="navbar__nav navbar__nav--mobile">
                    <ul className="navbar__links navbar__links--mobile">
                        {NAV_ITEMS.map((item) => (
                            <li key={item.key}>
                                <a
                                    href={`#${item.key}`}
                                    className={`navbar__link navbar__link--mobile ${activeSection === item.key ? "navbar__link--active" : ""}`}
                                    onClick={(e) => handleNavClick(e, item.key)}
                                >
                                    <span className="navbar__mobile-icon">{item.icon}</span>
                                    <span>{t(`navbar.${item.key}`)}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="navbar__sidebar-actions">
                    <div className="navbar__mobile-toggles-grid">
                        <button type="button" className="navbar__mobile-toggle-btn" onClick={handleToggleLanguage}>
                            <FiGlobe className="navbar__icon" />
                            <span>{isArabic ? "English" : "العربية"}</span>
                        </button>
                        <button type="button" className="navbar__mobile-toggle-btn" onClick={toggleTheme}>
                            {isDarkTheme ? <FiMoon className="navbar__icon" /> : <FiSun className="navbar__icon" />}
                            <span>{isDarkTheme ? (isArabic ? "وضع داكن" : "Dark") : (isArabic ? "وضع فاتح" : "Light")}</span>
                        </button>
                    </div>

                    <a href="#contact" className="navbar__cta navbar__cta--mobile" onClick={(e) => handleNavClick(e, "contact")}>
                        {t("navbar.startProject")}
                    </a>
                </div>
            </aside>
        </>
    );
}

export default Navbar;