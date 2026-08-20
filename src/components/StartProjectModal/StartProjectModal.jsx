import { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";
import { FaRocket } from "react-icons/fa";
import useTranslation from "../../hooks/useTranslation";
import ContactForm from "../ContactForm/ContactForm";
import "./StartProjectModal.css";

export default function StartProjectModal({ isOpen, onClose, onSuccess }) {
    const { t } = useTranslation();
    const modalRef = useRef(null);
    const firstInputRef = useRef(null);
    const previousActiveElementRef = useRef(null);

    // ESC key press handler
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    // Handle body scroll locking and focus management
    useEffect(() => {
        if (isOpen) {
            // Save the currently focused element to restore it when closing
            previousActiveElementRef.current = document.activeElement;
            // Prevent background scroll
            document.body.style.overflow = "hidden";
            
            // Focus the first input automatically
            const timer = setTimeout(() => {
                firstInputRef.current?.focus();
            }, 150);

            return () => {
                clearTimeout(timer);
            };
        } else {
            // Restore body scroll
            document.body.style.overflow = "";
            // Restore focus
            if (previousActiveElementRef.current) {
                previousActiveElementRef.current.focus();
            }
        }
    }, [isOpen]);

    // Click outside modal container to close
    const handleOverlayClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-container" ref={modalRef} role="dialog" aria-modal="true">
                {/* Close button */}
                <button className="modal-close-btn" onClick={onClose} aria-label={t("navbar.closeMenu")}>
                    <FiX size={20} />
                </button>

                {/* Modal Header */}
                <div className="modal-header">
                    <div className="modal-icon-wrapper">
                        <FaRocket className="modal-icon-rocket" />
                    </div>
                    <h3 className="modal-title">{t("startProject.title") || "Start Your Project"}</h3>
                    <p className="modal-subtitle">
                        {t("startProject.description") || "Tell us about your project and we'll contact you shortly."}
                    </p>
                </div>

                {/* Modal Body with ContactForm */}
                <div className="modal-body">
                    <ContactForm 
                        isModal={true} 
                        onSuccess={onSuccess} 
                        firstInputRef={firstInputRef}
                    />
                </div>
            </div>
        </div>
    );
}
