import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "../../../../hooks/useTranslation";
import { FiPlus, FiEdit2, FiTrash2, FiRefreshCw, FiAlertTriangle } from "react-icons/fi";
import PageHeader from "../../components/PageHeader/PageHeader";
import TableToolbar from "../../components/TableToolbar/TableToolbar";
import EmptyState from "../../components/EmptyState/EmptyState";
import SkeletonRow from "./components/SkeletonRow";
import ConfirmModal from "./components/ConfirmModal";
import CategoryModal from "./components/CategoryModal";
import { categoryService } from "../../../../services/categoryService";
import { resolveImageUrl } from "../../../../services/api";
import "./Categories.css";

export default function Categories() {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState("");
    const [categories, setCategories] = useState([]);
    
    // API states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0
    });

    // Form Modal states
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedCat, setSelectedCat] = useState(null);
    const [formLoading, setFormLoading] = useState(false);

    // Delete Modal states
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Toast alert states
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });

    const triggerToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast((prev) => ({ ...prev, show: false }));
        }, 3000);
    };

    // Load category lists
    const fetchCategories = useCallback(async (page = 1) => {
        setLoading(true);
        setError(false);
        try {
            const response = await categoryService.getAllCategories(page);
            if (response && response.success) {
                setCategories(response.data || []);
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
        fetchCategories(1);
    }, [fetchCategories]);

    // Handle Add category click
    const handleAddNewClick = () => {
        setSelectedCat(null);
        setIsFormOpen(true);
    };

    // Handle Edit category click
    const handleEditClick = (cat) => {
        setSelectedCat(cat);
        setIsFormOpen(true);
    };

    // Handle Save (Create/Update)
    const handleSaveCategory = async (formData) => {
        setFormLoading(true);
        try {
            if (selectedCat) {
                // Update
                const response = await categoryService.updateCategory(selectedCat.id, formData);
                if (response && response.success) {
                    triggerToast(t("dashboard.categories.toast.updateSuccess"), "success");
                    setIsFormOpen(false);
                    fetchCategories(pagination.current_page);
                } else {
                    triggerToast(response.message || t("contactSection.validation.unexpectedError"), "danger");
                }
            } else {
                // Create
                const response = await categoryService.createCategory(formData);
                if (response && response.success) {
                    triggerToast(t("dashboard.categories.toast.createSuccess"), "success");
                    setIsFormOpen(false);
                    fetchCategories(1); // Back to first page to see the new entry
                } else {
                    triggerToast(response.message || t("contactSection.validation.unexpectedError"), "danger");
                }
            }
        } catch {
            triggerToast(t("contactSection.validation.unexpectedError"), "danger");
        } finally {
            setFormLoading(false);
        }
    };

    // Handle Delete category click
    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setIsDeleteOpen(true);
    };

    // Confirm Delete
    const handleConfirmDelete = async () => {
        if (!deleteId) return;
        setDeleteLoading(true);
        try {
            const response = await categoryService.deleteCategory(deleteId);
            if (response && response.success) {
                setCategories((prev) => prev.filter((cat) => cat.id !== deleteId));
                triggerToast(t("dashboard.categories.toast.deleteSuccess"), "success");
                setIsDeleteOpen(false);
                setDeleteId(null);
            } else {
                triggerToast(t("contactSection.validation.unexpectedError"), "danger");
            }
        } catch {
            triggerToast(t("contactSection.validation.unexpectedError"), "danger");
        } finally {
            setDeleteLoading(false);
        }
    };

    // Local Search
    const filteredCategories = categories.filter((cat) => {
        const matchesSearch = 
            (cat.name_ar && cat.name_ar.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (cat.name_en && cat.name_en.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesSearch;
    });

    const getStatusText = (status) => {
        if (status === true || status === "true" || status === 1 || status === "1") return t("dashboard.categories.status.active") || "Active";
        if (status === false || status === "false" || status === 0 || status === "0") return t("dashboard.categories.status.inactive") || "Inactive";
        return t("dashboard.categories.status.pending") || "Pending";
    };

    const getStatusClass = (status) => {
        if (status === true || status === "true" || status === 1 || status === "1") return "badge-active";
        if (status === false || status === "false" || status === 0 || status === "0") return "badge-inactive";
        return "badge-pending";
    };

    const breadcrumbs = [
        { name: t("dashboard.nav.home"), path: "/dashboard" },
        { name: t("dashboard.nav.categories") }
    ];

    const handlePageChange = (page) => {
        if (page >= 1 && page <= pagination.last_page) {
            fetchCategories(page);
        }
    };

    return (
        <div className="categories-page-container">
            <PageHeader 
                title={t("dashboard.categories.title")}
                subtitle={t("dashboard.categories.subtitle")}
                breadcrumbs={breadcrumbs}
            />

            {/* Custom search / action bar wrapper */}
            <div className="toolbar-flex-container">
                <TableToolbar
                    searchVal={searchQuery}
                    onSearchChange={setSearchQuery}
                    searchPlaceholder={t("dashboard.navbar.searchPlaceholder")}
                    hideFilter={true}
                />
                <div className="toolbar-actions-group">
                    <button className="refresh-cat-btn" onClick={() => fetchCategories(1)} title="Refresh">
                        <FiRefreshCw size={16} />
                    </button>
                    <button className="create-cat-btn" onClick={handleAddNewClick}>
                        <FiPlus size={16} />
                        <span>{t("dashboard.categories.createBtn")}</span>
                    </button>
                </div>
            </div>

            {/* Toast alerts */}
            {toast.show && (
                <div className={`toast-notification-banner ${toast.type}`}>
                    <span>{toast.message}</span>
                </div>
            )}

            {/* Main Content */}
            {error ? (
                <div className="categories-error-fallback">
                    <FiAlertTriangle className="error-icon" size={48} />
                    <h3>{t("contactSection.validation.unexpectedError")}</h3>
                    <button className="retry-btn-action" onClick={() => fetchCategories(1)}>
                        <FiRefreshCw size={16} />
                        <span>{t("dashboard.categories.retry") || "Retry"}</span>
                    </button>
                </div>
            ) : !loading && filteredCategories.length === 0 && searchQuery === "" ? (
                <EmptyState 
                    title={t("dashboard.categories.emptyState.title")}
                    description={t("dashboard.categories.emptyState.desc")}
                    action={
                        <button className="create-cat-btn" onClick={handleAddNewClick}>
                            <FiPlus size={18} />
                            <span>{t("dashboard.categories.emptyState.action")}</span>
                        </button>
                    }
                />
            ) : (
                <div className="table-responsive-wrapper">
                    <table className="dashboard-data-table">
                        <thead>
                            <tr>
                                <th>{t("dashboard.categories.table.hash")}</th>
                                <th>{t("dashboard.categories.table.nameAr")}</th>
                                <th>{t("dashboard.categories.table.nameEn")}</th>
                                <th>{t("dashboard.categories.table.image")}</th>
                                <th>{t("dashboard.categories.table.status")}</th>
                                <th className="text-center-align">{t("dashboard.categories.table.actions")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
                            ) : filteredCategories.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="empty-search-cell text-center-align">
                                        {t("dashboard.common.emptyStateTitle")}
                                    </td>
                                </tr>
                            ) : (
                                filteredCategories.map((cat, index) => (
                                    <tr key={cat.id}>
                                        <td>{((pagination.current_page - 1) * pagination.per_page) + index + 1}</td>
                                        <td className="font-semibold">{cat.name_ar}</td>
                                        <td className="font-semibold">{cat.name_en}</td>
                                        <td>
                                            {cat.image ? (
                                                <img 
                                                    src={resolveImageUrl(cat.image)} 
                                                    alt={cat.name_en} 
                                                    className="category-thumbnail-img"
                                                />
                                            ) : (
                                                <span className="no-image-placeholder">
                                                    {t("dashboard.categories.form.noImage")}
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            <span className={`status-badge-inline ${getStatusClass(cat.status)}`}>
                                                {getStatusText(cat.status)}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="row-actions-container">
                                                <button 
                                                    className="action-icon-btn edit" 
                                                    title={t("dashboard.common.edit")}
                                                    onClick={() => handleEditClick(cat)}
                                                >
                                                    <FiEdit2 size={15} />
                                                </button>
                                                <button 
                                                    className="action-icon-btn delete" 
                                                    title={t("dashboard.common.delete")}
                                                    onClick={() => handleDeleteClick(cat.id)}
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

            {/* Category Add/Edit Modal */}
            <CategoryModal 
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                category={selectedCat}
                onSave={handleSaveCategory}
                loading={formLoading}
            />

            {/* Confirmation Delete Modal */}
            <ConfirmModal 
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleConfirmDelete}
                loading={deleteLoading}
            />
        </div>
    );
}
