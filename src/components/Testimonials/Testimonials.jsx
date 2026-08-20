import React, { useState, useEffect, useRef } from "react";
import { FiStar, FiChevronLeft, FiChevronRight, FiCheckCircle } from "react-icons/fi";
import useTranslation from "../../hooks/useTranslation";
import "./Testimonials.css";

const TESTIMONIALS_DATA = [
    {
        id: 1,
        name: "ألكسندر رايت",
        name_en: "Alexander Wright",
        role: "رئيس قطاع التكنولوجيا",
        role_en: "Chief Technology Officer",
        company: "Nexus Cloud",
        company_en: "Nexus Cloud",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        quote: "قامت نوفيكسا بهندسة البنية التحتية السحابية لمنصتنا بالكامل. كان اهتمامهم بالأداء والأمان ودقة الواجهات لا مثيل له. شهدنا زيادة بنسبة 140% في كفاءة النظام.",
        quote_en: "Novexa engineered our entire cloud infrastructure from scratch. Their attention to performance, security, and UI precision was unmatched. We saw a 140% surge in system efficiency.",
        tag: "Fintech & Cloud",
    },
    {
        id: 2,
        name: "سارة لين",
        name_en: "Sarah Lin",
        role: "مديرة المنتجات",
        role_en: "Head of Product",
        company: "OmniPay Global",
        company_en: "OmniPay Global",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        quote: "العمل مع نوفيكسا يشبه امتلاك فريق تطوير من نخبة سيليكون فالي. قاموا بتسليم تطبيق الفينتك الخاص بنا قبل 3 أسابيع من الجدول المحدد بدقة متناهية.",
        quote_en: "Working with Novexa feels like having a Silicon Valley dev team in-house. They delivered our fintech application 3 weeks ahead of schedule with zero compromises.",
        tag: "Digital Banking",
    },
    {
        id: 3,
        name: "ماركوس فانس",
        name_en: "Marcus Vance",
        role: "المؤسس والرئيس التنفيذي",
        role_en: "Founder & CEO",
        company: "Apex Logistics",
        company_en: "Apex Logistics",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        quote: "نظام إدارة المؤسسات المخصص الذي طورته نوفيكسا قام بأتمتة 80% من عملياتنا اليومية. تحقق عائد الاستثمار بالكامل في الربع الأول من الإطلاق.",
        quote_en: "The custom ERP software developed by Novexa automated 80% of our daily operations. We achieved complete ROI within the first quarter of deployment.",
        tag: "Enterprise ERP",
    },
    {
        id: 4,
        name: "دانيال ميلر",
        name_en: "Daniel Miller",
        role: "مدير هندسة البرمجيات",
        role_en: "VP of Software Engineering",
        company: "Veloce Mobility",
        company_en: "Veloce Mobility",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        quote: "واجهات المستخدم الذكية والسرعة الفائقة للتطبيق جعلت عملائنا يمنحوننا تقييم 4.9 على متجر التطبيقات. نوفيكسا هي الشريك التقني الأفضل دائماً.",
        quote_en: "The sleek micro-interactions and blazing speed earned us a 4.9 rating on the App Store. Novexa is our go-to engineering powerhouse.",
        tag: "Mobile App",
    },
    {
        id: 5,
        name: "إيلينا روتشيلد",
        name_en: "Elena Rothschild",
        role: "مديرة الاستراتيجية الرقمية",
        role_en: "Chief Digital Officer",
        company: "Aura Health",
        company_en: "Aura Health",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        quote: "تكاملات الذكاء الاصطناعي التي صممتها نوفيكسا ساهمت في خفض تكاليف خدمة العملاء بنسبة 45% وتوفير تجربة استجابة فورية فائقة السرعة.",
        quote_en: "Novexa's AI automation workflows reduced our customer support latency by 45% while delivering personalized instant recommendations.",
        tag: "AI & Automation",
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
                        {t("testimonials.badge") || (isArabic ? "آراء العملاء" : "Testimonials")}
                    </span>
                    <h2 className="testimonials__title">
                        {t("testimonials.title") || (isArabic ? "ثقة رواد الأعمال وقادة التكنولوجيا" : "Trusted by Tech Leaders")}
                    </h2>
                    <p className="testimonials__description">
                        {t("testimonials.description") || (isArabic ? "تعرف على كيفية توسيع الشركات الرائدة لمنصاتها الرقمية مع نوفيكسا." : "Discover how market leaders scale their digital platforms with Novexa.")}
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
                                            "{isArabic ? item.quote : item.quote_en}"
                                        </p>

                                        <div className="testimonial-card__footer">
                                            <div className="testimonial-card__author-info">
                                                <img 
                                                    src={item.avatar} 
                                                    alt={isArabic ? item.name : item.name_en} 
                                                    className="testimonial-card__avatar"
                                                />
                                                <div className="testimonial-card__meta">
                                                    <div className="testimonial-card__name-row">
                                                        <h4 className="testimonial-card__name">
                                                            {isArabic ? item.name : item.name_en}
                                                        </h4>
                                                        <span className="verified-badge" title="Verified Client">
                                                            <FiCheckCircle size={14} />
                                                        </span>
                                                    </div>
                                                    <span className="testimonial-card__role">
                                                        {isArabic ? item.role : item.role_en} • <strong className="company-name">{isArabic ? item.company : item.company_en}</strong>
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
