// local
import styles from "./projectDetails.module.css"
import MainButton from "../../../ui/button/MainButton";
import { getUserDetails } from "../../../Redux/authUserSlice";
import updateData from "../../../firebase/updateExistingData";
import { getTasksData } from "../../../Redux/tasksSlice";
import TaskDetails from "../../task-details/taskDetails";
import useConfirm from "../../../hooks/confirm";

// redux
import { useSelector } from "react-redux";

// react 
import { useState } from "react";
import ReactDOM from "react-dom";

// react icons
import { MdClose, MdCalendarToday, MdFlag, MdPerson, MdAccessTime, MdLock, MdPublic, MdEdit, MdDelete, MdSentimentVeryDissatisfied, MdSentimentNeutral, MdSentimentSatisfied, MdSentimentVerySatisfied } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";

function ProjectDetails({ projectData, onClose }) {
    const userDetails = useSelector(getUserDetails);
    const tasksData = useSelector(getTasksData);

    const confirmAction = useConfirm()

    const [openEditCommentId, setOpenEditCommentId] = useState(null)
    const [newCommentValue, setNewCommentValue] = useState("")
    const [selectedTaskPopup, setSelectedTaskPopup] = useState(null)


    if (!projectData) return null;

    const {
        id,
        title,
        description,
        priority,
        dueDate,
        isCompleted,
        linkedTasks,
        privacy,
        progress,
        comments,
        createdAt
    } = projectData;

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

    // handle edit comment
    async function handleEditComment(commentId) {
        if (!newCommentValue) {
            console.error("there is no value")
            return;
        }

        const allUpdatedComments = comments?.map((comment) => comment.id === commentId ? { ...comment, content: newCommentValue } : comment)
        await updateData("projects", id, { comments: allUpdatedComments })

        setOpenEditCommentId(null)
    }

    // handle delete comment
    async function handleDeleteComment(commentId) {
        const confirmed = await confirmAction({
            title: "Delete Comment?",
            text: `Are you sure you want to delete this comment?`,
            confirmText: "Yes, delete!",
            cancelText: "Cancel",
        })
        if (confirmed) {
            const allUpdatedComments = comments?.filter((comment) => comment.id !== commentId)

            await updateData("projects", id, { comments: allUpdatedComments })
        } else {
            return
        }
    }

    let progressColor = "var(--error-500)";
        let ProgressIcon = MdSentimentVeryDissatisfied;
    
        if (progress > 25 && progress <= 50) {
            progressColor = "var(--warning-500)";
            ProgressIcon = MdSentimentNeutral;
        } else if (progress > 50 && progress <= 75) {
            progressColor = "var(--info-500)";
            ProgressIcon = MdSentimentSatisfied;
        } else if (progress > 75) {
            progressColor = "var(--success-500)";
            ProgressIcon = MdSentimentVerySatisfied;
        }

    const portalRoot = document.getElementById("portal-root") || document.body;

    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={handleModalClick}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.titleSection}>
                        <h2 className={styles.title}>{title || "Untitled Project"}</h2>
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
                                {description || "No description provided for this project."}
                            </p>
                        </div>
                    </div>

                    {/* Progress indicator */}
                    <div className={styles.section}>
                        <div className={styles.progressHeader}>
                            <span>Overall Progress</span>
                            <div className={styles.progressIconWrapper}>
                                <ProgressIcon style={{ color: progressColor, fontSize: '1.2rem' }} />
                                <span>{progress || 0}%</span>
                            </div>
                        </div>
                        <div className={styles.progressContainer}>
                            <div className={styles.progressBar}>
                                <div className={styles.progressFill} style={{ width: `${progress || 0}%`, backgroundColor: progressColor }}></div>
                            </div>
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

                    {/* Linked Tasks */}
                    {linkedTasks?.length > 0 && (
                        <div className={styles.section}>
                            <h3 className={styles.sectionHeader}>Linked Tasks ({linkedTasks?.length})</h3>
                            <div className={styles.linkedTasksList}>
                                {linkedTasks?.map((task) => {
                                    const taskItem = tasksData?.find(t => t.id === task?.id)
                                    return (
                                        <div
                                            key={taskItem?.id}
                                            className={styles.linkedTaskCard}
                                            onClick={() => setSelectedTaskPopup(taskItem)}
                                        >
                                            <span className={`${styles.linkedTaskTitle} ${taskItem?.isCompleted ? styles.linkedTaskCompleted : ''}`}>
                                                <input type="checkbox" checked={taskItem?.isCompleted} readOnly className={styles.checkbox} style={{ width: '0.9em', height: '0.9em' }} />
                                                {taskItem?.title}
                                            </span>
                                            <span className={styles.linkedTaskPriority} style={{ color: getPriorityColor(taskItem?.priority) }}>
                                                <MdFlag />
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Comments */}
                    <div className={styles.commentsSection}>
                        <h3 className={styles.sectionHeader}>Comments ({comments?.length || 0})</h3>
                        {comments && comments?.length > 0 ? (
                            <div className={styles.commentsContainer}>
                                {comments?.map((comment, index) => (
                                    <div className={styles.commentBox} key={index}>
                                        <div className={styles.userAvatar}>
                                            <span>{comment?.senderName?.split(" ")?.at(0)?.slice(0, 1)?.toUpperCase()}{comment?.senderName?.split(" ")?.at(1)?.slice(0, 1)?.toUpperCase()}</span>
                                        </div>
                                        <div className={styles.content}>
                                            {openEditCommentId !== comment.id ? (
                                                <div className={styles.commentContentWrapper}>
                                                    <p className={styles.commentText}>{comment?.content}</p>
                                                    {userDetails?.id === comment?.senderId && (
                                                        <div className={styles.commentActions}>
                                                            <button
                                                                className={styles.actionBtn}
                                                                onClick={() => { setOpenEditCommentId(comment?.id); setNewCommentValue(comment?.content) }}
                                                                title="Edit"
                                                            >
                                                                <MdEdit />
                                                            </button>
                                                            <button
                                                                className={styles.actionBtn}
                                                                onClick={() => handleDeleteComment(comment.id)}
                                                                title="Delete"
                                                            >
                                                                <MdDelete />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className={styles.editComment}>
                                                    <input
                                                        type="text"
                                                        value={newCommentValue}
                                                        onChange={(e) => setNewCommentValue(e.target.value)}
                                                        autoFocus
                                                    />
                                                    <div className={styles.editActions}>
                                                        <MainButton
                                                            title='Save'
                                                            content={<FaSave />}
                                                            clickEvent={() => handleEditComment(comment.id)}
                                                            variant="primary"
                                                        />
                                                        <MainButton
                                                            title='Cancel'
                                                            content={<IoIosCloseCircleOutline />}
                                                            clickEvent={() => setOpenEditCommentId(null)}
                                                            variant="secondary"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className={styles.noComments}>No comments yet.</p>
                        )}
                    </div>
                </div>
            </div>
            {selectedTaskPopup && <TaskDetails taskData={selectedTaskPopup} onClose={() => setSelectedTaskPopup(null)} />}
        </div>,
        portalRoot
    )
}

export default ProjectDetails;