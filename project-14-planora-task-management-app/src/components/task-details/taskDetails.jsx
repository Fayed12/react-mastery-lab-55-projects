// local
import styles from "./taskDetails.module.css"
import MainButton from "../../ui/button/MainButton";
import { getUserDetails } from "../../Redux/authUserSlice";

// redux
import { useSelector } from "react-redux";

// react icons
import { MdClose, MdCalendarToday, MdFlag, MdPerson, MdCategory, MdLabel, MdAccessTime, MdLock, MdPublic, MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md";

function TaskDetails({ taskData, onClose }) {
    const userDetails = useSelector(getUserDetails);


    if (!taskData) return null;

    const {
        title,
        description,
        priority,
        dueDate,
        isCompleted,
        labels,
        privacy,
        categories,
        comments,
        createdAt
    } = taskData;

    // Helper to stop propagation so clicking modal doesn't close it
    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    const getPriorityColor = (p) => {
        switch (p) {
            case 'high': return 'var(--error-500)';
            case 'medium': return 'var(--warning-500)';
            case 'low': return 'var(--success-500)';
            default: return 'var(--text-500)';
        }
    };

    // Format date helper
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={handleModalClick}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.titleSection}>
                        <h2 className={styles.title}>{title || "Untitled Task"}</h2>
                        <div className={styles.metaHeader}>
                            <span className={`${styles.statusBadge} ${isCompleted ? styles.statusCompleted : styles.statusPending}`}>
                                {isCompleted ? "Completed" : "In Progress"}
                            </span>
                            {priority && (
                                <span style={{ color: getPriorityColor(priority), display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem', fontWeight: '500' }}>
                                    <MdFlag /> {priority}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className={styles.closeBtnWrapper}>
                        <MainButton
                            title="Close"
                            content={<MdClose />}
                            clickEvent={onClose}
                        />
                    </div>
                </div>

                {/* Body */}
                <div className={styles.body}>
                    {/* Description */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionHeader}>Description</h3>
                        <div className={styles.descriptionContent}>
                            <p className={styles.descriptionText}>
                                {description || "No description provided for this task."}
                            </p>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className={styles.infoGrid}>
                        <div className={styles.infoGroup}>
                            <span className={styles.groupHeader}>Owner</span>
                            <div className={styles.ownerWrapper}>
                                <div className={styles.avatarPlaceholder}>
                                    <MdPerson />
                                </div>
                                <span className={styles.value}>
                                    {userDetails?.name || "You"}
                                </span>
                            </div>
                        </div>

                        <div className={styles.infoGroup}>
                            <span className={styles.groupHeader}>Due Date</span>
                            <div className={styles.valueWrapper}>
                                <MdCalendarToday className={styles.icon} />
                                <span className={styles.value}>{formatDate(dueDate)}</span>
                            </div>
                        </div>

                        <div className={styles.infoGroup}>
                            <span className={styles.groupHeader}>Created</span>
                            <div className={styles.valueWrapper}>
                                <MdAccessTime className={styles.icon} />
                                <span className={styles.value}>{formatDate(createdAt)}</span>
                            </div>
                        </div>

                        <div className={styles.infoGroup}>
                            <span className={styles.groupHeader}>Privacy</span>
                            <div className={styles.valueWrapper}>
                                {privacy === 'private' ? <MdLock className={styles.icon} /> : <MdPublic className={styles.icon} />}
                                <span className={styles.value} style={{ textTransform: 'capitalize' }}>
                                    {privacy || "Public"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Categories & Labels */}
                    {(categories?.length > 0 || labels?.length > 0) && (
                        <div className={styles.gridTwoColumns}>
                            {categories?.length > 0 && (
                                <div className={styles.section}>
                                    <h3 className={styles.sectionHeader}>Categories</h3>
                                    <div className={styles.tagsWrapper}>
                                        {categories.map((cat, idx) => (
                                            <span key={idx} className={styles.categoryTag}>
                                                <MdCategory /> {cat}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {labels?.length > 0 && (
                                <div className={styles.section}>
                                    <h3 className={styles.sectionHeader}>Labels</h3>
                                    <div className={styles.tagsWrapper}>
                                        {labels.map((lbl, idx) => (
                                            <span key={idx} className={styles.labelTag}>
                                                <MdLabel /> {lbl}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Comments */}
                    <div className={styles.commentsSection}>
                        <h3 className={styles.sectionHeader}>Comments ({comments?.length || 0})</h3>
                        {comments && comments.length > 0 ? (
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {comments.map((comment, index) => (
                                    <li key={index} style={{ padding: '0.75rem', backgroundColor: 'var(--bg-100)', borderRadius: 'var(--radius-sm)' }}>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--text-700)' }}>{comment.text || comment}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className={styles.noComments}>No comments yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskDetails;