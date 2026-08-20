import React, { useCallback } from "react";
import useTranslation from "../../hooks/useTranslation";
import { FiArrowRight, FiArrowLeft, FiZap, FiCode, FiTrendingUp, FiCheckCircle } from "react-icons/fi";
import NovexaLogo, { NovexaIcon } from "../../components/NovexaLogo/NovexaLogo";
import "./Header.css";

function Header() {
    const { t, language } = useTranslation();
    const isArabic = language === "ar";

    const handleNavClick = useCallback((e, sectionId) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (!element) return;

        const computedStyle = window.getComputedStyle(element);
        const scrollMarginTop = parseInt(computedStyle.scrollMarginTop, 10) || 84;

        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const targetPosition = elementPosition - scrollMarginTop;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });
    }, []);

    return (
        <section className="hero" id="home">
            <div className="hero__glow-bg" />
            <div className="hero__container">
                {/* Hero Left Content */}
                <div className="hero__content">
                    <div className="hero__badge">
                        <span className="hero__badge-dot" />
                        <span className="hero__badge-text">{t("hero.badge")}</span>
                    </div>

                    <h1 className="hero__title">
                        {t("hero.titleLine1")} <br />
                        <span className="hero__title-accent">{t("hero.titleLine2")}</span> <br />
                        {t("hero.titleLine3")}
                    </h1>

                    <p className="hero__description">
                        {t("hero.description")}
                    </p>

                    <div className="hero__actions">
                        <a
                            href="#contact"
                            onClick={(e) => handleNavClick(e, "contact")}
                            className="hero__btn hero__btn--primary"
                        >
                            <span>{t("hero.ctaStart")}</span>
                            <FiZap className="hero__btn-icon" />
                        </a>

                        <a
                            href="#projects"
                            onClick={(e) => handleNavClick(e, "projects")}
                            className="hero__btn hero__btn--secondary"
                        >
                            <span>{t("hero.ctaLearn")}</span>
                            {isArabic ? <FiArrowLeft className="hero__btn-icon" /> : <FiArrowRight className="hero__btn-icon" />}
                        </a>
                    </div>

                    {/* Stats Strip */}
                    <div className="hero__stats-strip">
                        <div className="hero__stat-item">
                            <span className="hero__stat-num">50+</span>
                            <span className="hero__stat-lbl">{t("hero.stats.projects")}</span>
                        </div>
                        <div className="hero__stat-divider" />
                        <div className="hero__stat-item">
                            <span className="hero__stat-num">30+</span>
                            <span className="hero__stat-lbl">{t("hero.stats.clients")}</span>
                        </div>
                        <div className="hero__stat-divider" />
                        <div className="hero__stat-item">
                            <span className="hero__stat-num">5+</span>
                            <span className="hero__stat-lbl">{t("hero.stats.years")}</span>
                        </div>
                        <div className="hero__stat-divider" />
                        <div className="hero__stat-item">
                            <span className="hero__stat-num">24/7</span>
                            <span className="hero__stat-lbl">{t("hero.stats.support")}</span>
                        </div>
                    </div>
                </div>

                {/* Hero Right Visual Stack */}
                <div className="hero__visual">
                    <div className="hero__card-stack">
                        {/* Main Enterprise Window Card */}
                        <div className="hero__window-card">
                            <div className="hero__window-header">
                                <div className="hero__window-dots">
                                    <span className="dot dot--red" />
                                    <span className="dot dot--yellow" />
                                    <span className="dot dot--green" />
                                </div>
                                <div className="hero__window-title">
                                    <NovexaLogo size={22} variant="horizontal" />
                                </div>
                                <span className="hero__window-status">
                                    <span className="status-live-dot" /> Live
                                </span>
                            </div>

                            <div className="hero__window-body">
                                <div className="hero__preview-grid">
                                    <div className="hero__preview-card">
                                        <div className="hero__preview-icon hero__preview-icon--blue">
                                            <FiCode />
                                        </div>
                                        <div className="hero__preview-info">
                                            <span className="hero__preview-label">API Gateway</span>
                                            <span className="hero__preview-val">99.99% Uptime</span>
                                        </div>
                                    </div>
                                    <div className="hero__preview-card">
                                        <div className="hero__preview-icon hero__preview-icon--green">
                                            <FiTrendingUp />
                                        </div>
                                        <div className="hero__preview-info">
                                            <span className="hero__preview-label">Performance</span>
                                            <span className="hero__preview-val">+148% Speed</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Code / Analytics Graphic (Enforce LTR) */}
                                <div className="hero__code-box">
                                    <div className="hero__code-line">
                                        <span className="code-kw">import</span> &#123; NovexaEngine &#125; <span className="code-kw">from</span> <span className="code-str">'@novexa/core'</span>;
                                    </div>
                                    <div className="hero__code-line">
                                        <span className="code-kw">const</span> app = <span className="code-fn">createApplication</span>(&#123;
                                    </div>
                                    <div className="hero__code-line indent">
                                        scale: <span className="code-str">'enterprise'</span>, speed: <span className="code-num">100</span>
                                    </div>
                                    <div className="hero__code-line">
                                        &#125;);
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge Card 1 */}
                        <div className="hero__float-badge hero__float-badge--top">
                            <NovexaIcon size={28} />
                            <div>
                                <strong style={{ fontSize: '0.85rem', display: 'block' }}>Novexa Cloud</strong>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Enterprise Ready</span>
                            </div>
                        </div>

                        {/* Floating Badge Card 2 */}
                        <div className="hero__float-badge hero__float-badge--bottom">
                            <FiCheckCircle style={{ color: '#10B981', fontSize: '1.4rem' }} />
                            <div>
                                <strong style={{ fontSize: '0.85rem', display: 'block' }}>Custom Software</strong>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>100% Quality</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Header;
