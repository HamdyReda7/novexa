import { useState, useEffect } from "react";
import { useTranslation } from "../../../../../hooks/useTranslation";
import { FiX, FiUpload, FiImage } from "react-icons/fi";
import { resolveImageUrl } from "../../../../../services/api";

export default function CategoryModal({ isOpen, onClose, onSave, category, loading }) {
    const { t } = useTranslation();

    const [nameAr, setNameAr] = useState("");
    const [nameEn, setNameEn] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [status, setStatus] = useState(1);

    useEffect(() => {
        if (category) {
            setNameAr(category.name_ar || "");
            setNameEn(category.name_en || "");
            setImagePreview(resolveImageUrl(category.image) || null);
            setImageFile(null);
            
            // Handle status from backend
            let initialStatus = 1;
            if (category.status !== undefined && category.status !== null) {
                if (category.status === 0 || category.status === "0" || category.status === false || category.status === "false") {
                    initialStatus = 0;
                }
            }
            setStatus(initialStatus);
        } else {
            setNameAr("");
            setNameEn("");
            setImagePreview(null);
            setImageFile(null);
            setStatus(1); // Default to Active (1) for new categories
        }
    }, [category, isOpen]);

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
        if (!nameAr.trim() || !nameEn.trim()) return;

        const formData = new FormData();
        formData.append("name_ar", nameAr.trim());
        formData.append("name_en", nameEn.trim());
        if (imageFile) {
            formData.append("image", imageFile);
        }
        
        // Append status (1 or 0)
        formData.append("status", status);

        onSave(formData);
    };

    return (
        <div className="modal-backdrop-overlay" onClick={onClose}>
            <div className="modal-container-card category-modal-width" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header-nav">
                    <h2>
                        {category 
                            ? t("dashboard.categories.editTitle") || "Edit Category" 
                            : t("dashboard.categories.createTitle") || "Add Category"}
                    </h2>
                    <button className="modal-close-btn" onClick={onClose} aria-label="Close">
                        <FiX size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="modal-body-scrollable">
                        <div className="form-group-field">
                            <label htmlFor="cat-name-ar">{t("dashboard.categories.form.nameAr") || "Arabic Name"}</label>
                            <input 
                                type="text" 
                                id="cat-name-ar" 
                                required 
                                value={nameAr}
                                onChange={(e) => setNameAr(e.target.value)}
                                placeholder={t("dashboard.categories.form.nameArPlaceholder") || "اسم القسم بالعربية"}
                            />
                        </div>

                        <div className="form-group-field">
                            <label htmlFor="cat-name-en">{t("dashboard.categories.form.nameEn") || "English Name"}</label>
                            <input 
                                type="text" 
                                id="cat-name-en" 
                                required 
                                value={nameEn}
                                onChange={(e) => setNameEn(e.target.value)}
                                placeholder={t("dashboard.categories.form.nameEnPlaceholder") || "Category name in English"}
                            />
                        </div>

                        <div className="form-group-field">
                            <label>{t("dashboard.categories.form.image") || "Category Image (Optional)"}</label>
                            <div className="image-upload-wrapper">
                                <div className="image-preview-container">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="upload-preview-img" />
                                    ) : (
                                        <div className="image-preview-placeholder">
                                            <FiImage size={24} />
                                            <span>{t("dashboard.categories.form.noImage") || "No Image"}</span>
                                        </div>
                                    )}
                                </div>

                                <label htmlFor="cat-image-file" className="file-upload-input-label">
                                    <FiUpload size={16} />
                                    <span>{t("dashboard.categories.form.uploadBtn") || "Choose Image"}</span>
                                    <input 
                                        type="file" 
                                        id="cat-image-file" 
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden-file-input"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Status Toggle Switch - Only visible in Edit mode */}
                        {category && (
                            <div className="form-group-field">
                                <label>{t("dashboard.common.status") || "Status"}</label>
                                <div className="status-toggle-wrapper">
                                    <span className={`status-toggle-label ${status === 1 ? "active" : ""}`}>
                                        {status === 1 
                                            ? t("dashboard.categories.status.active") || "Active" 
                                            : t("dashboard.categories.status.inactive") || "Inactive"}
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
                            disabled={loading || !nameAr.trim() || !nameEn.trim()}
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
