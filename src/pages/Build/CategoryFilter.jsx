import useTranslation from "../../hooks/useTranslation";

/**
 * CategoryFilter — horizontal pill-style filter bar.
 * Categories come from the API; "All" is always prepended.
 */
export default function CategoryFilter({ categories, selected, onSelect }) {
    const { t, language } = useTranslation();
    const isAr = language === "ar";

    const activeCategories = Array.isArray(categories) ? categories : [];

    return (
        <div className="showcase-tabs-container" data-aos="fade-up" data-aos-delay="100">
            {/* "All" pill */}
            <button
                id="filter-all"
                className={`showcase-tab-btn ${String(selected).toLowerCase() === "all" ? "active" : ""}`}
                onClick={() => onSelect("all")}
            >
                {t("projects.showcase.all") || "All"}
            </button>

            {/* Dynamic category pills */}
            {activeCategories.map((cat) => (
                <button
                    key={cat.id}
                    id={`filter-cat-${cat.id}`}
                    className={`showcase-tab-btn ${String(selected) === String(cat.id) ? "active" : ""}`}
                    onClick={() => onSelect(cat.id)}
                >
                    {isAr ? cat.name_ar : cat.name_en}
                </button>
            ))}
        </div>
    );
}
