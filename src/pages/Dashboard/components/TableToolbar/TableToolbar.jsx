import { useTranslation } from "../../../../hooks/useTranslation";
import { FiSearch } from "react-icons/fi";
import "./TableToolbar.css";

export default function TableToolbar({
    searchVal,
    onSearchChange,
    filterVal,
    onFilterChange,
    filterOptions = [],
    sortVal,
    onSortChange,
    sortOptions = [],
    searchPlaceholder,
    children
}) {
    const { t } = useTranslation();

    return (
        <div className="table-toolbar-container">
            <div className="toolbar-left-side">
                {/* Search */}
                {onSearchChange && (
                    <div className="toolbar-search-input-wrapper">
                        <FiSearch className="toolbar-search-icon" aria-hidden="true" />
                        <input
                            type="search"
                            value={searchVal}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder={searchPlaceholder || t("dashboard.common.search")}
                            className="toolbar-search-field"
                            aria-label={searchPlaceholder || t("dashboard.common.search")}
                        />
                    </div>
                )}

                {/* Filters */}
                {onFilterChange && filterOptions.length > 0 && (
                    <div className="toolbar-select-wrapper">
                        <label htmlFor="toolbar-filter-select" className="sr-only">
                            {t("dashboard.common.filter")}
                        </label>
                        <select
                            id="toolbar-filter-select"
                            value={filterVal}
                            onChange={(e) => onFilterChange(e.target.value)}
                            className="toolbar-select-field"
                        >
                            {filterOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Sorting */}
                {onSortChange && sortOptions.length > 0 && (
                    <div className="toolbar-select-wrapper">
                        <label htmlFor="toolbar-sort-select" className="sr-only">
                            {t("dashboard.common.sort")}
                        </label>
                        <select
                            id="toolbar-sort-select"
                            value={sortVal}
                            onChange={(e) => onSortChange(e.target.value)}
                            className="toolbar-select-field"
                        >
                            {sortOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* Custom CTA Actions */}
            {children && <div className="toolbar-right-side">{children}</div>}
        </div>
    );
}
