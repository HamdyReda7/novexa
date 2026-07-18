import { useState, useEffect, useRef, useCallback } from "react";
import { FiMenu, FiX, FiSun, FiMoon, FiGlobe } from "react-icons/fi";
import useTranslation from "../../hooks/useTranslation";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import logo from "../../assets/images/logo_nav.png";
import "./Navbar.css";

const NAV_ITEMS = [
    { key: "home" },
    { key: "services" },
    { key: "projects" },
    { key: "about" },
    { key: "contact" },
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
    const animationFrameRef = useRef(null);
    const cancelListenersRef = useRef(null);

    const isDarkTheme = theme === "dark";
    const isArabic = language === "ar";

    // ---- Sticky navbar on scroll ----
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 8);

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const openSidebar = useCallback(() => setIsSidebarOpen(true), []);
    const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

    // Language switch always closes the sidebar first — no flash, no re-open.
    const handleToggleLanguage = useCallback(() => {
        closeSidebar();
        toggleLanguage();
    }, [toggleLanguage, closeSidebar]);

    // ---- Escape key closes sidebar ----
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

    // ---- Click outside sidebar closes it ----
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

    // ---- Lock body scroll while sidebar is open ----
    useEffect(() => {
        document.body.style.overflow = isSidebarOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isSidebarOpen]);

    // ---- Move focus into the sidebar when it opens ----
    useEffect(() => {
        if (isSidebarOpen) {
            closeButtonRef.current?.focus();
        }
    }, [isSidebarOpen]);

    // ---- Custom Snappy Linear Constant-Speed Scroll ----
    const animateScroll = useCallback((targetPosition, callback) => {
        const startPosition = window.scrollY || window.pageYOffset;
        const distance = targetPosition - startPosition;
        
        if (Math.abs(distance) < 2) {
            window.scrollTo(0, targetPosition);
            if (callback) callback();
            return;
        }

        // Snap speed: 5.5 pixels per millisecond (extremely snappy)
        // const speed = 5.5;
        const speed = 20;
        const duration = Math.max(Math.abs(distance) / speed, 1);

        const startTime = performance.now();

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        if (cancelListenersRef.current) {
            cancelListenersRef.current();
        }

        const cancelScrollAnimation = () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
            isProgrammaticScrollRef.current = false;
            removeCancelListeners();
        };

        const removeCancelListeners = () => {
            window.removeEventListener("wheel", cancelScrollAnimation);
            window.removeEventListener("touchmove", cancelScrollAnimation);
            window.removeEventListener("keydown", cancelScrollAnimation);
            window.removeEventListener("mousedown", cancelScrollAnimation);
        };

        cancelListenersRef.current = removeCancelListeners;

        window.addEventListener("wheel", cancelScrollAnimation, { passive: true });
        window.addEventListener("touchmove", cancelScrollAnimation, { passive: true });
        window.addEventListener("keydown", cancelScrollAnimation, { passive: true });
        window.addEventListener("mousedown", cancelScrollAnimation, { passive: true });

        const animation = (currentTime) => {
            const timeElapsed = currentTime - startTime;
            const run = Math.min(Math.max(timeElapsed, 0) / duration, 1); // True Linear (no easing, no acceleration)
            
            window.scrollTo(0, startPosition + distance * run);
            
            if (timeElapsed < duration) {
                animationFrameRef.current = requestAnimationFrame(animation);
            } else {
                window.scrollTo(0, targetPosition);
                animationFrameRef.current = null;
                removeCancelListeners();
                if (callback) callback();
            }
        };

        animationFrameRef.current = requestAnimationFrame(animation);
    }, []);

    const startProgrammaticScroll = useCallback((targetPosition, sectionId) => {
        isProgrammaticScrollRef.current = true;
        setActiveSection(sectionId);

        animateScroll(targetPosition, () => {
            isProgrammaticScrollRef.current = false;
        });
    }, [animateScroll]);

    const handleNavClick = useCallback((e, sectionId) => {
        e.preventDefault();

        const element = document.getElementById(sectionId);
        if (!element) return;

        // Read scroll-margin-top dynamically from computed styles
        const computedStyle = window.getComputedStyle(element);
        const scrollMarginTop = parseInt(computedStyle.scrollMarginTop, 10) || 0;

        // Calculate target scroll position respecting scroll-margin-top
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const targetPosition = sectionId === "home" ? 0 : elementPosition - scrollMarginTop;

        // Parallel execution: close mobile menu and start scroll immediately
        if (isSidebarOpen) {
            closeSidebar();
        }
        
        startProgrammaticScroll(targetPosition, sectionId);
    }, [isSidebarOpen, closeSidebar, startProgrammaticScroll]);

    // ---- IntersectionObserver scrollspy active section spy ----
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
            rootMargin: "-82px 0px -55% 0px",
            threshold: 0,
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        // Fallback checks for boundaries
        const handleScrollSpy = () => {
            if (isProgrammaticScrollRef.current) return;

            const scrollY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

            if (scrollY < 50) {
                setActiveSection("home");
            } else if (scrollY >= maxScroll - 10) {
                setActiveSection("contact");
            }
        };

        window.addEventListener("scroll", handleScrollSpy, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScrollSpy);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (cancelListenersRef.current) {
                cancelListenersRef.current();
            }
        };
    }, []);

    return (
        <>
        <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
            <div className="navbar__container">
                {/* Logo */}
                <a href="#home" className="navbar__logo" onClick={(e) => handleNavClick(e, "home")}>
                    <img src={logo} alt={t("navbar.logoAlt")} className="navbar__logo-img" />
                </a>

                {/* Desktop navigation */}
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

                {/* Desktop actions */}
                <div className="navbar__actions navbar__actions--desktop">
                    <button
                        type="button"
                        className="navbar__icon-btn navbar__icon-btn--lang"
                        onClick={handleToggleLanguage}
                        aria-label={t("navbar.switchLanguage")}
                    >
                        <FiGlobe className="navbar__icon" aria-hidden="true" />
                        <span className="navbar__lang-code">{isArabic ? "EN" : "AR"}</span>
                    </button>

                    <button
                        type="button"
                        className="navbar__icon-btn navbar__icon-btn--theme"
                        onClick={toggleTheme}
                        aria-label={t("navbar.switchTheme")}
                    >
                        <span className={`navbar__theme-icon ${isDarkTheme ? "navbar__theme-icon--dark" : ""}`}>
                            {isDarkTheme ? (
                                <FiMoon className="navbar__icon" aria-hidden="true" />
                            ) : (
                                <FiSun className="navbar__icon" aria-hidden="true" />
                            )}
                        </span>
                    </button>

                    <a href="#contact" className="navbar__cta" onClick={(e) => handleNavClick(e, "contact")}>
                        {t("navbar.startProject")}
                    </a>
                </div>

                {/* Hamburger (mobile/tablet) */}
                <button
                    type="button"
                    ref={hamburgerRef}
                    className={`navbar__hamburger ${isSidebarOpen ? "navbar__hamburger--active" : ""}`}
                    onClick={openSidebar}
                    aria-label={t("navbar.openMenu")}
                    aria-expanded={isSidebarOpen}
                    aria-controls="navbar-sidebar"
                >
                    <FiMenu className="navbar__icon navbar__hamburger-icon" aria-hidden="true" />
                </button>
            </div>
        </header>

        {/* Overlay */}
        <div
            className={`navbar__overlay ${isSidebarOpen ? "navbar__overlay--visible" : ""}`}
            aria-hidden="true"
            onClick={closeSidebar}
        />

        {/* Sidebar */}
        <aside
            id="navbar-sidebar"
            ref={sidebarRef}
            className={`navbar__sidebar ${isSidebarOpen ? "navbar__sidebar--open" : ""}`}
            aria-hidden={!isSidebarOpen}
            role="dialog"
            aria-modal={isSidebarOpen}
        >
            <div className="navbar__sidebar-top">
                <img src={logo} alt={t("navbar.logoAlt")} className="navbar__logo-img" />
                <button
                    type="button"
                    ref={closeButtonRef}
                    className="navbar__icon-btn navbar__icon-btn--close"
                    onClick={closeSidebar}
                    aria-label={t("navbar.closeMenu")}
                >
                    <FiX className="navbar__icon" aria-hidden="true" />
                </button>
            </div>

            <nav className="navbar__nav navbar__nav--mobile" aria-label={t("navbar.primaryNavigation")}>
                <ul className="navbar__links navbar__links--mobile">
                    {NAV_ITEMS.map((item, index) => (
                        <li
                            key={item.key}
                            className="navbar__sidebar-item"
                            style={{ "--item-index": index }}
                        >
                            <a
                                href={`#${item.key}`}
                                className={`navbar__link navbar__link--mobile ${activeSection === item.key ? "navbar__link--active" : ""}`}
                                onClick={(e) => handleNavClick(e, item.key)}
                            >
                                {t(`navbar.${item.key}`)}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="navbar__sidebar-divider" />

            <div className="navbar__actions navbar__actions--mobile">
                <button
                    type="button"
                    className="navbar__icon-btn navbar__icon-btn--lang"
                    onClick={handleToggleLanguage}
                    aria-label={t("navbar.switchLanguage")}
                >
                    <FiGlobe className="navbar__icon" aria-hidden="true" />
                    <span className="navbar__lang-code">{isArabic ? "EN" : "AR"}</span>
                </button>

                <button
                    type="button"
                    className="navbar__icon-btn navbar__icon-btn--theme"
                    onClick={toggleTheme}
                    aria-label={t("navbar.switchTheme")}
                >
                    <span className={`navbar__theme-icon ${isDarkTheme ? "navbar__theme-icon--dark" : ""}`}>
                        {isDarkTheme ? (
                            <FiMoon className="navbar__icon" aria-hidden="true" />
                        ) : (
                            <FiSun className="navbar__icon" aria-hidden="true" />
                        )}
                    </span>
                </button>

                <a
                    href="#contact"
                    className="navbar__cta navbar__cta--mobile"
                    onClick={(e) => handleNavClick(e, "contact")}
                >
                    {t("navbar.startProject")}
                </a>
            </div>
        </aside>
        </>
    );
}

export default Navbar;