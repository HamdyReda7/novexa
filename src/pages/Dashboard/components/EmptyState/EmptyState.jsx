import { useTranslation } from "../../../../hooks/useTranslation";
import { FiInbox } from "react-icons/fi";
import "./EmptyState.css";

export default function EmptyState({ title, description, icon, action }) {
    const { t } = useTranslation();

    return (
        <div className="empty-state-card">
            <div className="empty-state-icon-wrapper" aria-hidden="true">
                {icon || <FiInbox size={40} />}
            </div>
            <h3 className="empty-state-title">
                {title || t("dashboard.common.emptyStateTitle")}
            </h3>
            <p className="empty-state-desc">
                {description || t("dashboard.common.emptyStateDesc")}
            </p>
            {action && <div className="empty-state-action">{action}</div>}
        </div>
    );
}
