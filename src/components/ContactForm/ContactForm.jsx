import { useState } from "react";
import useTranslation from "../../hooks/useTranslation";
import api from "../../services/api";
import { FiSend } from "react-icons/fi";

const getWhatsAppUrl = (data) => {
    const message = `New Project Request

Name:
${data.name}

Email:
${data.email}

Phone:
${data.phone}

Budget:
${data.budget || "N/A"}

Details:
${data.details}`;

    const phoneNumber = "201023838099";
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};

export default function ContactForm({ onSuccess, isModal = false, firstInputRef }) {
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        budget: "",
        details: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ success: null, message: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        setErrors({});
        setSubmitStatus({ success: null, message: "" });

        // Client-side Validation
        const clientErrors = {};
        
        if (!formData.name.trim()) {
            clientErrors.name = t("contactSection.validation.required");
        }
        
        if (!formData.email.trim()) {
            clientErrors.email = t("contactSection.validation.required");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            clientErrors.email = t("contactSection.validation.emailInvalid");
        }
        
        if (!formData.phone.trim()) {
            clientErrors.phone = t("contactSection.validation.required");
        }
        
        if (!formData.details.trim()) {
            clientErrors.details = t("contactSection.validation.required");
        }

        if (Object.keys(clientErrors).length > 0) {
            setErrors(clientErrors);
            return;
        }

        setLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("phone", formData.phone);
            if (formData.budget) {
                formDataToSend.append("budget", formData.budget);
            }
            formDataToSend.append("details", formData.details);

            const response = await api.post("/orders", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (response.data && response.data.success) {
                const successMsg = response.data.message || t("contactSection.success.msg");
                setSubmitStatus({
                    success: true,
                    message: successMsg
                });
                
                // Automatically redirect to WhatsApp with pre-filled message
                const waUrl = getWhatsAppUrl(formData);
                window.open(waUrl, "_blank");

                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    budget: "",
                    details: "",
                });

                if (onSuccess) {
                    onSuccess(successMsg);
                }
            } else {
                setSubmitStatus({
                    success: false,
                    message: response.data?.message || t("contactSection.validation.unexpectedError")
                });
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 422 && error.response.data && error.response.data.errors) {
                    const serverErrors = error.response.data.errors;
                    const backendErrors = {};
                    Object.keys(serverErrors).forEach((key) => {
                        backendErrors[key] = serverErrors[key][0];
                    });
                    setErrors(backendErrors);
                    setSubmitStatus({
                        success: false,
                        message: error.response.data.message || t("contactSection.validation.unexpectedError")
                    });
                } else {
                    setSubmitStatus({
                        success: false,
                        message: error.response.data?.message || t("contactSection.validation.unexpectedError")
                    });
                }
            } else if (error.request) {
                setSubmitStatus({
                    success: false,
                    message: t("contactSection.validation.serverUnreachable")
                });
            } else {
                setSubmitStatus({
                    success: false,
                    message: t("contactSection.validation.unexpectedError")
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Status Banners */}
            {!isModal && submitStatus.success === true && (
                <div className="contact-success-banner">
                    <h4>{t("contactSection.success.title")}</h4>
                    <p>{submitStatus.message}</p>
                </div>
            )}
            {submitStatus.success === false && submitStatus.message && (
                <div className="contact-error-banner">
                    <p>{submitStatus.message}</p>
                </div>
            )}

            <form
                className="contact-form"
                onSubmit={handleSubmit}
                noValidate
            >
                <div className="form-grid">
                    <div className="form-group">
                        <label>{t("contactSection.form.name")}</label>
                        <input
                            ref={firstInputRef}
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={t("contactSection.form.placeholders.name")}
                            disabled={loading}
                        />
                        {errors.name && <span className="field-error-message">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label>{t("contactSection.form.email")}</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={t("contactSection.form.placeholders.email")}
                            disabled={loading}
                        />
                        {errors.email && <span className="field-error-message">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label>{t("contactSection.form.phone")}</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={t("contactSection.form.placeholders.phone")}
                            disabled={loading}
                        />
                        {errors.phone && <span className="field-error-message">{errors.phone}</span>}
                    </div>

                    <div className="form-group">
                        <label>{t("contactSection.form.budget")}</label>
                        <input
                            type="text"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            placeholder={t("contactSection.form.placeholders.budget")}
                            disabled={loading}
                        />
                        {errors.budget && <span className="field-error-message">{errors.budget}</span>}
                    </div>
                </div>

                <div className="form-group">
                    <label>{t("contactSection.form.details")}</label>
                    <textarea
                        rows="6"
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        placeholder={t("contactSection.form.placeholders.details")}
                        disabled={loading}
                    />
                    {errors.details && <span className="field-error-message">{errors.details}</span>}
                </div>

                <button
                    type="submit"
                    className="contact-btn"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="btn-spinner" />
                            <span>{t("contactSection.form.submitting")}</span>
                        </>
                    ) : (
                        <>
                            <FiSend />
                            <span>{t("contactSection.form.submit")}</span>
                        </>
                    )}
                </button>
            </form>
        </>
    );
}
