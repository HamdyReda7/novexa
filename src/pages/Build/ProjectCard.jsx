import React from "react";
import { FiArrowUpRight, FiExternalLink, FiGlobe } from "react-icons/fi";
import useTranslation from "../../hooks/useTranslation";

function ProjectCard({ project }) {
    const { t, language } = useTranslation();
    const isArabic = language === "ar";

    // Extract clean display domain (e.g. sayedzyada.com)
    let displayDomain = "";
    let validUrl = "#";
    try {
        if (project.link && project.link !== "#") {
            validUrl = project.link.startsWith("http") ? project.link : `https://${project.link}`;
            const urlObj = new URL(validUrl);
            displayDomain = urlObj.hostname.replace("www.", "");
        }
    } catch {
        displayDomain = project.link || "";
    }

    return (
        <div className="project-card">
            {/* Top Browser Frame Mockup Bar */}
            <div className="project-card__browser-bar">
                <div className="browser-dots">
                    <span className="dot dot--red" />
                    <span className="dot dot--yellow" />
                    <span className="dot dot--green" />
                </div>
            </div>

            {/* Showcase Image Frame */}
            <div className="project-card__image-wrapper">
                <img 
                    src={project.image} 
                    alt={project.title} 
                    className="project-card__image" 
                    loading="lazy" 
                />
                
                {/* Live Status Indicator Pill */}
                <div className="project-card__status-pill">
                    <span className="status-pulse-dot" />
                    <span>{isArabic ? "مباشر" : "Live"}</span>
                </div>

                <div className="project-card__overlay">
                    <a 
                        href={validUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="project-card__view-btn"
                    >
                        <span>{t("projects.showcase.visitBtn") || (isArabic ? "زيارة الموقع" : "Visit Site")}</span>
                        <FiExternalLink size={16} />
                    </a>
                </div>
            </div>

            {/* Content Body */}
            <div className="project-card__content">
                <div className="project-card__tags">
                    {project.tags?.map((tag, idx) => (
                        <span key={idx} className="project-card__tag">{tag}</span>
                    ))}
                </div>

                <h3 className="project-card__title" title={project.title}>
                    <a 
                        href={validUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="project-card__title-link"
                    >
                        {project.title}
                    </a>
                </h3>
                
                <p className="project-card__description" title={project.description}>
                    {project.description}
                </p>

                <div className="project-card__footer">
                    <a 
                        href={validUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="project-card__link"
                    >
                        <span>{t("projects.showcase.visitBtn") || (isArabic ? "زيارة الموقع" : "Visit Site")}</span>
                        <FiArrowUpRight size={16} style={{ transform: isArabic ? "rotate(-90deg)" : "none" }} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;
