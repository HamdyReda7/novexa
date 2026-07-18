export default function SkeletonRow() {
    return (
        <tr className="skeleton-row-item">
            <td><div className="skeleton-box sk-id" /></td>
            <td><div className="skeleton-box sk-name" /></td>
            <td><div className="skeleton-box sk-email" /></td>
            <td><div className="skeleton-box sk-phone" /></td>
            <td><div className="skeleton-box sk-budget" /></td>
            <td><div className="skeleton-box sk-status" /></td>
            <td><div className="skeleton-box sk-date" /></td>
            <td>
                <div className="skeleton-actions-container">
                    <div className="skeleton-box sk-action-btn" />
                    <div className="skeleton-box sk-action-btn" />
                </div>
            </td>
        </tr>
    );
}
