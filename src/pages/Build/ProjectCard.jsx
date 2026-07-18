import { useState } from "react";
import { FiExternalLink, FiImage } from "react-icons/fi";
import useTranslation from "../../hooks/useTranslation";
import { resolveImageUrl } from "../../services/api";

/**
 * ProjectCard — displays a single project with image, category badge,
 * title, description, status badge and an optional "View Project" button.
 */
export default function ProjectCard({ project, index }) {
    const { t, language } = useTranslation();
    const isAr = language === "ar";
    const [imgError, setImgError] = useState(false);

    const name        = isAr ? project.name_ar        : project.name_en;
    const description = isAr ? project.description_ar : project.description_en;
    const catName     = project.category
        ? (isAr ? project.category.name_ar : project.category.name_en)
        : null;

    return (
        <article
            className="build-card project-card-item"
            data-aos="fade-up"
            data-aos-delay={index * 60}
        >
            {/* Image / Placeholder */}
            <div className="project-card-image-box">
                {/* Status Badge */}
                {/* <span className="project-status-badge active">
                    {t("projects.showcase.activeBadge") || "Active"}
                </span> */}

                {!imgError && project.image ? (
                    <img
                        src={resolveImageUrl(project.image)}
                        alt={name}
                        className="project-card-img"
                        loading="lazy"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="project-card-img-placeholder">
                        <FiImage size={32} />
                        <span>{t("dashboard.projects.form.noImage") || "No Image"}</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="project-card-content">
                {catName && (
                    <span className="project-card-category-badge">{catName}</span>
                )}

                <h3 className="build-card-title project-card-title-text">{name}</h3>

                <p className="build-card-description project-card-desc-text">{description}</p>

                {project.link && (
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-visit-btn-action"
                    >
                        <span>{t("projects.showcase.visitBtn") || "Visit Website"}</span>
                        <FiExternalLink size={14} />
                    </a>
                )}
            </div>
        </article>
    );
}
