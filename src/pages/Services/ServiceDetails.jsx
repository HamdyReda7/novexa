import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
    FiArrowLeft, 
    FiArrowRight, 
    FiCheckCircle, 
    FiCode, 
    FiSmartphone, 
    FiMonitor, 
    FiCloud, 
    FiShield, 
    FiTrendingUp, 
    FiChevronDown, 
    FiMessageSquare, 
    FiZap, 
    FiLayers,
    FiCheck,
    FiChevronRight,
    FiBriefcase
} from "react-icons/fi";
import useTranslation from "../../hooks/useTranslation";
import SEO from "../../components/SEO/SEO";
import "./ServiceDetails.css";

const SERVICE_ICONS = {
    webDev: <FiCode />,
    mobileApps: <FiSmartphone />,
    uiux: <FiMonitor />,
    backend: <FiCloud />,
    ecommerce: <FiShield />,
    ai: <FiTrendingUp />,
};

const ALL_SERVICES_KEYS = ["webDev", "mobileApps", "uiux", "backend", "ecommerce", "ai"];

function ServiceDetails() {
    const { serviceId } = useParams();
    const { t, language } = useTranslation();
    const navigate = useNavigate();
    const isArabic = language === "ar";

    const [openFaq, setOpenFaq] = useState(null);

    // Get current service details from translations
    const currentKey = ALL_SERVICES_KEYS.includes(serviceId) ? serviceId : "webDev";
    const details = t(`services.details.${currentKey}`);
    const pageLabels = t("services.page");
    const summary = t(`services.items.${currentKey}`);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    if (!details || typeof details === "string") {
        return (
            <div className="service-details__not-found">
                <div className="container text-center py-5">
                    <h2>Service Not Found</h2>
                    <p>The service article you are looking for does not exist.</p>
                    <Link to="/" className="btn btn-primary">
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    const otherServicesKeys = ALL_SERVICES_KEYS.filter((k) => k !== currentKey);

    return (
        <div className="service-details-page">
            <SEO pageKey="home" />

            {/* Breadcrumb Navigation */}
            <div className="service-details__breadcrumb">
                <div className="service-details__container">
                    <div className="breadcrumb__list">
                        <Link to="/" className="breadcrumb__item">
                            {pageLabels?.homeLink || (isArabic ? "الرئيسية" : "Home")}
                        </Link>
                        <span className="breadcrumb__separator">
                            {isArabic ? <FiChevronRight /> : <FiChevronRight />}
                        </span>
                        <a href="/#services" className="breadcrumb__item">
                            {pageLabels?.servicesLink || (isArabic ? "الخدمات" : "Services")}
                        </a>
                        <span className="breadcrumb__separator">
                            {isArabic ? <FiChevronRight /> : <FiChevronRight />}
                        </span>
                        <span className="breadcrumb__item breadcrumb__item--active">
                            {summary?.title || details.title}
                        </span>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <section className="service-details__hero">
                <div className="service-details__hero-backdrop"></div>
                <div className="service-details__container">
                    <div className="service-details__hero-content">
                        <div className="service-details__hero-badge">
                            <span className="hero-badge__icon">{SERVICE_ICONS[currentKey]}</span>
                            <span>{details.badge}</span>
                        </div>
                        <h1 className="service-details__hero-title">{details.title}</h1>
                        <p className="service-details__hero-tagline">{details.tagline}</p>
                        <p className="service-details__hero-desc">{details.heroDescription}</p>

                        <div className="service-details__hero-actions">
                            <a href="#contact-service" className="service-details__btn service-details__btn--primary">
                                <span>{pageLabels?.ctaButton || (isArabic ? "احجز استشارة فنية" : "Schedule a Consultation")}</span>
                                {isArabic ? <FiArrowLeft /> : <FiArrowRight />}
                            </a>
                            <Link to="/#services" className="service-details__btn service-details__btn--secondary">
                                <span>{pageLabels?.backToServices || (isArabic ? "العودة لجميع الخدمات" : "Back to Services")}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Stats Bar */}
            {details.stats && details.stats.length > 0 && (
                <section className="service-details__stats">
                    <div className="service-details__container">
                        <div className="stats-grid">
                            {details.stats.map((stat, idx) => (
                                <div key={idx} className="stat-card">
                                    <div className="stat-card__number">{stat.number}</div>
                                    <div className="stat-card__label">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Main Content & Sidebar Layout */}
            <section className="service-details__main">
                <div className="service-details__container">
                    <div className="service-details__grid">
                        {/* Article Main Body */}
                        <div className="service-details__content">
                            {/* Overview */}
                            {details.overview && (
                                <div className="article-block article-block--overview">
                                    <h2 className="article-block__heading">{details.overview.heading}</h2>
                                    {details.overview.paragraphs && details.overview.paragraphs.map((p, idx) => (
                                        <p key={idx} className="article-block__text">{p}</p>
                                    ))}
                                </div>
                            )}

                            {/* Key Deliverables Highlight Box */}
                            {details.deliverables && details.deliverables.length > 0 && (
                                <div className="article-block article-block--deliverables">
                                    <h3 className="deliverables__title">
                                        <FiCheckCircle className="deliverables__icon" />
                                        <span>{pageLabels?.deliverablesTitle || (isArabic ? "أبرز مخرجات الخدمة" : "Key Deliverables")}</span>
                                    </h3>
                                    <ul className="deliverables__list">
                                        {details.deliverables.map((item, idx) => (
                                            <li key={idx} className="deliverables__item">
                                                <FiCheck className="deliverables__check" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Benefits */}
                            {details.benefits && details.benefits.length > 0 && (
                                <div className="article-block article-block--benefits">
                                    <h3 className="article-block__section-title">
                                        <FiZap className="section-title__icon" />
                                        <span>{pageLabels?.benefitsTitle || (isArabic ? "لماذا تختار Novexa لهذا الخدمة؟" : "Key Benefits")}</span>
                                    </h3>
                                    <div className="benefits-grid">
                                        {details.benefits.map((benefit, idx) => (
                                            <div key={idx} className="benefit-card">
                                                <div className="benefit-card__icon-wrapper">
                                                    <FiCheckCircle />
                                                </div>
                                                <h4 className="benefit-card__title">{benefit.title}</h4>
                                                <p className="benefit-card__desc">{benefit.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tech Stack */}
                            {details.techStack && details.techStack.length > 0 && (
                                <div className="article-block article-block--tech">
                                    <h3 className="article-block__section-title">
                                        <FiLayers className="section-title__icon" />
                                        <span>{pageLabels?.techStackTitle || (isArabic ? "التقنيات وأطر العمل" : "Technologies & Frameworks")}</span>
                                    </h3>
                                    <div className="tech-tags">
                                        {details.techStack.map((tech, idx) => (
                                            <span key={idx} className="tech-tag">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Process Timeline */}
                            {details.process && details.process.length > 0 && (
                                <div className="article-block article-block--process">
                                    <h3 className="article-block__section-title">
                                        <FiBriefcase className="section-title__icon" />
                                        <span>{pageLabels?.processTitle || (isArabic ? "كيف ننفذ هذه الخدمة؟" : "Our Process")}</span>
                                    </h3>
                                    <div className="process-timeline">
                                        {details.process.map((step, idx) => (
                                            <div key={idx} className="process-step">
                                                <div className="process-step__number">{step.step}</div>
                                                <div className="process-step__content">
                                                    <h4 className="process-step__title">{step.title}</h4>
                                                    <p className="process-step__desc">{step.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* FAQs */}
                            {details.faqs && details.faqs.length > 0 && (
                                <div className="article-block article-block--faq">
                                    <h3 className="article-block__section-title">
                                        <FiMessageSquare className="section-title__icon" />
                                        <span>{pageLabels?.faqTitle || (isArabic ? "الأسئلة الشائعة" : "Frequently Asked Questions")}</span>
                                    </h3>
                                    <div className="faq-list">
                                        {details.faqs.map((faq, idx) => {
                                            const isOpen = openFaq === idx;
                                            return (
                                                <div key={idx} className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
                                                    <button 
                                                        type="button" 
                                                        className="faq-item__question"
                                                        onClick={() => toggleFaq(idx)}
                                                    >
                                                        <span>{faq.question}</span>
                                                        <FiChevronDown className={`faq-item__arrow ${isOpen ? "faq-item__arrow--rotated" : ""}`} />
                                                    </button>
                                                    {isOpen && (
                                                        <div className="faq-item__answer">
                                                            <p>{faq.answer}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <aside className="service-details__sidebar">
                            {/* Contact Box */}
                            <div className="sidebar-card sidebar-card--contact" id="contact-service">
                                <span className="sidebar-card__badge">
                                    {pageLabels?.contactBadge || (isArabic ? "تواصل معنا" : "Get Started")}
                                </span>
                                <h3 className="sidebar-card__title">
                                    {pageLabels?.estimateTitle || (isArabic ? "هل تحب بدء مشروعك الآن؟" : "Ready to Start?")}
                                </h3>
                                <p className="sidebar-card__desc">
                                    {pageLabels?.estimateDesc || (isArabic ? "تحدث مع مهندسينا للحصول على استشارة واستكشاف الحلول." : "Consult with our tech team for tailored estimates.")}
                                </p>
                                <a href="/#contact" className="service-details__btn service-details__btn--full">
                                    <span>{pageLabels?.ctaButton || (isArabic ? "تواصل مع المبيعات" : "Contact Sales")}</span>
                                    {isArabic ? <FiArrowLeft /> : <FiArrowRight />}
                                </a>
                            </div>

                            {/* Other Services Navigation */}
                            <div className="sidebar-card sidebar-card--services">
                                <h4 className="sidebar-card__heading">
                                    {pageLabels?.otherServicesTitle || (isArabic ? "خدماتنا الأخرى" : "Other Services")}
                                </h4>
                                <ul className="sidebar-services__list">
                                    {otherServicesKeys.map((key) => {
                                        const otherTitle = t(`services.items.${key}.title`);
                                        return (
                                            <li key={key}>
                                                <Link to={`/services/${key}`} className="sidebar-services__link">
                                                    <span className="sidebar-services__icon">{SERVICE_ICONS[key]}</span>
                                                    <span className="sidebar-services__name">{otherTitle}</span>
                                                    {isArabic ? <FiArrowLeft className="sidebar-services__arrow" /> : <FiArrowRight className="sidebar-services__arrow" />}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* Bottom CTA Banner */}
            <section className="service-details__bottom-cta">
                <div className="service-details__container">
                    <div className="bottom-cta__card">
                        <div className="bottom-cta__content">
                            <h2 className="bottom-cta__title">
                                {pageLabels?.readyTitle || (isArabic ? "هل أنت جاهز للنمو مع " : "Ready to Transform Your Business with ")}
                                <span className="text-highlight">{summary?.title || details.title}?</span>
                            </h2>
                            <p className="bottom-cta__desc">
                                {pageLabels?.readyDesc || (isArabic ? "تواصل معنا اليوم لبناء حل مخصص يضاعف أداء أعمالك." : "Get in touch today to engineer a high-impact solution.")}
                            </p>
                        </div>
                        <div className="bottom-cta__action">
                            <a href="/#contact" className="service-details__btn service-details__btn--primary service-details__btn--lg">
                                <span>{pageLabels?.ctaButton || (isArabic ? "احجز استشارة فنية" : "Schedule Consultation")}</span>
                                {isArabic ? <FiArrowLeft /> : <FiArrowRight />}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ServiceDetails;
