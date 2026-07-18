import { useState, useEffect } from "react";
import { useTranslation } from "../../../../../hooks/useTranslation";
import { FiX, FiUpload, FiImage } from "react-icons/fi";
import { resolveImageUrl } from "../../../../../services/api";

export default function ProjectModal({ isOpen, onClose, onSave, project, categories, loading }) {
    const { t, language } = useTranslation();
    const isAr = language === "ar";

    const [categoryId, setCategoryId] = useState("");
    const [nameAr, setNameAr] = useState("");
    const [nameEn, setNameEn] = useState("");
    const [descAr, setDescAr] = useState("");
    const [descEn, setDescEn] = useState("");
    const [link, setLink] = useState("");
    const [status, setStatus] = useState(1);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (project) {
            setCategoryId(project.category?.id || "");
            setNameAr(project.name_ar || "");
            setNameEn(project.name_en || "");
            setDescAr(project.description_ar || "");
            setDescEn(project.description_en || "");
            setLink(project.link || "");
            
            let initialStatus = 1;
            if (project.status !== undefined && project.status !== null) {
                if (project.status === 0 || project.status === "0" || project.status === false || project.status === "false") {
                    initialStatus = 0;
                }
            }
            setStatus(initialStatus);
            setImagePreview(resolveImageUrl(project.image) || null);
            setImageFile(null);
        } else {
            setCategoryId("");
            setNameAr("");
            setNameEn("");
            setDescAr("");
            setDescEn("");
            setLink("");
            setStatus(1);
            setImagePreview(null);
            setImageFile(null);
        }
    }, [project, isOpen]);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Client-side validations
        if (!categoryId || !nameAr.trim() || !nameEn.trim() || !descAr.trim() || !descEn.trim()) return;
        if (!project && !imageFile) return; // Image required only on create

        const formData = new FormData();
        formData.append("category_id", categoryId);
        formData.append("name_ar", nameAr.trim());
        formData.append("name_en", nameEn.trim());
        formData.append("description_ar", descAr.trim());
        formData.append("description_en", descEn.trim());
        if (link.trim()) {
            formData.append("link", link.trim());
        } else {
            formData.append("link", "");
        }

        if (imageFile) {
            formData.append("image", imageFile);
        }

        if (project) {
            // Append status on edit
            formData.append("status", status);
        }

        onSave(formData);
    };

    const isSubmitDisabled = 
        loading ||
        !categoryId ||
        !nameAr.trim() ||
        !nameEn.trim() ||
        !descAr.trim() ||
        !descEn.trim() ||
        (!project && !imageFile);

    return (
        <div className="modal-backdrop-overlay" onClick={onClose}>
            <div className="modal-container-card project-modal-width" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header-nav">
                    <h2>
                        {project 
                            ? t("dashboard.projects.editTitle") || "Edit Project" 
                            : t("dashboard.projects.createTitle") || "Add Project"}
                    </h2>
                    <button className="modal-close-btn" onClick={onClose} aria-label="Close">
                        <FiX size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="modal-body-scrollable">
                        
                        {/* Category Select */}
                        <div className="form-group-field">
                            <label htmlFor="proj-cat">{t("dashboard.projects.form.category") || "Category"}</label>
                            <select 
                                id="proj-cat"
                                required
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                            >
                                <option value="">--</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {isAr ? cat.name_ar : cat.name_en}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Arabic Name */}
                        <div className="form-group-field">
                            <label htmlFor="proj-name-ar">{t("dashboard.projects.form.nameAr") || "Arabic Name"}</label>
                            <input 
                                type="text" 
                                id="proj-name-ar" 
                                required 
                                value={nameAr}
                                onChange={(e) => setNameAr(e.target.value)}
                                placeholder="مثال: موقع دراسي"
                            />
                        </div>

                        {/* English Name */}
                        <div className="form-group-field">
                            <label htmlFor="proj-name-en">{t("dashboard.projects.form.nameEn") || "English Name"}</label>
                            <input 
                                type="text" 
                                id="proj-name-en" 
                                required 
                                value={nameEn}
                                onChange={(e) => setNameEn(e.target.value)}
                                placeholder="e.g. School Website"
                            />
                        </div>

                        {/* Arabic Description */}
                        <div className="form-group-field">
                            <label htmlFor="proj-desc-ar">{t("dashboard.projects.form.descAr") || "Arabic Description"}</label>
                            <textarea 
                                id="proj-desc-ar" 
                                required 
                                rows="3"
                                value={descAr}
                                onChange={(e) => setDescAr(e.target.value)}
                                placeholder="تفاصيل المشروع باللغة العربية..."
                            />
                        </div>

                        {/* English Description */}
                        <div className="form-group-field">
                            <label htmlFor="proj-desc-en">{t("dashboard.projects.form.descEn") || "English Description"}</label>
                            <textarea 
                                id="proj-desc-en" 
                                required 
                                rows="3"
                                value={descEn}
                                onChange={(e) => setDescEn(e.target.value)}
                                placeholder="Project details in English..."
                            />
                        </div>

                        {/* Website Link */}
                        <div className="form-group-field">
                            <label htmlFor="proj-link">{t("dashboard.projects.form.link") || "Website Link (Optional)"}</label>
                            <input 
                                type="url" 
                                id="proj-link" 
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                placeholder="e.g. https://example.com"
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="form-group-field">
                            <label>{t("dashboard.projects.form.image") || "Project Thumbnail"}</label>
                            <div className="image-upload-wrapper">
                                <div className="image-preview-container select-box-size">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="upload-preview-img" />
                                    ) : (
                                        <div className="image-preview-placeholder">
                                            <FiImage size={24} />
                                            <span>{t("dashboard.projects.form.noImage") || "No Image"}</span>
                                        </div>
                                    )}
                                </div>

                                <label htmlFor="proj-image-file" className="file-upload-input-label">
                                    <FiUpload size={16} />
                                    <span>{t("dashboard.categories.form.uploadBtn")}</span>
                                    <input 
                                        type="file" 
                                        id="proj-image-file" 
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden-file-input"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Status Toggle Switch - Only visible in Edit mode */}
                        {project && (
                            <div className="form-group-field">
                                <label>{t("dashboard.common.status") || "Status"}</label>
                                <div className="status-toggle-wrapper">
                                    <span className={`status-toggle-label ${status === 1 ? "active" : ""}`}>
                                        {status === 1 
                                            ? t("dashboard.categories.status.active") 
                                            : t("dashboard.categories.status.inactive")}
                                    </span>
                                    <label className="toggle-switch">
                                        <input 
                                            type="checkbox" 
                                            checked={status === 1}
                                            onChange={(e) => setStatus(e.target.checked ? 1 : 0)}
                                        />
                                        <span className="toggle-slider round" />
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="modal-footer-controls">
                        <button 
                            type="button" 
                            className="modal-btn-cancel" 
                            onClick={onClose} 
                            disabled={loading}
                        >
                            {t("dashboard.common.cancel")}
                        </button>
                        <button 
                            type="submit" 
                            className="modal-btn-confirm-save" 
                            disabled={isSubmitDisabled}
                        >
                            {loading ? (
                                <span className="btn-spinner" />
                            ) : (
                                t("dashboard.common.save")
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
