import React, { useState, useEffect, useRef } from "react";
import { FiStar, FiChevronLeft, FiChevronRight, FiCheckCircle } from "react-icons/fi";
import useTranslation from "../../hooks/useTranslation";
import "./Testimonials.css";

const TESTIMONIALS_DATA = [
    {
        id: 1,
        name: "أحمد عبد الفتاح",
        role: "مدير التكنولوجيا (CTO)",
        company: "Nexus Cloud",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        quote: "شغل نوفيكسا في البنية التحتية والموقع بتاعنا كان بجد ممتاز جداً. اهتمامهم بالسرعة والأمان والأداء فوق الممتاز، والسيستم بقى أسرع وأكفأ بكتير من الأول.",
        tag: "حلول سحابية وفينتك",
    },
    {
        id: 2,
        name: "سارة مجدي",
        role: "رئيسة قسم المنتجات",
        company: "OmniPay",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        quote: "التعامل مع فريق نوفيكسا مريح جداً وباحترافية عالية. سلموا لنا تطبيق الفينتك قبل الميعاد بـ 3 أسابيع وبأعلى جودة ومفيش أي أخطاء.",
        tag: "بنوك وتطبيقات رقمية",
    },
    {
        id: 3,
        name: "مهندس محمود فؤاد",
        role: "المؤسس والرئيس التنفيذي",
        company: "Apex Logistics",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        quote: "نظام الـ ERP اللي نوفيكسا عملوه للمؤسسة بتاعتنا وفر علينا وقت ومجهود كبير جداً، وسهل شغل الأقسام والعمليات اليومية بشكل غير عادي.",
        tag: "أنظمة شركات ERP",
    },
    {
        id: 4,
        name: "د. طارق السعيد",
        role: "مدير هندسة البرمجيات",
        company: "Veloce",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        quote: "التطبيق سلس وسريع جداً وتجربة المستخدم ممتازة، وده عكس في تقييمات العملاء عندنا على الـ App Store وبقى 4.9. نوفيكسا دايماً اختيارنا الأول.",
        tag: "تطبيقات جوال",
    },
    {
        id: 5,
        name: "م. نهى الشريف",
        role: "مديرة التحول الرقمي",
        company: "Aura Health",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        quote: "حلول الذكاء الاصطناعي والأتمتة اللي عملوها أسرعت الرد على العملاء وسهلت الشغل جداً ووفرت أكتر من 45% من التكاليف التشغيلية.",
        tag: "ذكاء اصطناعي وأتمتة",
    },
];

function Testimonials() {
    const { t, language } = useTranslation();
    const isArabic = language === "ar";
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timeoutRef = useRef(null);

    const totalSlides = TESTIMONIALS_DATA.length;

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % totalSlides);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    // Auto-advance carousel every 5 seconds
    useEffect(() => {
        if (!isPaused) {
            timeoutRef.current = setTimeout(() => {
                handleNext();
            }, 5000);
        }
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [activeIndex, isPaused]);

    return (
        <section 
            className="testimonials" 
            id="testimonials"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="testimonials__container">
                <div className="testimonials__header text-center">
                    <span className="testimonials__badge">
                        {t("testimonials.badge") || "آراء العملاء"}
                    </span>
                    <h2 className="testimonials__title">
                        {t("testimonials.title") || "ثقة رواد الأعمال وقادة التكنولوجيا"}
                    </h2>
                    <p className="testimonials__description">
                        {t("testimonials.description") || "تعرف على تجارب عملائنا وكيف ساعدتهم نوفيكسا في تطوير وتوسيع منصاتهم الرقمية."}
                    </p>
                </div>

                {/* Slider Container Wrapper */}
                <div className="testimonials__slider-wrapper">
                    {/* Desktop Navigation Buttons */}
                    <button 
                        className="slider-nav-btn slider-nav-btn--prev desktop-only-btn"
                        onClick={isArabic ? handleNext : handlePrev}
                        aria-label="Previous Testimonial"
                    >
                        {isArabic ? <FiChevronRight size={22} /> : <FiChevronLeft size={22} />}
                    </button>

                    <button 
                        className="slider-nav-btn slider-nav-btn--next desktop-only-btn"
                        onClick={isArabic ? handlePrev : handleNext}
                        aria-label="Next Testimonial"
                    >
                        {isArabic ? <FiChevronLeft size={22} /> : <FiChevronRight size={22} />}
                    </button>

                    {/* Carousel Track */}
                    <div className="testimonials__carousel-track">
                        {TESTIMONIALS_DATA.map((item, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <div 
                                    key={item.id} 
                                    className={`testimonial-card-slide ${isActive ? "activeSlide" : "hiddenSlide"}`}
                                >
                                    <div className="testimonial-card-inner">
                                        <div className="testimonial-card__header">
                                            <div className="testimonial-card__stars">
                                                {[...Array(item.rating)].map((_, i) => (
                                                    <FiStar key={i} className="star-icon filled" />
                                                ))}
                                            </div>
                                            <span className="testimonial-card__tag-pill">{item.tag}</span>
                                        </div>

                                        <p className="testimonial-card__quote">
                                            "{item.quote}"
                                        </p>

                                        <div className="testimonial-card__footer">
                                            <div className="testimonial-card__author-info">
                                                <img 
                                                    src={item.avatar} 
                                                    alt={item.name} 
                                                    className="testimonial-card__avatar"
                                                />
                                                <div className="testimonial-card__meta">
                                                    <div className="testimonial-card__name-row">
                                                        <h4 className="testimonial-card__name">
                                                            {item.name}
                                                        </h4>
                                                        <span className="verified-badge" title="Verified Client">
                                                            <FiCheckCircle size={14} />
                                                        </span>
                                                    </div>
                                                    <span className="testimonial-card__role">
                                                        {item.role} • <strong className="company-name">{item.company}</strong>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile Controls & Dots Indicator */}
                <div className="testimonials__controls-row">
                    <button 
                        className="mobile-nav-btn"
                        onClick={isArabic ? handleNext : handlePrev}
                        aria-label="Previous Testimonial"
                    >
                        {isArabic ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
                    </button>

                    <div className="testimonials__dots">
                        {TESTIMONIALS_DATA.map((_, index) => (
                            <button
                                key={index}
                                className={`slider-dot ${index === activeIndex ? "active" : ""}`}
                                onClick={() => setActiveIndex(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    <button 
                        className="mobile-nav-btn"
                        onClick={isArabic ? handlePrev : handleNext}
                        aria-label="Next Testimonial"
                    >
                        {isArabic ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
