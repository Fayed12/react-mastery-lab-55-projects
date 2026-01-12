// local
import styles from './TaskCard.module.css';
import MainButton from "../../ui/button/MainButton"
import TaskDetails from '../task-details/taskDetails';

// react
import { useState } from 'react';

// react icons
import { MdEdit, MdDelete, MdVisibility, MdDateRange, MdPerson, MdLock, MdPublic, MdFlag } from "react-icons/md";

const TaskCard = ({ task }) => {
    const [openDetailsPopup, setOpenDetailsPopup] = useState(false)

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
        <>
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
                        <div className={`${styles.actionBtn} ${styles.infoBtn}`}>
                            <MainButton title='View Details' content={<><MdVisibility /></>} clickEvent={() => setOpenDetailsPopup(!openDetailsPopup)} />
                        </div>
                        <div className={`${styles.actionBtn} ${styles.editBtn}`}>
                            <MainButton title='edit task' content={<><MdEdit /></>} />
                        </div>
                        <div className={`${styles.actionBtn} ${styles.deleteBtn}`}>
                            <MainButton title='delete task' content={<><MdDelete /></>} />
                        </div>
                    </div>
                </div>
            </div>
            {openDetailsPopup && <TaskDetails taskData={task} onClose={() => setOpenDetailsPopup(false)} />}
        </>
    );
};

export default TaskCard;
