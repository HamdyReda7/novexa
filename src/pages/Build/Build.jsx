import { useState, useEffect, useMemo, useCallback } from "react";
import "./Build.css";
import useTranslation from "../../hooks/useTranslation";
import { projectService }  from "../../services/projectService";
import { categoryService } from "../../services/categoryService";
import CategoryFilter from "./CategoryFilter";
import ProjectCard    from "./ProjectCard";
import LoadingSkeleton from "./LoadingSkeleton";
import EmptyState from "./EmptyState";
import { FiRefreshCw, FiAlertTriangle } from "react-icons/fi";

function Build() {
    const { t } = useTranslation();

    /* ── State ─────────────────────────────────────────────────── */
    const [categories,       setCategories]       = useState([]);
    const [projects,         setProjects]         = useState([]);
    const [loading,          setLoading]          = useState(true);
    const [error,            setError]            = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("all");

    /* ── Loaders ────────────────────────────────────────────────── */
    const fetchAll = useCallback(async () => {
        setLoading(true);
        setError(false);
        try {
            const [catRes, projRes] = await Promise.all([
                categoryService.getAllCategories(1),
                projectService.getAllProjects(),
            ]);

            if (catRes && catRes.success && projRes && projRes.success) {
                // Only show active categories (status === 1 or true or "1")
                const activeCats = (catRes.data || []).filter(
                    (c) => c.status === 1 || c.status === true || c.status === "1"
                );
                setCategories(activeCats);

                // Only show active projects (status === 1 or true or "1")
                const activeProj = (projRes.data || []).filter(
                    (p) => p.status === 1 || p.status === true || p.status === "1"
                );
                setProjects(activeProj);
            } else {
                setError(true);
            }
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    /* ── Local filtering — no additional API call ───────────────── */
    const filteredProjects = useMemo(() => {
        if (String(selectedCategory).toLowerCase() === "all") return projects;
        return projects.filter(
            (p) => p.category && String(p.category.id) === String(selectedCategory)
        );
    }, [projects, selectedCategory]);

    /* ── Render ─────────────────────────────────────────────────── */
    return (
        <section className="build section" id="projects">
            <div id="projects-showcase" />
            <div className="container">

                {/* Section header */}
                <div className="section-header" data-aos="fade-up">
                    <span className="section-badge">{t("projects.title")}</span>
                    <h2 className="section-title">{t("projects.title")}</h2>
                    <p className="section-description">{t("projects.description")}</p>
                </div>

                {/* Loading */}
                {loading && <LoadingSkeleton />}

                {/* Error */}
                {!loading && error && (
                    <div className="showcase-error-box">
                        <FiAlertTriangle className="showcase-error-icon" size={32} />
                        <p>{t("projects.showcase.error")}</p>
                        <button className="showcase-retry-btn" onClick={fetchAll}>
                            <FiRefreshCw size={14} />
                            <span>{t("projects.showcase.retry")}</span>
                        </button>
                    </div>
                )}

                {/* Content — only shown when not loading and no error */}
                {!loading && !error && (
                    <>
                        {/* Category filter bar */}
                        <CategoryFilter
                            categories={categories}
                            selected={selectedCategory}
                            onSelect={setSelectedCategory}
                        />

                        {/* Project grid */}
                        {filteredProjects.length === 0 ? (
                            <EmptyState />
                        ) : (
                            <div className="build-grid">
                                {filteredProjects.map((proj, index) => (
                                    <ProjectCard
                                        key={proj.id}
                                        project={proj}
                                        index={index}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}

            </div>
        </section>
    );
}

export default Build;