import React from "react";

export default function LoadingSkeleton() {
    return (
        <div className="showcase-skeleton-container">
            {/* Category Filter Skeleton */}
            <div className="skeleton-tabs-container">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="skeleton skeleton-tab-btn" />
                ))}
            </div>

            {/* Grid Skeleton */}
            <div className="build-grid">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="skeleton-card">
                        {/* Image area skeleton */}
                        <div className="skeleton skeleton-image" />
                        <div className="skeleton-card-content">
                            {/* Category badge skeleton */}
                            <div className="skeleton skeleton-badge" />
                            {/* Title skeleton */}
                            <div className="skeleton skeleton-title" />
                            {/* Description skeleton */}
                            <div className="skeleton skeleton-text" />
                            <div className="skeleton skeleton-text short" />
                            {/* Button skeleton */}
                            <div className="skeleton skeleton-btn" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
