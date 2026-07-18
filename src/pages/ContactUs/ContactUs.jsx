import "./ContactUs.css";
import useTranslation from "../../hooks/useTranslation";
import { FiMail, FiPhone, FiClock } from "react-icons/fi";
import ContactForm from "../../components/ContactForm/ContactForm";

function Contact() {
    const { t } = useTranslation();

    const contactInfo = [
        {
            icon: FiMail,
            title: t("contactSection.info.email.title"),
            value: t("contactSection.info.email.value"),
        },
        {
            icon: FiPhone,
            title: t("contactSection.info.phone.title"),
            value: t("contactSection.info.phone.value"),
        },
        {
            icon: FiClock,
            title: t("contactSection.info.hours.title"),
            value: t("contactSection.info.hours.value"),
        },
    ];

    return (
        <section className="contact section" id="contact">
            <div className="container">

                <div className="contact-wrapper">

                    {/* Left */}
                    <div
                        className="contact-content"
                        data-aos="fade-right"
                    >
                        <span className="section-badge">
                            {t("contactSection.badge")}
                        </span>

                        <h2 className="section-title">
                            {t("contactSection.title")}
                        </h2>

                        <p className="section-description">
                            {t("contactSection.description")}
                        </p>

                        <div className="contact-info">
                            {contactInfo.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={item.title}
                                        className="info-card"
                                    >
                                        <div className="info-icon">
                                            <Icon />
                                        </div>

                                        <div className="info-content">
                                            <span>
                                                {item.title}
                                            </span>
                                            <h4>
                                                {item.value}
                                            </h4>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right */}
                    <div
                        className="contact-form-wrapper"
                        data-aos="fade-left"
                    >
                        <ContactForm />
                    </div>

                </div>

            </div>
        </section>
    );
}

export default Contact;