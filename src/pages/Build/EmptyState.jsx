import React from "react";
import { FiInbox } from "react-icons/fi";
import useTranslation from "../../hooks/useTranslation";

export default function EmptyState() {
    const { t, language } = useTranslation();
    const isAr = language === "ar";

    return (
        <div className="showcase-empty-state" data-aos="fade-up">
            <div className="empty-state-icon-box">
                <FiInbox size={48} className="empty-state-icon" />
            </div>
            <h3 className="empty-state-title">
                {t("projects.showcase.emptyState")}
            </h3>
            <p className="empty-state-desc">
                {isAr
                    ? "لا توجد مشاريع نشطة في هذا القسم حالياً."
                    : "No active projects are available in this category at the moment."}
            </p>
        </div>
    );
}
