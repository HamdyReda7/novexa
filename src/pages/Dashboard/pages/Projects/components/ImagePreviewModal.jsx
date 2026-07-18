import { FiX } from "react-icons/fi";

export default function ImagePreviewModal({ isOpen, onClose, src, title }) {
    if (!isOpen || !src) return null;

    return (
        <div className="modal-backdrop-overlay" onClick={onClose}>
            <div className="image-preview-modal-card" onClick={(e) => e.stopPropagation()}>
                <button className="preview-close-btn" onClick={onClose} aria-label="Close">
                    <FiX size={24} />
                </button>
                <img src={src} alt={title || "Preview"} className="preview-fullscreen-img" />
            </div>
        </div>
    );
}
