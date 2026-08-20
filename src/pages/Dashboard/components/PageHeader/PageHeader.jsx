import { Link } from "react-router-dom";
import { useTranslation } from "../../../../hooks/useTranslation";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import "./PageHeader.css";

export default function PageHeader({ title, subtitle, breadcrumbs = [], action }) {
    const { t, language } = useTranslation();
    const isRtl = language === "ar";

    return (
        <header className="page-header-container">
            {/* Breadcrumbs */}
            {breadcrumbs.length > 0 && (
                <nav className="breadcrumbs-nav" aria-label="Breadcrumb">
                    <ol className="breadcrumbs-list">
                        <li className="breadcrumb-item">
                            <Link to="/dashboard" className="breadcrumb-link">
                                {t("dashboard.nav.home")}
                            </Link>
                        </li>
                        {breadcrumbs.map((crumb, idx) => {
                            const isLast = idx === breadcrumbs.length - 1;
                            return (
                                <li key={crumb.path || idx} className="breadcrumb-item">
                                    <span className="breadcrumb-separator" aria-hidden="true">
                                        {isRtl ? <FiChevronLeft size={12} /> : <FiChevronRight size={12} />}
                                    </span>
                                    {isLast ? (
                                        <span className="breadcrumb-current" aria-current="page">
                                            {crumb.name}
                                        </span>
                                    ) : (
                                        <Link to={crumb.path} className="breadcrumb-link">
                                            {crumb.name}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            )}

            {/* Header Content */}
            <div className="page-header-main">
                <div className="title-section">
                    <h2 className="page-title">{title}</h2>
                    {subtitle && <p className="page-subtitle">{subtitle}</p>}
                </div>
                {action && <div className="action-section">{action}</div>}
            </div>
        </header>
    );
}
