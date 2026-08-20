import React, { useState } from "react";
import { FiMail, FiPhone, FiClock, FiSend, FiCheckCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import useTranslation from "../../hooks/useTranslation";
import "./ContactUs.css";

function ContactUs() {
    const { t } = useTranslation();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        budget: "< $1k",
        details: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
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
                        <div className="contact__whatsapp-box">
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
                        </div>
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
                                <div className="contact__form-row">
                                    <div className="contact__field">
                                        <label htmlFor="name">{t("contactSection.form.name")}</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
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
                                            placeholder={t("contactSection.form.placeholders.phone")}
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="contact__field">
                                        <label htmlFor="budget">{t("contactSection.form.budget")}</label>
                                        <select id="budget" name="budget" value={formData.budget} onChange={handleChange}>
                                            <option value="< $1k">$1k - $5k</option>
                                            <option value="$5k - $10k">$5k - $10k</option>
                                            <option value="$10k - $25k">$10k - $25k</option>
                                            <option value="$25k+">$25k+</option>
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
                                        placeholder={t("contactSection.form.placeholders.details")}
                                        value={formData.details}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button type="submit" className="contact__submit-btn">
                                    <span>{t("contactSection.form.submit")}</span>
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