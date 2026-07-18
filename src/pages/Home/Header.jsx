import { useCallback } from "react";
import useTranslation from "../../hooks/useTranslation";
import { FiTrendingUp, FiUsers, FiTarget, FiArrowUpRight, FiZap } from "react-icons/fi";
import "./Header.css";

function Header() {
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
        const targetPosition = elementPosition - scrollMarginTop;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });
    }, []);

    return (
        <section className="hero" id="home">
            <div className="hero__container">
                <div className="hero__content">
                    <div className="hero__badge">
                        <span className="hero__badge-pulse" />
                        <span className="hero__badge-text">{t("hero.badge")}</span>
                    </div>

                    <h1 className="hero__title">
                        {t("hero.title")}
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
                            <span className="hero__btn-text">{t("hero.ctaStart")}</span>
                            <FiZap className="hero__btn-icon" />
                        </a>
                        
                        <a 
                            href="#projects" 
                            onClick={(e) => handleNavClick(e, "projects")} 
                            className="hero__btn hero__btn--secondary"
                        >
                            <span className="hero__btn-text">{t("hero.ctaLearn")}</span>
                            <FiArrowUpRight className="hero__btn-icon" />
                        </a>
                    </div>
                </div>

                <div className="hero__visual">
                    <div className="dashboard-mock">
                        <div className="dashboard-mock__header">
                            <div className="dashboard-mock__dots">
                                <span className="dot dot--red" />
                                <span className="dot dot--yellow" />
                                <span className="dot dot--green" />
                            </div>
                            <div className="dashboard-mock__title">{t("hero.terminalTitle")}</div>
                        </div>

                        <div className="dashboard-mock__body">
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <div className="stat-card__icon-wrapper">
                                        <FiTrendingUp className="stat-card__icon text-success" />
                                    </div>
                                    <div className="stat-card__info">
                                        <span className="stat-card__label">{t("hero.statRevenue")}</span>
                                        <span className="stat-card__value">{t("hero.statRevenueValue")}</span>
                                    </div>
                                    <span className="stat-card__badge stat-card__badge--success">{t("hero.statRevenueBadge")}</span>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-card__icon-wrapper">
                                        <FiUsers className="stat-card__icon text-primary" />
                                    </div>
                                    <div className="stat-card__info">
                                        <span className="stat-card__label">{t("hero.statUsers")}</span>
                                        <span className="stat-card__value">{t("hero.statUsersValue")}</span>
                                    </div>
                                    <span className="stat-card__badge stat-card__badge--primary">{t("hero.statUsersBadge")}</span>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-card__icon-wrapper">
                                        <FiTarget className="stat-card__icon text-warning" />
                                    </div>
                                    <div className="stat-card__info">
                                        <span className="stat-card__label">{t("hero.statConversion")}</span>
                                        <span className="stat-card__value">{t("hero.statConversionValue")}</span>
                                    </div>
                                    <span className="stat-card__badge stat-card__badge--warning">{t("hero.statConversionBadge")}</span>
                                </div>
                            </div>

                            <div className="chart-mock">
                                <div className="chart-mock__bar-wrapper">
                                    <div className="chart-mock__bar" style={{ "--height": "40%" }} />
                                    <div className="chart-mock__bar" style={{ "--height": "65%" }} />
                                    <div className="chart-mock__bar chart-mock__bar--highlighted" style={{ "--height": "85%" }} />
                                    <div className="chart-mock__bar" style={{ "--height": "50%" }} />
                                    <div className="chart-mock__bar" style={{ "--height": "75%" }} />
                                    <div className="chart-mock__bar chart-mock__bar--highlighted" style={{ "--height": "95%" }} />
                                    <div className="chart-mock__bar" style={{ "--height": "60%" }} />
                                </div>
                                <div className="chart-mock__grid">
                                    <div className="chart-mock__grid-line" />
                                    <div className="chart-mock__grid-line" />
                                    <div className="chart-mock__grid-line" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Header;
