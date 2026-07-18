import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "../../../../hooks/useTranslation";
import { FiMail, FiEye, FiTrash2, FiRefreshCw, FiAlertTriangle } from "react-icons/fi";
import PageHeader from "../../components/PageHeader/PageHeader";
import TableToolbar from "../../components/TableToolbar/TableToolbar";
import EmptyState from "../../components/EmptyState/EmptyState";
import SkeletonRow from "./components/SkeletonRow";
import ConfirmModal from "./components/ConfirmModal";
import MessageModal from "./components/MessageModal";
import { messageService } from "../../../../services/messageService";
import "./Messages.css";

export default function Messages() {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState("");
    const [messages, setMessages] = useState([]);
    
    // Loading & Error States
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    // Pagination State
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0
    });

    // View Modal State
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [viewLoading, setViewLoading] = useState(false);
    const [viewError, setViewError] = useState(false);
    const [activeViewId, setActiveViewId] = useState(null);

    // Delete Modal State
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [activeDeleteId, setActiveDeleteId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Toast Notification State
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });

    const triggerToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast((prev) => ({ ...prev, show: false }));
        }, 3000);
    };

    // Fetch Messages
    const fetchMessages = useCallback(async (page = 1) => {
        setLoading(true);
        setError(false);
        try {
            const response = await messageService.getAllMessages(page);
            if (response && response.success) {
                setMessages(response.data || []);
                if (response.pagination) {
                    setPagination(response.pagination);
                }
            } else {
                setError(true);
            }
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMessages(1);
    }, [fetchMessages]);

    // View Details Request
    const handleViewMessage = async (id) => {
        setActiveViewId(id);
        setIsViewOpen(true);
        setViewLoading(true);
        setViewError(false);
        setSelectedMessage(null);

        try {
            const response = await messageService.showOrder(id);
            if (response && response.success) {
                setSelectedMessage(response.data);
                // Dynamically mark reviewed locally
                setMessages((prev) =>
                    prev.map((m) => (m.id === id ? { ...m, status: 1 } : m))
                );
            } else {
                setViewError(true);
            }
        } catch {
            setViewError(true);
        } finally {
            setViewLoading(false);
        }
    };

    // Retry Details Request
    const handleRetryView = () => {
        if (activeViewId) {
            handleViewMessage(activeViewId);
        }
    };

    // Delete Trigger
    const handleDeleteClick = (id) => {
        setActiveDeleteId(id);
        setIsDeleteOpen(true);
    };

    // Confirm Delete Request
    const handleConfirmDelete = async () => {
        if (!activeDeleteId) return;
        setDeleteLoading(true);
        try {
            const response = await messageService.deleteOrder(activeDeleteId);
            if (response && response.success) {
                setMessages((prev) => prev.filter((m) => m.id !== activeDeleteId));
                triggerToast(t("dashboard.messages.toast.deleteSuccess"), "success");
                setIsDeleteOpen(false);
                setActiveDeleteId(null);
            } else {
                triggerToast(t("contactSection.validation.unexpectedError"), "danger");
            }
        } catch {
            triggerToast(t("contactSection.validation.unexpectedError"), "danger");
        } finally {
            setDeleteLoading(false);
        }
    };

    // Instant Local Filters
    const filteredMessages = messages.filter((msg) => {
        const matchesSearch = 
            (msg.name && msg.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (msg.email && msg.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (msg.phone && msg.phone.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesSearch;
    });

    // Newest first sorting
    const sortedMessages = [...filteredMessages].sort((a, b) => b.id - a.id);

    const getStatusText = (status) => {
        if (status === 0) return t("dashboard.messages.status.new");
        if (status === 1) return t("dashboard.messages.status.reviewed");
        if (status === 2) return t("dashboard.messages.status.completed");
        return t("dashboard.messages.status.unknown");
    };

    const getStatusClass = (status) => {
        if (status === 0) return "badge-new";
        if (status === 1) return "badge-reviewed";
        if (status === 2) return "badge-completed";
        return "badge-unknown";
    };

    const breadcrumbs = [
        { name: t("dashboard.nav.home"), path: "/dashboard" },
        { name: t("dashboard.nav.messages") }
    ];

    const handlePageChange = (page) => {
        if (page >= 1 && page <= pagination.last_page) {
            fetchMessages(page);
        }
    };

    return (
        <div className="messages-page-container">
            <PageHeader 
                title={t("dashboard.messages.title")}
                subtitle={t("dashboard.messages.subtitle")}
                breadcrumbs={breadcrumbs}
            />

            {/* Custom search bar */}
            <TableToolbar
                searchVal={searchQuery}
                onSearchChange={setSearchQuery}
                searchPlaceholder={t("dashboard.navbar.searchPlaceholder")}
                hideFilter={true}
            />

            {/* Toast Alerts */}
            {toast.show && (
                <div className={`toast-notification-banner ${toast.type}`}>
                    <span>{toast.message}</span>
                </div>
            )}

            {/* Main Content Area */}
            {error ? (
                <div className="messages-error-fallback">
                    <FiAlertTriangle className="error-icon" size={48} />
                    <h3>{t("contactSection.validation.unexpectedError")}</h3>
                    <button className="retry-btn-action" onClick={() => fetchMessages(1)}>
                        <FiRefreshCw size={16} />
                        <span>{t("dashboard.messages.retry")}</span>
                    </button>
                </div>
            ) : !loading && sortedMessages.length === 0 && searchQuery === "" ? (
                <EmptyState 
                    title={t("dashboard.messages.emptyState.title")}
                    description={t("dashboard.messages.emptyState.desc")}
                    icon={<FiMail size={40} />}
                />
            ) : (
                <div className="table-responsive-wrapper messages-full-width">
                    <table className="dashboard-data-table">
                        <thead>
                            <tr>
                                <th>{t("dashboard.messages.table.hash")}</th>
                                <th>{t("dashboard.messages.table.name") || t("dashboard.messages.table.sender")}</th>
                                <th>{t("dashboard.messages.table.email")}</th>
                                <th>{t("dashboard.messages.table.phone")}</th>
                                <th>{t("dashboard.messages.table.budget")}</th>
                                <th>{t("dashboard.messages.table.status")}</th>
                                <th>{t("dashboard.messages.table.date")}</th>
                                <th className="text-center-align">{t("dashboard.messages.table.actions")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
                            ) : sortedMessages.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="empty-search-cell text-center-align">
                                        {t("dashboard.common.emptyStateTitle")}
                                    </td>
                                </tr>
                            ) : (
                                sortedMessages.map((msg, index) => (
                                    <tr key={msg.id} className={`message-row status-${msg.status}`}>
                                        <td>{((pagination.current_page - 1) * pagination.per_page) + index + 1}</td>
                                        <td className="font-semibold">{msg.name}</td>
                                        <td>{msg.email}</td>
                                        <td>{msg.phone}</td>
                                        <td>{msg.budget}</td>
                                        <td>
                                            <span className={`status-badge-inline ${getStatusClass(msg.status)}`}>
                                                {getStatusText(msg.status)}
                                            </span>
                                        </td>
                                        <td>{msg.created_at}</td>
                                        <td>
                                            <div className="row-actions-container">
                                                <button 
                                                    className="action-icon-btn view" 
                                                    title={t("dashboard.common.edit") || "View"}
                                                    onClick={() => handleViewMessage(msg.id)}
                                                >
                                                    <FiEye size={15} />
                                                </button>
                                                <button 
                                                    className="action-icon-btn delete" 
                                                    title={t("dashboard.common.delete")}
                                                    onClick={() => handleDeleteClick(msg.id)}
                                                >
                                                    <FiTrash2 size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* Pagination Footer */}
                    {pagination.last_page > 1 && (
                        <div className="pagination-footer-nav">
                            <span className="pagination-summary-text">
                                {t("dashboard.common.showing")} {((pagination.current_page - 1) * pagination.per_page) + 1} {t("dashboard.common.to")} {Math.min(pagination.current_page * pagination.per_page, pagination.total)} {t("dashboard.common.of")} {pagination.total} {t("dashboard.common.entries")}
                            </span>
                            <div className="pagination-buttons-group">
                                <button 
                                    className="pagination-btn-nav"
                                    onClick={() => handlePageChange(pagination.current_page - 1)}
                                    disabled={pagination.current_page === 1}
                                >
                                    &lt;
                                </button>
                                {[...Array(pagination.last_page)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        className={`pagination-btn-nav number ${pagination.current_page === i + 1 ? "active" : ""}`}
                                        onClick={() => handlePageChange(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button 
                                    className="pagination-btn-nav"
                                    onClick={() => handlePageChange(pagination.current_page + 1)}
                                    disabled={pagination.current_page === pagination.last_page}
                                >
                                    &gt;
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Message Detail Modal */}
            <MessageModal 
                isOpen={isViewOpen}
                onClose={() => setIsViewOpen(false)}
                message={selectedMessage}
                loading={viewLoading}
                error={viewError}
                onRetry={handleRetryView}
            />

            {/* Confirm Delete Modal */}
            <ConfirmModal 
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleConfirmDelete}
                loading={deleteLoading}
            />
        </div>
    );
}
