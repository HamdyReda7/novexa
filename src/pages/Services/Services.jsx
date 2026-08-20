import React from "react";
import { FiCode, FiSmartphone, FiMonitor, FiCloud, FiShield, FiTrendingUp } from "react-icons/fi";
import useTranslation from "../../hooks/useTranslation";
import ServiceCard from "./ServiceCard";
import "./Services.css";

function Services() {
    const { t } = useTranslation();

    const serviceIcons = {
        webDev: <FiCode />,
        mobileApps: <FiSmartphone />,
        uiux: <FiMonitor />,
        backend: <FiCloud />,
        ecommerce: <FiShield />,
        ai: <FiTrendingUp />,
    };

    const serviceKeys = ["mobileApps", "uiux", "backend", "webDev", "ecommerce", "ai"];

    return (
        <section className="services" id="services">
            <div className="services__container">
                <div className="services__header text-center">
                    <span className="services__badge">{t("services.badge")}</span>
                    <h2 className="services__title">{t("services.title")}</h2>
                    <p className="services__description">{t("services.description")}</p>
                </div>

                <div className="services__grid">
                    {serviceKeys.map((key) => {
                        const title = t(`services.items.${key}.title`);
                        const description = t(`services.items.${key}.description`);
                        const rawFeatures = t(`services.items.${key}.features`);
                        const features = Array.isArray(rawFeatures) ? rawFeatures : [];

                        return (
                            <ServiceCard
                                key={key}
                                icon={serviceIcons[key]}
                                title={title}
                                description={description}
                                features={features}
                                ctaText={t("services.cta")}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Services;
