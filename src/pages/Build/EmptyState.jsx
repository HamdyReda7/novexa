import React from "react";
import { FiFolder, FiGrid } from "react-icons/fi";
import useTranslation from "../../hooks/useTranslation";

export default function EmptyState({ onResetFilter }) {
    const { t, language } = useTranslation();
    const isAr = language === "ar";

    return (
        <div className="showcase-empty-state">
            <div className="empty-state-icon-box">
                <FiFolder className="empty-state-icon" />
            </div>
            <h3 className="empty-state-title">
                {t("projects.showcase.emptyState") || (isAr ? "لم يتم العثور على مشاريع" : "No projects found")}
            </h3>
            <p className="empty-state-desc">
                {isAr
                    ? "لا توجد مشاريع مضافة في هذا التصنيف حالياً."
                    : "No active projects are available in this category at the moment."}
            </p>
            {onResetFilter && (
                <button type="button" className="empty-state-reset-btn" onClick={() => onResetFilter("all")}>
                    <FiGrid />
                    <span>{isAr ? "عرض جميع المشاريع" : "Show All Projects"}</span>
                </button>
            )}
        </div>
    );
}
