import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCheck } from "react-icons/fi";

function ServiceCard({ serviceKey, icon, title, description, features = [], ctaText }) {
    const targetUrl = serviceKey ? `/services/${serviceKey}` : "#contact";

    return (
        <div className="service-card">
            <div className="service-card__icon-wrapper">
                {icon}
            </div>
            <h3 className="service-card__title">
                <Link to={targetUrl} className="service-card__title-link">
                    {title}
                </Link>
            </h3>
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

            <Link to={targetUrl} className="service-card__link">
                <span>{ctaText || "Learn More"}</span>
                <FiArrowRight className="service-card__arrow" />
            </Link>
        </div>
    );
}

export default ServiceCard;

