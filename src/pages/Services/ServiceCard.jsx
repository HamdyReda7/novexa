import React from "react";
import { FiArrowRight, FiCheck } from "react-icons/fi";

function ServiceCard({ icon, title, description, features = [], ctaText }) {
    return (
        <div className="service-card">
            <div className="service-card__icon-wrapper">
                {icon}
            </div>
            <h3 className="service-card__title">{title}</h3>
            <p className="service-card__description">{description}</p>
            
            {features.length > 0 && (
                <ul className="service-card__features">
                    {features.map((feature, idx) => (
                        <li key={idx}>
                            <FiCheck className="service-card__check" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            )}

            <a href="#contact" className="service-card__link">
                <span>{ctaText || "Learn More"}</span>
                <FiArrowRight className="service-card__arrow" />
            </a>
        </div>
    );
}

export default ServiceCard;
