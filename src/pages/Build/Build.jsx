import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import useTranslation from "../../hooks/useTranslation";
import { projectService } from "../../services/projectService";
import { categoryService } from "../../services/categoryService";
import { resolveImageUrl } from "../../services/api";
import CategoryFilter from "./CategoryFilter";
import ProjectCard from "./ProjectCard";
import LoadingSkeleton from "./LoadingSkeleton";
import EmptyState from "./EmptyState";
import "./Build.css";

const STATIC_DEFAULT_PROJECTS = [
    {
        id: "p1",
        categoryId: "web",
        title_ar: "سحابة نوفيكا",
        title_en: "Novexa Cloud Platform",
        desc_ar: "لوحة تحكم سحابية للمؤسسات مصممة لضمان الكفاءة وقابلية التوسع.",
        desc_en: "High-performance enterprise SaaS platform with real-time telemetry, interactive analytics dashboards, and multi-tenant security.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        tags: ["React", "Node.js", "Cloud Architecture"],
        link: "https://novexacode.com",
    },
    {
        id: "p2",
        categoryId: "enterprise",
        title_ar: "نظام أيبكس لإدارة العملاء",
        title_en: "Apex Enterprise CRM System",
        desc_ar: "منصة متكاملة لأتمتة العمليات التجارية وتتبع مسارات المبيعات.",
        desc_en: "Custom ERP & CRM solution built for corporate scalability, automated workflows, and complex role-based access management.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        tags: ["TypeScript", "Microservices", "PostgreSQL"],
        link: "https://novexacode.com",
    },
    {
        id: "p3",
        categoryId: "mobile",
        title_ar: "فيلوتشي للتجارة الإلكترونية",
        title_en: "Veloce Mobile Application",
        desc_ar: "متجر إلكتروني فائق السرعة مهيأ بالكامل لتجربة تسوق سلسة.",
        desc_en: "Native cross-platform iOS & Android mobile application delivering ultra-fast UI performance and seamless payment integration.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
        tags: ["React Native", "GraphQL", "Payment Gateway"],
        link: "https://novexacode.com",
    },
];

function Build() {
    const { t, language } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [categories, setCategories] = useState([]);
    const [rawApiProjects, setRawApiProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // Carousel Slider State
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const isArabic = language === "ar";

    // Responsive visible items per slide view
    const [itemsPerPage, setItemsPerPage] = useState(() => {
        if (typeof window === "undefined") return 3;
        if (window.innerWidth < 640) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
    });

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setItemsPerPage(1);
            } else if (window.innerWidth < 1024) {
                setItemsPerPage(2);
            } else {
                setItemsPerPage(3);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const [catsRes, projsRes] = await Promise.allSettled([
                    categoryService.getAllCategories(),
                    projectService.getProjects(),
                ]);

                if (!isMounted) return;

                // Categories
                if (catsRes.status === "fulfilled" && catsRes.value) {
                    const resVal = catsRes.value;
                    const rawCats = Array.isArray(resVal)
                        ? resVal
                        : Array.isArray(resVal?.data)
                        ? resVal.data
                        : Array.isArray(resVal?.data?.data)
                        ? resVal.data.data
                        : [];

                    if (rawCats.length > 0) {
                        const apiCats = rawCats.map((c) => ({
                            id: String(c.id || c._id),
                            label_ar: c.name_ar || c.name || c.name_en,
                            label_en: c.name_en || c.name || c.name_ar,
                        }));
                        setCategories(apiCats);
                    }
                }

                // Projects
                if (projsRes.status === "fulfilled" && projsRes.value) {
                    const resVal = projsRes.value;
                    const rawProjs = Array.isArray(resVal)
                        ? resVal
                        : Array.isArray(resVal?.data)
                        ? resVal.data
                        : Array.isArray(resVal?.data?.data)
                        ? resVal.data.data
                        : [];

                    if (rawProjs.length > 0) {
                        setRawApiProjects(rawProjs);
                    }
                }
            } catch (err) {
                console.error("API fetch error in Build component", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    // Format Category Options for UI
    const defaultCategoryOptions = [
        { id: "all", label: t("build.categories.all") || (isArabic ? "جميع المشاريع" : "All Projects") },
        { id: "web", label: t("build.categories.web") || (isArabic ? "تطبيقات الويب" : "Web Applications") },
        { id: "mobile", label: t("build.categories.mobile") || (isArabic ? "تطبيقات الجوال" : "Mobile Apps") },
        { id: "enterprise", label: t("build.categories.enterprise") || (isArabic ? "برمجيات المؤسسات" : "Enterprise Software") },
    ];

    const categoryOptions = categories.length > 0
        ? [
            { id: "all", label: t("build.categories.all") || (isArabic ? "جميع المشاريع" : "All Projects") },
            ...categories.map((c) => ({
                id: c.id,
                label: isArabic ? c.label_ar : c.label_en,
            }))
        ]
        : defaultCategoryOptions;

    // Format Projects List for UI
    const formattedProjects = rawApiProjects.length > 0
        ? rawApiProjects.map((p) => {
            const catId = p.category?.id || p.category_id || p.categoryId;
            const categoryName = isArabic
                ? (p.category?.name_ar || "نوفيكسا")
                : (p.category?.name_en || "Novexa");
            return {
                id: String(p.id || p._id),
                categoryId: catId ? String(catId) : "",
                title: isArabic
                    ? p.name_ar || p.title_ar || p.name || p.title
                    : p.name_en || p.title_en || p.name || p.title,
                description: isArabic
                    ? p.desc_ar || p.description_ar || p.description
                    : p.desc_en || p.description_en || p.description,
                image: resolveImageUrl(p.image || p.thumbnail) || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
                tags: p.tags
                    ? (Array.isArray(p.tags) ? p.tags : p.tags.split(","))
                    : [categoryName],
                link: p.link || p.url || "#",
            };
        })
        : STATIC_DEFAULT_PROJECTS.map((p) => ({
            id: p.id,
            categoryId: p.categoryId,
            title: isArabic ? p.title_ar : p.title_en,
            description: isArabic ? p.desc_ar : p.desc_en,
            image: p.image,
            tags: p.tags,
            link: p.link,
        }));

    // Strict Filter Logic
    const filteredProjects = selectedCategory === "all"
        ? formattedProjects
        : formattedProjects.filter((p) => String(p.categoryId) === String(selectedCategory));

    // Reset carousel index when category filter changes
    const handleCategorySelect = (catId) => {
        setSelectedCategory(catId);
        setCurrentIndex(0);
    };

    // Calculate carousel bounds
    const maxIndex = Math.max(0, filteredProjects.length - itemsPerPage);

    useEffect(() => {
        if (currentIndex > maxIndex) {
            setCurrentIndex(maxIndex);
        }
    }, [filteredProjects.length, itemsPerPage, maxIndex, currentIndex]);

    // Navigation methods
    const handleNext = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    // Auto flip slider every 4.5 seconds
    useEffect(() => {
        if (isPaused || filteredProjects.length <= itemsPerPage) return;
        const interval = setInterval(() => {
            handleNext();
        }, 4500);
        return () => clearInterval(interval);
    }, [currentIndex, isPaused, filteredProjects.length, itemsPerPage, maxIndex]);

    // Touch gesture navigation
    const handleTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 40;
        const isRightSwipe = distance < -40;

        if (isArabic) {
            if (isLeftSwipe) handlePrev();
            if (isRightSwipe) handleNext();
        } else {
            if (isLeftSwipe) handleNext();
            if (isRightSwipe) handlePrev();
        }
    };

    return (
        <section className="build" id="projects">
            <div className="build__container">
                <div className="build__header text-center">
                    <span className="build__badge">{t("projects.title")}</span>
                    <h2 className="build__title">{t("build.title")}</h2>
                    <p className="build__subtitle">{t("build.subtitle")}</p>
                </div>

                <CategoryFilter
                    categories={categoryOptions}
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleCategorySelect}
                />

                {loading ? (
                    <LoadingSkeleton />
                ) : filteredProjects.length === 0 ? (
                    <EmptyState onResetFilter={handleCategorySelect} />
                ) : (
                    <div 
                        className="build__slider-wrapper"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {filteredProjects.length > itemsPerPage && (
                            <>
                                <button 
                                    className="build__slider-btn build__slider-btn--prev"
                                    onClick={isArabic ? handleNext : handlePrev}
                                    aria-label="Previous Project"
                                >
                                    {isArabic ? <FiChevronRight size={24} /> : <FiChevronLeft size={24} />}
                                </button>
                                <button 
                                    className="build__slider-btn build__slider-btn--next"
                                    onClick={isArabic ? handlePrev : handleNext}
                                    aria-label="Next Project"
                                >
                                    {isArabic ? <FiChevronLeft size={24} /> : <FiChevronRight size={24} />}
                                </button>
                            </>
                        )}

                        <div className="build__slider-viewport">
                            <div 
                                className="build__slider-track"
                                style={{
                                    gap: itemsPerPage === 1 ? "0rem" : "1.5rem",
                                    transform: itemsPerPage === 1 
                                        ? `translateX(-${currentIndex * 100}%)`
                                        : `translateX(calc(-1 * ${currentIndex} * (${100 / itemsPerPage}% + ${1.5 / itemsPerPage}rem)))`,
                                }}
                            >
                                {filteredProjects.map((project) => (
                                    <div 
                                        key={project.id}
                                        className="build__slider-item"
                                        style={{
                                            flex: itemsPerPage === 1 
                                                ? "0 0 100%" 
                                                : `0 0 calc(${100 / itemsPerPage}% - ${(1.5 * (itemsPerPage - 1)) / itemsPerPage}rem)`,
                                            maxWidth: itemsPerPage === 1 
                                                ? "100%" 
                                                : `calc(${100 / itemsPerPage}% - ${(1.5 * (itemsPerPage - 1)) / itemsPerPage}rem)`,
                                            width: "100%",
                                        }}
                                    >
                                        <ProjectCard project={project} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {filteredProjects.length > itemsPerPage && (
                            <div className="build__slider-controls">
                                <button 
                                    className="mobile-slider-nav-btn"
                                    onClick={isArabic ? handleNext : handlePrev}
                                    aria-label="Previous Project"
                                >
                                    {isArabic ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
                                </button>

                                <div className="build__slider-dots">
                                    {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                                        <button
                                            key={idx}
                                            className={`build__slider-dot ${idx === currentIndex ? "active" : ""}`}
                                            onClick={() => setCurrentIndex(idx)}
                                            aria-label={`Go to slide ${idx + 1}`}
                                        />
                                    ))}
                                </div>

                                <button 
                                    className="mobile-slider-nav-btn"
                                    onClick={isArabic ? handlePrev : handleNext}
                                    aria-label="Next Project"
                                >
                                    {isArabic ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}

export default Build;