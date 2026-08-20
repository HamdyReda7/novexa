import { useTranslation } from "../../../../hooks/useTranslation";
import { FiActivity, FiCheckCircle } from "react-icons/fi";
import { 
    FiUsers, 
    FiBriefcase, 
    FiMail 
} from "react-icons/fi";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import PageHeader from "../../components/PageHeader/PageHeader";
import "./DashboardHome.css";

export default function DashboardHome() {
    const { t } = useTranslation();

    const stats = [
        {
            title: t("dashboard.home.stats.users"),
            value: "3,620",
            badge: "+8.2%",
            badgeType: "success",
            icon: <FiUsers size={20} />,
            description: "Active users today"
        },
        {
            title: t("dashboard.home.stats.projects"),
            value: "28",
            badge: "+4.1%",
            badgeType: "success",
            icon: <FiBriefcase size={20} />,
            description: "Completed & current"
        },
        {
            title: t("dashboard.home.stats.messages"),
            value: "14",
            badge: "-1.5%",
            badgeType: "danger",
            icon: <FiMail size={20} />,
            description: "Requires attention"
        }
    ];

    const activities = [
        { id: 1, action: "Project 'Novexa Cloud' launched", time: "5 min ago", user: "Saidt" },
        { id: 2, action: "New message received from hello@novexa.com", time: "1 hour ago", user: "Visitor" },
        { id: 3, action: "Category 'AI Development' created", time: "3 hours ago", user: "Saidt" },
        { id: 4, action: "Project 'Apex CRM' updated to Completed", time: "1 day ago", user: "Lead Dev" }
    ];

    return (
        <div className="dashboard-home-page">
            <PageHeader 
                title={t("dashboard.home.title")} 
                subtitle={t("dashboard.home.subtitle")} 
                breadcrumbs={[]}
            />

            {/* Cards Grid */}
            <div className="dashboard-stats-grid">
                {stats.map((stat, idx) => (
                    <DashboardCard 
                        key={idx}
                        title={stat.title}
                        value={stat.value}
                        badge={stat.badge}
                        badgeType={stat.badgeType}
                        icon={stat.icon}
                        description={stat.description}
                    />
                ))}
            </div>

            {/* Split Grid */}
            <div className="dashboard-home-grid">
                {/* Activities panel */}
                <div className="dashboard-panel">
                    <div className="panel-header">
                        <FiActivity size={18} className="panel-icon" />
                        <h3 className="panel-title">{t("dashboard.home.recentActivity")}</h3>
                    </div>
                    <div className="panel-body">
                        <ul className="activity-list">
                            {activities.map((act) => (
                                <li key={act.id} className="activity-item">
                                    <span className="activity-dot" />
                                    <div className="activity-details">
                                        <p className="activity-text">{act.action}</p>
                                        <span className="activity-meta">{act.time} • {act.user}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Status Panel */}
                <div className="dashboard-panel">
                    <div className="panel-header">
                        <FiCheckCircle size={18} className="panel-icon status-green" />
                        <h3 className="panel-title">{t("dashboard.home.systemStatus")}</h3>
                    </div>
                    <div className="panel-body status-body">
                        <div className="status-indicator-card">
                            <span className="pulse-dot green" />
                            <div className="status-text-details">
                                <h4 className="status-heading">{t("dashboard.home.statusNormal")}</h4>
                                <p className="status-paragraph">Web Server: Online (99.98% uptime)</p>
                                <p className="status-paragraph">Database: Connected (0.02ms latency)</p>
                                <p className="status-paragraph">Laravel API Link: Configured (Awaiting migration)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
