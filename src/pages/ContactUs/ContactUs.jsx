import React, { useState } from "react";
import { FiMail, FiPhone, FiClock, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import useTranslation from "../../hooks/useTranslation";
import { messageService } from "../../services/messageService";
import "./ContactUs.css";

function ContactUs() {
    const { t } = useTranslation();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        budget: "1000",
        details: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        setErrorMsg("");

        try {
            const payload = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                budget: Number(formData.budget) || 1000,
                details: formData.details.trim(),
            };

            const response = await messageService.createOrder(payload);

            if (response && (response.success || response.id || response.data)) {
                setIsSubmitted(true);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    budget: "1000",
                    details: "",
                });
                setTimeout(() => setIsSubmitted(false), 6000);
            } else {
                setErrorMsg(response?.message || t("contactSection.validation.unexpectedError"));
            }
        } catch (err) {
            console.error("Submit contact form error:", err);
            setErrorMsg(err?.response?.data?.message || t("contactSection.validation.unexpectedError"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="contact" id="contact">
            <div className="contact__container">
                <div className="contact__header text-center">
                    <span className="contact__badge">{t("contactSection.badge")}</span>
                    <h2 className="contact__title">{t("contactSection.title")}</h2>
                    <p className="contact__description">{t("contactSection.description")}</p>
                </div>

                <div className="contact__grid">
                    {/* Left Info Panel */}
                    <div className="contact__info-panel">
                        <div className="contact__info-card">
                            <div className="contact__info-icon">
                                <FiMail />
                            </div>
                            <div>
                                <span className="contact__info-label">{t("contactSection.info.email.title")}</span>
                                <a href="mailto:info@novexacode.com" className="contact__info-val">info@novexacode.com</a>
                            </div>
                        </div>

                        <div className="contact__info-card">
                            <div className="contact__info-icon">
                                <FiPhone />
                            </div>
                            <div>
                                <span className="contact__info-label">{t("contactSection.info.phone.title")}</span>
                                <a href="tel:+201036874108" className="contact__info-val">+20 103 687 4108</a>
                            </div>
                        </div>

                        <div className="contact__info-card">
                            <div className="contact__info-icon">
                                <FiClock />
                            </div>
                            <div>
                                <span className="contact__info-label">{t("contactSection.info.hours.title")}</span>
                                <span className="contact__info-val">{t("contactSection.info.hours.value")}</span>
                            </div>
                        </div>

                        {/* Direct WhatsApp Callout */}
                        {/* <div className="contact__whatsapp-box">
                            <div className="contact__wa-header">
                                <div className="contact__wa-icon-box">
                                    <FaWhatsapp size={24} />
                                </div>
                                <div className="contact__wa-text-group">
                                    <h4 className="contact__wa-title">{t("contactSection.whatsapp.title")}</h4>
                                    <p className="contact__wa-desc">{t("contactSection.whatsapp.description")}</p>
                                </div>
                            </div>
                            <a 
                                href="https://wa.me/201036874108" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="contact__wa-btn"
                            >
                                <FaWhatsapp size={20} className="contact__wa-btn-icon" />
                                <span>{t("contactSection.whatsapp.buttonText")}</span>
                                <span className="contact__wa-btn-num">(+20 103 687 4108)</span>
                            </a>
                        </div> */}
                    </div>

                    {/* Right Form Card */}
                    <div className="contact__form-card">
                        {isSubmitted ? (
                            <div className="contact__success">
                                <FiCheckCircle className="contact__success-icon" />
                                <h3>{t("contactSection.success.title")}</h3>
                                <p>{t("contactSection.success.msg")}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="contact__form">
                                {errorMsg && (
                                    <div className="contact__error-banner">
                                        <FiAlertCircle className="contact__error-icon" />
                                        <span>{errorMsg}</span>
                                    </div>
                                )}

                                <div className="contact__form-row">
                                    <div className="contact__field">
                                        <label htmlFor="name">{t("contactSection.form.name")}</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            disabled={loading}
                                            placeholder={t("contactSection.form.placeholders.name")}
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="contact__field">
                                        <label htmlFor="email">{t("contactSection.form.email")}</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            disabled={loading}
                                            placeholder={t("contactSection.form.placeholders.email")}
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="contact__form-row">
                                    <div className="contact__field">
                                        <label htmlFor="phone">{t("contactSection.form.phone")}</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            disabled={loading}
                                            placeholder={t("contactSection.form.placeholders.phone")}
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="contact__field">
                                        <label htmlFor="budget">{t("contactSection.form.budget")}</label>
                                        <select id="budget" name="budget" value={formData.budget} onChange={handleChange} disabled={loading}>
                                            <option value="1000">{t("contactSection.form.budgetOptions.option1") || "1,000$ - 5,000$"}</option>
                                            <option value="5000">{t("contactSection.form.budgetOptions.option2") || "5,000$ - 10,000$"}</option>
                                            <option value="10000">{t("contactSection.form.budgetOptions.option3") || "10,000$ - 25,000$"}</option>
                                            <option value="25000">{t("contactSection.form.budgetOptions.option4") || "25,000$+"}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="contact__field">
                                    <label htmlFor="details">{t("contactSection.form.details")}</label>
                                    <textarea
                                        id="details"
                                        name="details"
                                        rows="4"
                                        required
                                        disabled={loading}
                                        placeholder={t("contactSection.form.placeholders.details")}
                                        value={formData.details}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button type="submit" className="contact__submit-btn" disabled={loading}>
                                    <span>{loading ? t("contactSection.form.submitting") : t("contactSection.form.submit")}</span>
                                    <FiSend />
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactUs;