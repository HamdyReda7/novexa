import React from "react";

function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
    return (
        <div className="category-filter">
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    type="button"
                    className={`category-filter__btn ${selectedCategory === cat.id ? "category-filter__btn--active" : ""}`}
                    onClick={() => onSelectCategory(cat.id)}
                >
                    {cat.label}
                </button>
            ))}
        </div>
    );
}

export default CategoryFilter;
