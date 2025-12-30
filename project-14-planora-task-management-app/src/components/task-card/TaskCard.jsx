// local
import styles from './TaskCard.module.css';

// react icons
import { MdEdit, MdDelete, MdVisibility, MdDateRange, MdPerson, MdLock, MdPublic, MdFlag } from "react-icons/md";

const TaskCard = ({ task }) => {
    const {
        title,
        isCompleted,
        labels,
        priority,
        dueDate,
        privacy,
        description
    } = task;

    // Helper to get priority color
    const getPriorityColor = (p) => {
        switch (p) {
            case 'high': return 'var(--error-500)';
            case 'medium': return 'var(--warning-500)';
            case 'low': return 'var(--success-500)';
            default: return 'var(--text-500)';
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={styles.checkboxWrapper}>
                    <input
                        type="checkbox"
                        checked={isCompleted}
                        readOnly
                        className={styles.checkbox}
                    />
                    <span className={`${styles.title} ${isCompleted ? styles.completed : ''}`}>
                        {title}
                    </span>
                </div>
                <div className={styles.priority} style={{ color: getPriorityColor(priority) }}>
                    <MdFlag />
                    <span>{priority}</span>
                </div>
            </div>

            <div className={styles.body}>
                <p className={styles.description}>{description}</p>
                <div className={styles.labels}>
                    {labels.map((label, index) => (
                        <span key={index} className={styles.label}>
                            {label}
                        </span>
                    ))}
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.metaInfo}>
                    <div className={styles.metaItem} title="Due Date">
                        <MdDateRange />
                        <span>{new Date(dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className={styles.metaItem} title="Owner">
                        <MdPerson />
                        <span>Owner</span>
                    </div>
                    <div className={styles.metaItem} title="Privacy">
                        {privacy === 'private' || privacy === 'privet' ? <MdLock /> : <MdPublic />}
                        <span>{privacy}</span>
                    </div>
                </div>

                <div className={styles.actions}>
                    <button className={styles.actionBtn} title="View Details">
                        <MdVisibility />
                    </button>
                    <button className={styles.actionBtn} title="Edit Task">
                        <MdEdit />
                    </button>
                    <button className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Delete Task">
                        <MdDelete />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
