// local
import styles from "./taskDetails.module.css"
import MainButton from "../../ui/button/MainButton";
import { getUserDetails } from "../../Redux/authUserSlice";
import updateData from "../../firebase/updateExistingData";

// redux
import { useSelector } from "react-redux";

// react 
import { useState } from "react";

// react icons
import { MdClose, MdCalendarToday, MdFlag, MdPerson, MdCategory, MdLabel, MdAccessTime, MdLock, MdPublic, MdEdit, MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";


function TaskDetails({ taskData, onClose }) {
    const userDetails = useSelector(getUserDetails);
    const [openEditCommentId, setOpenEditCommentId] = useState(null)
    const [newCommentValue, setNewCommentValue] = useState("")

    // get all task comments and update it by send all comments again

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

    // handle edit comment
    async function handleEditComment(id) {
        if (!newCommentValue) {
            console.error("there is no value")
            return;
        }

        const allUpdatedComments = comments?.map((comment) => comment.id === id ? { ...comment, content: newCommentValue } : comment)
        await updateData("tasks", taskData.id, { comments: allUpdatedComments })

        setOpenEditCommentId(null)
    }

    // handle delete comment
    async function handleDeleteComment(id) {
        const allUpdatedComments = comments?.filter((comment) => comment.id !== id)

        await updateData("tasks", taskData.id, { comments: allUpdatedComments })
    }

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
                            <div className={styles.commentsContainer}>
                                {comments.map((comment, index) => (
                                    <div className={styles.commentBox} key={index}>
                                        <div className={styles.userAvatar}>
                                            <span>{comment.senderName.split(" ").at(0).slice(0, 1).toUpperCase()}{comment.senderName.split(" ").at(1).slice(0, 1).toUpperCase()}</span>
                                        </div>
                                        <div className={styles.content}>
                                            {openEditCommentId !== comment.id ? (
                                                <div className={styles.commentContentWrapper}>
                                                    <p className={styles.commentText}>{comment.content}</p>
                                                    {userDetails.id === comment.senderId && (
                                                        <div className={styles.commentActions}>
                                                            <button
                                                                className={styles.actionBtn}
                                                                onClick={() => { setOpenEditCommentId(comment.id); setNewCommentValue(comment.content) }}
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
        </div>
    )
}

export default TaskDetails;