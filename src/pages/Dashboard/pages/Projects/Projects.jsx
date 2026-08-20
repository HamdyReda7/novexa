import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "../../../../hooks/useTranslation";
import { FiPlus, FiEdit2, FiTrash2, FiRefreshCw, FiAlertTriangle } from "react-icons/fi";
import PageHeader from "../../components/PageHeader/PageHeader";
import TableToolbar from "../../components/TableToolbar/TableToolbar";
import EmptyState from "../../components/EmptyState/EmptyState";
import SkeletonRow from "./components/SkeletonRow";
import ConfirmModal from "./components/ConfirmModal";
import ProjectModal from "./components/ProjectModal";
import ImagePreviewModal from "./components/ImagePreviewModal";
import { projectService } from "../../../../services/projectService";
import { categoryService } from "../../../../services/categoryService";
import { resolveImageUrl } from "../../../../services/api";
import "./Projects.css";

export default function Projects() {
    const { t, language } = useTranslation();
    const isAr = language === "ar";

    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    
    // Data list states
    const [projects, setProjects] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Pagination
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0
    });

    // Form Modal states
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedProj, setSelectedProj] = useState(null);
    const [formLoading, setFormLoading] = useState(false);

    // Delete Modal states
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Image Preview Modal states
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewSrc, setPreviewSrc] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");

    // Toast alert states
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });

    const triggerToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast((prev) => ({ ...prev, show: false }));
        }, 3000);
    };

    // Load category filter options
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await categoryService.getAllCategories(1);
                if (response && response.success) {
                    setCategories(response.data || []);
                }
            } catch (e) {
                console.error("Failed to load categories list", e);
            }
        };
        loadCategories();
    }, []);

    // Load projects list
    const fetchProjects = useCallback(async (page = 1) => {
        setLoading(true);
        setError(false);
        try {
            const response = await projectService.getProjects(page);
            if (response && response.success) {
                setProjects(response.data || []);
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
        fetchProjects(1);
    }, [fetchProjects]);

    // Add click
    const handleAddNewClick = () => {
        setSelectedProj(null);
        setIsFormOpen(true);
    };

    // Edit click
    const handleEditClick = (proj) => {
        setSelectedProj(proj);
        setIsFormOpen(true);
    };

    // Save (Create/Update) Project
    const handleSaveProject = async (formData) => {
        setFormLoading(true);
        try {
            if (selectedProj) {
                // Update
                const response = await projectService.updateProject(selectedProj.id, formData);
                if (response && response.success) {
                    triggerToast(t("dashboard.projects.toast.updateSuccess"), "success");
                    setIsFormOpen(false);
                    fetchProjects(pagination.current_page);
                } else {
                    triggerToast(response.message || t("contactSection.validation.unexpectedError"), "danger");
                }
            } else {
                // Create
                const response = await projectService.createProject(formData);
                if (response && response.success) {
                    triggerToast(t("dashboard.projects.toast.createSuccess"), "success");
                    setIsFormOpen(false);
                    fetchProjects(1); // Return to page 1
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

    // Delete click
    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setIsDeleteOpen(true);
    };

    // Confirm Delete
    const handleConfirmDelete = async () => {
        if (!deleteId) return;
        setDeleteLoading(true);
        try {
            const response = await projectService.deleteProject(deleteId);
            if (response && response.success) {
                setProjects((prev) => prev.filter((proj) => proj.id !== deleteId));
                triggerToast(t("dashboard.projects.toast.deleteSuccess"), "success");
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

    // Thumbnail Preview click
    const handleImagePreviewClick = (src, title) => {
        setPreviewSrc(src);
        setPreviewTitle(title);
        setIsPreviewOpen(true);
    };

    // Local Search and Category Filtering
    const filteredProjects = projects.filter((proj) => {
        const catName = isAr ? proj.category?.name_ar : proj.category?.name_en;
        const matchesSearch = 
            (proj.name_ar && proj.name_ar.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (proj.name_en && proj.name_en.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (catName && catName.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory = 
            categoryFilter === "all" || 
            (proj.category && proj.category.id === Number(categoryFilter));

        return matchesSearch && matchesCategory;
    });

    const getStatusText = (status) => {
        if (status === 1 || status === "1" || status === true) return t("dashboard.categories.status.active") || "Active";
        if (status === 0 || status === "0" || status === false) return t("dashboard.categories.status.inactive") || "Inactive";
        return t("dashboard.categories.status.pending") || "Pending";
    };

    const getStatusClass = (status) => {
        if (status === 1 || status === "1" || status === true) return "badge-active";
        if (status === 0 || status === "0" || status === false) return "badge-inactive";
        return "badge-pending";
    };

    const breadcrumbs = [
        { name: t("dashboard.nav.home"), path: "/dashboard" },
        { name: t("dashboard.nav.projects") }
    ];

    const handlePageChange = (page) => {
        if (page >= 1 && page <= pagination.last_page) {
            fetchProjects(page);
        }
    };

    return (
        <div className="projects-page-container">
            <PageHeader 
                title={t("dashboard.projects.title")}
                subtitle={t("dashboard.projects.subtitle")}
                breadcrumbs={breadcrumbs}
            />

            {/* Custom search / action bar wrapper */}
            <div className="toolbar-flex-container">
                <TableToolbar
                    searchVal={searchQuery}
                    onSearchChange={setSearchQuery}
                    filterVal={categoryFilter}
                    onFilterChange={setCategoryFilter}
                    filterOptions={[
                        { value: "all", label: isAr ? "جميع التصنيفات" : "All Categories" },
                        ...categories.map((cat) => ({
                            value: String(cat.id),
                            label: isAr ? cat.name_ar : cat.name_en
                        }))
                    ]}
                    searchPlaceholder={t("dashboard.navbar.searchPlaceholder")}
                />
                <div className="toolbar-actions-group">
                    <button className="refresh-cat-btn" onClick={() => fetchProjects(1)} title="Refresh">
                        <FiRefreshCw size={16} />
                    </button>
                    <button className="create-proj-btn" onClick={handleAddNewClick}>
                        <FiPlus size={16} />
                        <span>{t("dashboard.projects.createBtn")}</span>
                    </button>
                </div>
            </div>

            {/* Toast Alerts */}
            {toast.show && (
                <div className={`toast-notification-banner ${toast.type}`}>
                    <span>{toast.message}</span>
                </div>
            )}

            {/* Main Content */}
            {error ? (
                <div className="projects-error-fallback">
                    <FiAlertTriangle className="error-icon" size={48} />
                    <h3>{t("contactSection.validation.unexpectedError")}</h3>
                    <button className="retry-btn-action" onClick={() => fetchProjects(1)}>
                        <FiRefreshCw size={16} />
                        <span>{t("dashboard.categories.retry") || "Retry"}</span>
                    </button>
                </div>
            ) : !loading && filteredProjects.length === 0 && searchQuery === "" ? (
                <EmptyState 
                    title={t("dashboard.projects.emptyState.title")}
                    description={t("dashboard.projects.emptyState.desc")}
                    action={
                        <button className="create-proj-btn" onClick={handleAddNewClick}>
                            <FiPlus size={18} />
                            <span>{t("dashboard.projects.emptyState.action")}</span>
                        </button>
                    }
                />
            ) : (
                <div className="table-responsive-wrapper">
                    <table className="dashboard-data-table">
                        <thead>
                            <tr>
                                <th>{t("dashboard.projects.table.hash")}</th>
                                <th>{t("dashboard.projects.table.thumbnail")}</th>
                                <th>{t("dashboard.projects.table.nameAr")}</th>
                                <th>{t("dashboard.projects.table.nameEn")}</th>
                                <th>{t("dashboard.projects.table.category")}</th>
                                <th>{t("dashboard.projects.table.link")}</th>
                                <th>{t("dashboard.projects.table.status")}</th>
                                <th className="text-center-align">{t("dashboard.projects.table.actions")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
                            ) : filteredProjects.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="empty-search-cell text-center-align">
                                        {t("dashboard.common.emptyStateTitle")}
                                    </td>
                                </tr>
                            ) : (
                                filteredProjects.map((proj, index) => (
                                    <tr key={proj.id}>
                                        <td>{((pagination.current_page - 1) * pagination.per_page) + index + 1}</td>
                                        <td>
                                            {proj.image ? (
                                                <img 
                                                    src={resolveImageUrl(proj.image)} 
                                                    alt={isAr ? proj.name_ar : proj.name_en} 
                                                    className="project-thumbnail-img"
                                                    onClick={() => handleImagePreviewClick(resolveImageUrl(proj.image), isAr ? proj.name_ar : proj.name_en)}
                                                />
                                            ) : (
                                                <span className="no-image-placeholder">
                                                    {t("dashboard.projects.form.noImage")}
                                                </span>
                                            )}
                                        </td>
                                        <td className="font-semibold">{proj.name_ar}</td>
                                        <td className="font-semibold">{proj.name_en}</td>
                                        <td className="text-secondary">
                                            {proj.category 
                                                ? (isAr ? proj.category.name_ar : proj.category.name_en) 
                                                : "—"}
                                        </td>
                                        <td>
                                            {proj.link ? (
                                                <a 
                                                    href={proj.link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="visit-website-link"
                                                >
                                                    {t("projects.showcase.visitBtn")}
                                                </a>
                                            ) : (
                                                "—"
                                            )}
                                        </td>
                                        <td>
                                            <span className={`status-badge-inline ${getStatusClass(proj.status)}`}>
                                                {getStatusText(proj.status)}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="row-actions-container">
                                                <button 
                                                    className="action-icon-btn edit" 
                                                    title={t("dashboard.common.edit")}
                                                    onClick={() => handleEditClick(proj)}
                                                >
                                                    <FiEdit2 size={15} />
                                                </button>
                                                <button 
                                                    className="action-icon-btn delete" 
                                                    title={t("dashboard.common.delete")}
                                                    onClick={() => handleDeleteClick(proj.id)}
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

            {/* Project Add/Edit Modal */}
            <ProjectModal 
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                project={selectedProj}
                categories={categories}
                onSave={handleSaveProject}
                loading={formLoading}
            />

            {/* Confirmation Delete Modal */}
            <ConfirmModal 
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleConfirmDelete}
                loading={deleteLoading}
            />

            {/* Fullscreen Image Preview Modal */}
            <ImagePreviewModal 
                isOpen={isPreviewOpen}
                onClose={() => setIsPreviewOpen(false)}
                src={previewSrc}
                title={previewTitle}
            />
        </div>
    );
}
