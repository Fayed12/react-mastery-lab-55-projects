// local
import styles from './TaskCard.module.css';
import TaskDetails from '../task-details/taskDetails';
import updateData from '../../firebase/updateExistingData';
import { getUserDetails } from '../../Redux/authUserSlice';

// redux
import { useSelector } from 'react-redux';

// react
import { useState } from 'react';

// react icons
import { MdDateRange, MdPerson, MdLock, MdPublic, MdFlag } from "react-icons/md";
import ActionsButtons from '../actions-buttons/actionsButtons';
import { TbActivityHeartbeat } from "react-icons/tb";
import { IoIosSend } from "react-icons/io";
import toast from 'react-hot-toast';
import MainButton from '../../ui/button/MainButton';

const TaskCard = ({ task }) => {
    const [openDetailsPopup, setOpenDetailsPopup] = useState(false)
    const userDetails = useSelector(getUserDetails)
    const [commentValue, setCommentValue] = useState("")

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

    // handle change task complete status
    function handleUpdateTaskData() {
        updateData("tasks", task.id, { isCompleted: !isCompleted })
    }

    // handle add comment to user task 
    async function handleAddComment() {
        if (!commentValue) {
            toast.error("please write your comment before send", { id: "send comment" })
        }

        await updateData("tasks", task.id, { comments: [...task.comments, { senderName: userDetails?.name, senderId: userDetails?.id, content: commentValue, id: crypto.randomUUID(), createdTime: new Date().toISOString() }] })
        toast.success("comment added successfully", { id: "send comment" })
        setCommentValue("")
    }

    return (
        <>
            <div className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            checked={isCompleted}
                            className={styles.checkbox}
                            onChange={() => handleUpdateTaskData()}
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
                            {privacy === 'private' ? <MdLock /> : <MdPublic />}
                            <span>{privacy}</span>
                        </div>
                    </div>

                    <ActionsButtons openDetailsPopup={openDetailsPopup} setOpenDetailsPopup={setOpenDetailsPopup} />
                </div>
                <div className={styles.addComment}>
                    <input type="text" placeholder='add comment' value={commentValue} onChange={(e) => setCommentValue(e.target.value)} />
                    <MainButton title='add comment' type='button' content={!commentValue ? <TbActivityHeartbeat /> : <IoIosSend />} clickEvent={() => handleAddComment()()} />
                </div>
            </div>
            {openDetailsPopup && <TaskDetails taskData={task} onClose={() => setOpenDetailsPopup(false)} />}
        </>
    );
};

export default TaskCard;
