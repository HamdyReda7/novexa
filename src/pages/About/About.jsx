import React from "react";
import { FiCheckCircle, FiShield, FiCpu, FiAward, FiZap } from "react-icons/fi";
import useTranslation from "../../hooks/useTranslation";
import logoNav from "../../assets/images/logo_nav.png";
import "./About.css";

function About() {
    const { t } = useTranslation();

    return (
        <section className="about" id="about">
            <div className="about__container">
                {/* Section Header */}
                <div className="about__header text-center">
                    <span className="about__badge">{t("about.badge")}</span>
                    <h2 className="about__title">{t("about.title")}</h2>
                    <p className="about__description">{t("about.description")}</p>
                </div>

                {/* Main Grid */}
                <div className="about__grid">
                    {/* Brand Showcase Card */}
                    <div className="about__brand-card">
                        <div className="about__brand-glow-effect" />
                        
                        <div className="about__brand-logo-wrapper">
                            <img src={logoNav} alt="Novexa Brand Logo" className="about__brand-logo-img" />
                        </div>

                        <div className="about__brand-tagline">
                            <span className="tagline-pill">CODE • INNOVATE • ELEVATE</span>
                        </div>

                        <p className="about__brand-quote">
                            "التميز في Novexa - تطوير البرمجيات وبناء حلول ذكية ومبتكرة تساعد عملك على النمو والتطور."
                        </p>

                        <div className="about__features-grid">
                            <div className="about__feature-item">
                                <div className="about__feature-icon">
                                    <FiCheckCircle />
                                </div>
                                <span>{t("about.features.tech")}</span>
                            </div>
                            <div className="about__feature-item">
                                <div className="about__feature-icon">
                                    <FiCheckCircle />
                                </div>
                                <span>{t("about.features.code")}</span>
                            </div>
                            <div className="about__feature-item">
                                <div className="about__feature-icon">
                                    <FiCheckCircle />
                                </div>
                                <span>{t("about.features.security")}</span>
                            </div>
                            <div className="about__feature-item">
                                <div className="about__feature-icon">
                                    <FiCheckCircle />
                                </div>
                                <span>{t("about.features.support")}</span>
                            </div>
                        </div>
                    </div>

                    {/* Info Pillars Stack */}
                    <div className="about__pillars-stack">
                        {/* Mission */}
                        <div className="about__pillar-card">
                            <div className="about__pillar-icon-box">
                                <FiAward className="about__pillar-icon" />
                            </div>
                            <div className="about__pillar-content">
                                <h3 className="about__pillar-title">{t("about.mission.title")}</h3>
                                <p className="about__pillar-text">{t("about.mission.text")}</p>
                            </div>
                        </div>

                        {/* Vision */}
                        <div className="about__pillar-card">
                            <div className="about__pillar-icon-box">
                                <FiCpu className="about__pillar-icon" />
                            </div>
                            <div className="about__pillar-content">
                                <h3 className="about__pillar-title">{t("about.vision.title")}</h3>
                                <p className="about__pillar-text">{t("about.vision.text")}</p>
                            </div>
                        </div>

                        {/* Why Choose Us */}
                        <div className="about__pillar-card">
                            <div className="about__pillar-icon-box">
                                <FiShield className="about__pillar-icon" />
                            </div>
                            <div className="about__pillar-content">
                                <h3 className="about__pillar-title">{t("about.whyUs.title")}</h3>
                                <p className="about__pillar-text">{t("about.whyUs.text")}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="about__stats-grid">
                    <div className="about__stat-card">
                        <span className="about__stat-number">50+</span>
                        <span className="about__stat-label">{t("about.stats.projects.label")}</span>
                    </div>
                    <div className="about__stat-card">
                        <span className="about__stat-number">30+</span>
                        <span className="about__stat-label">{t("about.stats.clients.label")}</span>
                    </div>
                    <div className="about__stat-card">
                        <span className="about__stat-number">5+</span>
                        <span className="about__stat-label">{t("about.stats.years.label")}</span>
                    </div>
                    <div className="about__stat-card">
                        <span className="about__stat-number">24/7</span>
                        <span className="about__stat-label">{t("about.stats.support.label")}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;