import React, { useCallback } from "react";
import { FiArrowUpRight, FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook } from "react-icons/fi";
import useTranslation from "../../hooks/useTranslation";
import NovexaLogo from "../NovexaLogo/NovexaLogo";
import "./Footer.css";

function Footer() {
    const { t } = useTranslation();

    const handleNavClick = useCallback((e, sectionId) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (!element) return;

        const computedStyle = window.getComputedStyle(element);
        const scrollMarginTop = parseInt(computedStyle.scrollMarginTop, 10) || 84;

        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const targetPosition = sectionId === "home" ? 0 : elementPosition - scrollMarginTop;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });
    }, []);

    return (
        <footer className="footer">
            {/* Top CTA Banner */}
            <div className="footer__cta-banner">
                <div className="footer__container">
                    <div className="footer__cta-card">
                        <div className="footer__cta-content">
                            <span className="footer__cta-badge">{t("footer.cta.title")}</span>
                            <h2 className="footer__cta-heading">{t("footer.cta.description")}</h2>
                        </div>
                        <a href="#contact" className="footer__cta-btn" onClick={(e) => handleNavClick(e, "contact")}>
                            <span>{t("footer.cta.button")}</span>
                            <FiArrowUpRight className="footer__btn-icon" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Footer Links */}
            <div className="footer__main">
                <div className="footer__container">
                    <div className="footer__grid">
                        {/* Brand Column */}
                        <div className="footer__col footer__col--brand">
                            <NovexaLogo size={36} />
                            <p className="footer__brand-tagline">
                                {t("footer.tagline")}
                            </p>
                            <p className="footer__description">
                                {t("footer.description")}
                            </p>
                            <div className="footer__socials">
                                <a href="https://www.facebook.com/novexaCode" target="_blank" rel="noreferrer" className="footer__social-btn" aria-label="Facebook">
                                    <FiFacebook />
                                </a>
                                <a href="https://www.instagram.com/novexacode/" target="_blank" rel="noreferrer" className="footer__social-btn" aria-label="Instagram">
                                    <FiInstagram />
                                </a>
                            </div>
                        </div>

                        {/* Navigation Column */}
                        <div className="footer__col">
                            <h3 className="footer__col-title">{t("footer.navigation.title")}</h3>
                            <ul className="footer__links">
                                <li><a href="#home" onClick={(e) => handleNavClick(e, "home")}>{t("footer.navigation.home")}</a></li>
                                <li><a href="#services" onClick={(e) => handleNavClick(e, "services")}>{t("footer.navigation.services")}</a></li>
                                <li><a href="#projects" onClick={(e) => handleNavClick(e, "projects")}>{t("footer.navigation.projects")}</a></li>
                                <li><a href="#about" onClick={(e) => handleNavClick(e, "about")}>{t("footer.navigation.about")}</a></li>
                                <li><a href="#contact" onClick={(e) => handleNavClick(e, "contact")}>{t("footer.navigation.contact")}</a></li>
                            </ul>
                        </div>

                        {/* Solutions Column */}
                        <div className="footer__col">
                            <h3 className="footer__col-title">{t("footer.solutions.title")}</h3>
                            <ul className="footer__links">
                                <li><a href="#services" onClick={(e) => handleNavClick(e, "services")}>{t("footer.solutions.websites")}</a></li>
                                <li><a href="#services" onClick={(e) => handleNavClick(e, "services")}>{t("footer.solutions.webApps")}</a></li>
                                <li><a href="#services" onClick={(e) => handleNavClick(e, "services")}>{t("footer.solutions.frontend")}</a></li>
                                <li><a href="#services" onClick={(e) => handleNavClick(e, "services")}>{t("footer.solutions.backend")}</a></li>
                                <li><a href="#services" onClick={(e) => handleNavClick(e, "services")}>{t("footer.solutions.api")}</a></li>
                            </ul>
                        </div>

                        {/* Contact Info Column */}
                        <div className="footer__col">
                            <h3 className="footer__col-title">{t("footer.contact.title")}</h3>
                            <ul className="footer__contact-list">
                                <li>
                                    <FiMail className="footer__contact-icon" />
                                    <a href="mailto:info@novexacode.com">info@novexacode.com</a>
                                </li>
                                <li>
                                    <FiPhone className="footer__contact-icon" />
                                    <a href="tel:+201036874108">+20 103 687 4108</a>
                                </li>
                                <li>
                                    <FiMapPin className="footer__contact-icon" />
                                    <span>{t("footer.contact.location")}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer__bottom">
                <div className="footer__container footer__bottom-container">
                    <p className="footer__copyright">{t("footer.bottom.copyright")}</p>
                    {/* <div className="footer__bottom-links">
                        <a href="/login" className="footer__admin-link">{t("footer.bottom.adminPortal")}</a>
                        <span>•</span>
                        <a href="#privacy">{t("footer.bottom.privacy")}</a>
                        <span>•</span>
                        <a href="#terms">{t("footer.bottom.terms")}</a>
                    </div> */}
                </div>
            </div>
        </footer>
    );
}

export default Footer;