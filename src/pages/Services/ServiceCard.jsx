import React from "react";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import useTranslation from "../../hooks/useTranslation";
import translations from "../../locales/translations";

export default function ServiceCard({ itemKey, icon: Icon, index }) {
    const { language, t } = useTranslation();
    
    // Get translations directly for array support
    const currentLangObj = translations[language] || translations.en;
    const itemData = currentLangObj.services?.items?.[itemKey] || {};
    const title = itemData.title || "";
    const description = itemData.description || "";
    const features = Array.isArray(itemData.features) ? itemData.features : [];

    const ctaText = t("services.cta") || "Learn More";

    return (
        <article 
            className="services-card" 
            data-aos="fade-up" 
            data-aos-delay={index * 80}
        >
            {/* Icon Container */}
            <div className="services-card__icon-box">
                <Icon className="services-card__icon" />
            </div>

            {/* Content */}
            <div className="services-card__content">
                <h3 className="services-card__title">{title}</h3>
                <p className="services-card__desc">{description}</p>
                
                {/* Feature List */}
                <ul className="services-card__features" aria-label={`${title} features`}>
                    {features.map((feature, idx) => (
                        <li key={idx} className="services-card__feature-item">
                            <span className="services-card__check-wrapper" aria-hidden="true">
                                <FiCheck size={12} />
                            </span>
                            <span className="services-card__feature-text">{feature}</span>
                        </li>
                    ))}
                </ul>

                {/* CTA Button */}
                {/* <a 
                    href="#contact" 
                    className="services-card__cta"
                    aria-label={`${ctaText} about ${title}`}
                >
                    <span>{ctaText}</span>
                    <FiArrowUpRight size={14} className="services-card__cta-arrow" />
                </a> */}
            </div>
        </article>
    );
}
