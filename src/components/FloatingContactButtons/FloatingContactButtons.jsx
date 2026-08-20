import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import useTranslation from "../../hooks/useTranslation";
import "./FloatingContactButtons.css";

export default function FloatingContactButtons() {
    const { language } = useTranslation();
    const isArabic = language === "ar";

    const phoneNumber = "+201036874108";
    const whatsappMsg = isArabic
        ? "مرحباً نوفيكسا، أود الاستفسار عن خدمات البرمجة وتطوير الأنظمة."
        : "Hello Novexa, I would like to inquire about your software development services.";

    const whatsappUrl = `https://wa.me/201036874108?text=${encodeURIComponent(whatsappMsg)}`;
    const phoneUrl = `tel:${phoneNumber}`;

    return (
        <div className="floating-contact-buttons">
            {/* WhatsApp Floating Button */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="floating-btn floating-btn--whatsapp"
                aria-label="Contact us on WhatsApp"
            >
                <FaWhatsapp className="floating-btn-icon" />
                <span className="floating-btn-tooltip">
                    {isArabic ? "محادثة واتساب مباشرة" : "Chat on WhatsApp"}
                </span>
                <span className="floating-btn-pulse" />
            </a>

            {/* Phone Call Floating Button */}
            <a
                href={phoneUrl}
                className="floating-btn floating-btn--phone"
                aria-label="Call us now"
            >
                <FiPhoneCall className="floating-btn-icon" />
                <span className="floating-btn-tooltip">
                    {isArabic ? "اتصال هاتفي مباشر" : "Call Us Now"}
                </span>
            </a>
        </div>
    );
}
