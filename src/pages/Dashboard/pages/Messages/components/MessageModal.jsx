import { useTranslation } from "../../../../../hooks/useTranslation";
import { FiX, FiCalendar, FiDollarSign, FiPhone, FiMail, FiUser, FiInfo } from "react-icons/fi";

export default function MessageModal({ isOpen, onClose, message, loading, error, onRetry }) {
    const { t } = useTranslation();

    if (!isOpen) return null;

    const getStatusText = (status) => {
        if (status === 0) return t("dashboard.messages.status.new") || "New";
        if (status === 1) return t("dashboard.messages.status.reviewed") || "Reviewed";
        if (status === 2) return t("dashboard.messages.status.completed") || "Completed";
        return t("dashboard.messages.status.unknown") || "Unknown";
    };

    const getStatusClass = (status) => {
        if (status === 0) return "badge-new";
        if (status === 1) return "badge-reviewed";
        if (status === 2) return "badge-completed";
        return "badge-unknown";
    };

    return (
        <div className="modal-backdrop-overlay" onClick={onClose}>
            <div className="modal-container-card detail-modal-width" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header-nav">
                    <h2>{t("dashboard.messages.detailTitle") || "Order Request Details"}</h2>
                    <button className="modal-close-btn" onClick={onClose} aria-label="Close">
                        <FiX size={20} />
                    </button>
                </div>

                <div className="modal-body-scrollable">
                    {loading ? (
                        <div className="modal-loading-container">
                            <span className="modal-spinner" />
                            <p>{t("dashboard.messages.loadingDetails") || "Fetching details..."}</p>
                        </div>
                    ) : error ? (
                        <div className="modal-error-container">
                            <p>{t("contactSection.validation.unexpectedError")}</p>
                            <button className="modal-retry-btn" onClick={onRetry}>
                                {t("dashboard.messages.retry") || "Retry"}
                            </button>
                        </div>
                    ) : message ? (
                        <div className="message-details-grid">
                            {/* Metadata */}
                            <div className="detail-meta-card">
                                <div className="meta-row">
                                    <FiUser className="meta-icon" />
                                    <div className="meta-info">
                                        <span className="meta-label">{t("contactSection.form.name")}</span>
                                        <span className="meta-value">{message.name}</span>
                                    </div>
                                </div>

                                <div className="meta-row">
                                    <FiMail className="meta-icon" />
                                    <div className="meta-info">
                                        <span className="meta-label">{t("contactSection.form.email")}</span>
                                        <a href={`mailto:${message.email}`} className="meta-value link">{message.email}</a>
                                    </div>
                                </div>

                                <div className="meta-row">
                                    <FiPhone className="meta-icon" />
                                    <div className="meta-info">
                                        <span className="meta-label">{t("contactSection.form.phone")}</span>
                                        <a href={`tel:${message.phone}`} className="meta-value link">{message.phone}</a>
                                    </div>
                                </div>

                                <div className="meta-row">
                                    <FiDollarSign className="meta-icon" />
                                    <div className="meta-info">
                                        <span className="meta-label">{t("contactSection.form.budget")}</span>
                                        <span className="meta-value">{message.budget}</span>
                                    </div>
                                </div>

                                <div className="meta-row">
                                    <FiCalendar className="meta-icon" />
                                    <div className="meta-info">
                                        <span className="meta-label">{t("dashboard.messages.table.date") || "Created At"}</span>
                                        <span className="meta-value">{message.created_at}</span>
                                    </div>
                                </div>

                                <div className="meta-row">
                                    <FiInfo className="meta-icon" />
                                    <div className="meta-info">
                                        <span className="meta-label">{t("dashboard.common.status") || "Status"}</span>
                                        <span className={`status-badge-inline ${getStatusClass(message.status)}`}>
                                            {getStatusText(message.status)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Details text */}
                            <div className="detail-message-content">
                                <h3>{t("contactSection.form.details")}</h3>
                                <div className="details-text-scrollbox">
                                    {message.details}
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
