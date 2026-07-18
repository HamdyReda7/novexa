import "./Footer.css";
import { Link } from "react-router-dom";
import { useCallback } from "react";
import useTranslation from "../../hooks/useTranslation";

import {
    FiFacebook,
    FiInstagram,
    FiMail,
    FiPhone,
    FiMapPin,
    FiShield,
} from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";

import logo from "../../assets/images/logo_nav.png";

function Footer() {
    const { t } = useTranslation();

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

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });
    }, []);

    const navigation = [
        { key: "home", id: "home" },
        { key: "services", id: "services" },
        { key: "projects", id: "projects" },
        { key: "about", id: "about" },
        { key: "contact", id: "contact" },
    ];

    const socials = [
        {
            icon: <FiFacebook />,
            href: "https://www.facebook.com/novexaCode/",
            label: "Facebook",
        },
        {
            icon: <FiInstagram />,
            href: "https://www.instagram.com/novexacode/",
            label: "Instagram",
        },
        {
            icon: <FaTiktok />,
            href: "https://www.tiktok.com/@novexacodee",
            label: "TikTok",
        },
    ];

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">

                    {/* ================= Column 1: Company ================= */}
                    <div
                        className="footer-company"
                        data-aos="fade-up"
                    >
                        <div className="footer-logo">
                            <img src={logo} alt="NOVEXA" />
                            <h2>NOVEXA</h2>
                        </div>
                        <p>
                            {t("footer.description")}
                        </p>
                    </div>

                    {/* ================= Column 2: Quick Links ================= */}
                    <div
                        className="footer-links"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        <h4>{t("footer.navigation.title")}</h4>
                        <ul>
                            {navigation.map((item) => (
                                <li key={item.key}>
                                    <a
                                        href={`#${item.id}`}
                                        onClick={(e) => handleNavClick(e, item.id)}
                                        className="footer-nav-link"
                                    >
                                        {t(`navbar.${item.key}`)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ================= Column 3: Contact Info ================= */}
                    <div
                        className="footer-links footer-links--contact"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <h4>{t("footer.contact.title")}</h4>
                        <ul>
                            <li>
                                <a href={`mailto:${t("footer.contact.email")}`} className="footer-contact-link">
                                    <FiMail className="footer-contact-icon" />
                                    <span>{t("footer.contact.email")}</span>
                                </a>
                            </li>
                            <li>
                                <a href={`tel:${t("footer.contact.phone")}`} className="footer-contact-link">
                                    <FiPhone className="footer-contact-icon" />
                                    <span>{t("footer.contact.phone")}</span>
                                </a>
                            </li>
                            <li>
                                <div className="footer-contact-item">
                                    <FiMapPin className="footer-contact-icon" />
                                    <span>{t("footer.contact.location")}</span>
                                </div>
                            </li>
                        </ul>

                        {/* Admin Portal Button */}
                        {/* <Link 
                            to="/login" 
                            className="footer-admin-btn" 
                            aria-label={t("footer.bottom.adminPortal")}
                        >
                            <FiShield className="footer-admin-btn-icon" />
                            <span>{t("footer.bottom.adminPortal")}</span>
                        </Link> */}
                    </div>

                    {/* ================= Column 4: Social Media ================= */}
                    <div
                        className="footer-links footer-links--social"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        <h4>{t("footer.social.title")}</h4>
                        <div className="footer-social-links">
                            {socials.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="footer-social-btn"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

                {/* ================= Divider ================= */}
                <hr className="footer-divider" />

                {/* ================= Bottom ================= */}
                <div className="footer-bottom">
                    <p>
                        {t("footer.bottom.copyright")}
                    </p>
                    {/* <div className="footer-bottom-links">
                        <Link to="#">
                            {t("footer.bottom.privacy")}
                        </Link>
                        <Link to="#">
                            {t("footer.bottom.terms")}
                        </Link>
                        <Link to="#">
                            {t("footer.bottom.cookies")}
                        </Link>
                    </div> */}
                </div>

            </div>
        </footer>
    );
}

export default Footer;