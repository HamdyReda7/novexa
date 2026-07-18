import React from "react";
import { FiCode, FiSmartphone, FiLayers, FiServer, FiShoppingBag, FiCpu } from "react-icons/fi";
import useTranslation from "../../hooks/useTranslation";
import ServiceCard from "./ServiceCard";
import "./Services.css";

const SERVICES_DATA = [
    { key: "webDev", icon: FiCode },
    { key: "mobileApps", icon: FiSmartphone },
    { key: "uiux", icon: FiLayers },
    { key: "backend", icon: FiServer },
    { key: "ecommerce", icon: FiShoppingBag },
    { key: "ai", icon: FiCpu },
];

export default function Services() {
    const { t } = useTranslation();

    return (
        <section className="services section" id="services">
            <div className="container">
                {/* Section Header */}
                <div className="section-header" data-aos="fade-up">
                    <span className="section-badge">
                        {t("services.badge") || "What We Offer"}
                    </span>
                    <h2 className="section-title">
                        {t("services.title") || "Our Services"}
                    </h2>
                    <p className="section-description">
                        {t("services.description")}
                    </p>
                </div>

                {/* Responsive Grid */}
                <div className="services-grid">
                    {SERVICES_DATA.map((service, index) => (
                        <ServiceCard
                            key={service.key}
                            itemKey={service.key}
                            icon={service.icon}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
