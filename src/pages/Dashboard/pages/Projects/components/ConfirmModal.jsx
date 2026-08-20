import { useTranslation } from "../../../../../hooks/useTranslation";

export default function ConfirmModal({ isOpen, onClose, onConfirm, loading }) {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop-overlay" onClick={onClose}>
            <div className="modal-container-card confirm-modal-width" onClick={(e) => e.stopPropagation()}>
                <div className="confirm-modal-header">
                    <h3>{t("dashboard.projects.confirmDeleteTitle") || "Delete Project"}</h3>
                </div>
                <div className="confirm-modal-body">
                    <p>{t("dashboard.projects.confirmDeleteText") || "Are you sure you want to delete this project? This action cannot be undone."}</p>
                </div>
                <div className="confirm-modal-actions">
                    <button 
                        className="modal-btn-cancel" 
                        onClick={onClose} 
                        disabled={loading}
                    >
                        {t("dashboard.common.cancel")}
                    </button>
                    <button 
                        className="modal-btn-confirm-delete" 
                        onClick={onConfirm} 
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="btn-spinner" />
                        ) : (
                            t("dashboard.common.delete")
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
