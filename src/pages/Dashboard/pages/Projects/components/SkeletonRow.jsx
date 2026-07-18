export default function SkeletonRow() {
    return (
        <tr className="skeleton-row-item">
            <td><div className="skeleton-box sk-id" /></td>
            <td><div className="skeleton-box sk-img-thumb" /></td>
            <td><div className="skeleton-box sk-name" /></td>
            <td><div className="skeleton-box sk-name" /></td>
            <td><div className="skeleton-box sk-cat" /></td>
            <td><div className="skeleton-box sk-link" /></td>
            <td><div className="skeleton-box sk-status" /></td>
            <td>
                <div className="skeleton-actions-container">
                    <div className="skeleton-box sk-action-btn" />
                    <div className="skeleton-box sk-action-btn" />
                </div>
            </td>
        </tr>
    );
}
