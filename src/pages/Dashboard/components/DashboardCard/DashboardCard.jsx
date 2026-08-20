import "./DashboardCard.css";

export default function DashboardCard({ title, value, badge, badgeType, icon, description }) {
    return (
        <div className="dashboard-card">
            <div className="card-header-row">
                <span className="card-title-text">{title}</span>
                {icon && <span className="card-icon-container" aria-hidden="true">{icon}</span>}
            </div>
            
            <div className="card-body-row">
                <span className="card-value-text">{value}</span>
                {badge && (
                    <span className={`card-badge-pill ${badgeType || "info"}`}>
                        {badge}
                    </span>
                )}
            </div>

            {description && <p className="card-desc-text">{description}</p>}
        </div>
    );
}
