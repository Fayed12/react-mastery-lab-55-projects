// local
import styles from "./projectCard.module.css"
import deleteItem from "../../../firebase/deleteDocument"
import updateData from "../../../firebase/updateExistingData"
import useUserRole from "../../../hooks/userUserRole"
import { getUserDetails } from "../../../Redux/authUserSlice"
import ProjectDetails from "../project-details/projectDetails"
import MainButton from "../../../ui/button/MainButton"
import ActionsButtons from "../../actions-buttons/actionsButtons"
import useConfirm from "../../../hooks/confirm"

// react
import { useState } from "react"
import { useSelector } from "react-redux"

// react icons
import { MdDateRange, MdRemoveRedEye, MdPerson, MdLock, MdPublic, MdFlag } from "react-icons/md";
import { TbActivityHeartbeat } from "react-icons/tb";
import { IoIosSend } from "react-icons/io";
import { CiEdit } from "react-icons/ci";

// toast
import toast from "react-hot-toast"

function ProjectCard({ project, setEditProjectData, openCreateNewProject, setOpenCreateNewProject, setFromAction }) {
    const userDetails = useSelector(getUserDetails)

    const confirmAction = useConfirm()

    const [openDetailsPopup, setOpenDetailsPopup] = useState(false)
    const [commentValue, setCommentValue] = useState("")
    const { userRole } = useUserRole(project?.access, userDetails?.id)

    if (!project) return null;

    const {
        id,
        title,
        isCompleted,
        priority,
        dueDate,
        privacy,
        description,
        progress,
        linkedTasks
    } = project;

    const getPriorityColor = (p) => {
        switch (p) {
            case 'high': return 'var(--error-500)';
            case 'medium': return 'var(--warning-500)';
            case 'low': return 'var(--success-500)';
            default: return 'var(--text-500)';
        }
    };

    function handleUpdateProjectData() {
        updateData("projects", id, { isCompleted: !isCompleted })
    }

    async function handleAddComment() {
        if (!commentValue) {
            toast.error("please write your comment before send", { id: "send comment" })
            return;
        }

        await updateData("projects", id, {
            comments: [...(project.comments || []), {
                senderName: userDetails?.name,
                senderId: userDetails?.id,
                content: commentValue,
                id: crypto.randomUUID(),
                createdTime: new Date().toISOString()
            }]
        })
        toast.success("comment added successfully", { id: "send comment" })
        setCommentValue("")
    }

    async function handleDeleteProject() {
        const confirmed = await confirmAction({
            title: "Delete Project?",
            text: `Are you sure you want to delete "${title}"?`,
            confirmText: "Yes, delete!",
            cancelText: "Cancel",
        })
        if (confirmed) {
            deleteItem("projects", id)
        } else {
            return
        }
    }

    return (
        <>
            <div className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.checkboxWrapper}>
                        {new Date() < new Date(dueDate).getTime() && !isCompleted && userRole !== "viewer" && (
                            <input
                                type="checkbox"
                                checked={isCompleted}
                                className={styles.checkbox}
                                onChange={() => handleUpdateProjectData()}
                            />
                        )}

                        <span className={`${styles.title} ${isCompleted ? styles.completed : ''}`} onClick={() => setOpenDetailsPopup(true)}>
                            {title}
                        </span>
                    </div>
                    <div className={styles.roleContainer}>
                        <div className={styles.role}>
                            <span>role: </span>
                            <span title={userRole}>
                                {userRole === "owner" && <MdPerson />}
                                {userRole === "editor" && <CiEdit />}
                                {userRole === "viewer" && <MdRemoveRedEye />}
                            </span>
                        </div>
                        <div className={styles.priority} style={{ color: getPriorityColor(priority) }}>
                            <MdFlag />
                            <span>{priority}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.body}>
                    <p className={styles.description}>{description}</p>

                    <div className={styles.progressContainer}>
                        <div className={styles.progressBar}>
                            <div className={styles.progressFill} style={{ width: `${progress || 0}%` }}></div>
                        </div>
                        <span className={styles.progressText}>{progress || 0}%</span>
                    </div>

                    <div className={styles.labels}>
                        <span className={styles.label}>
                            {linkedTasks?.length || 0} Tasks Linked
                        </span>
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.metaInfo}>
                        <div className={styles.metaItem} title="Due Date">
                            <MdDateRange />
                            <span>{new Date(dueDate).toLocaleDateString()}</span>
                        </div>
                        <div className={styles.metaItem} title={userRole}>
                            {userRole === "owner" && <MdPerson />}
                            {userRole === "editor" && <CiEdit />}
                            {userRole === "viewer" && <MdRemoveRedEye />}
                            <span>{userRole}</span>
                        </div>
                        <div className={styles.metaItem} title="Privacy">
                            {privacy === 'private' ? <MdLock /> : <MdPublic />}
                            <span>{privacy}</span>
                        </div>

                    </div>

                    <ActionsButtons userRole={userRole} task={project} setEditTaskData={setEditProjectData} setOpenCreateNewTask={setOpenCreateNewProject} openCreateNewTask={openCreateNewProject} setFromAction={setFromAction} deleteItem={() => handleDeleteProject()} openDetailsPopup={openDetailsPopup} setOpenDetailsPopup={setOpenDetailsPopup} />
                </div>
                {(new Date() < new Date(dueDate).getTime() && !isCompleted) && (
                    <div className={styles.addComment}>
                        <input type="text" placeholder='add comment' value={commentValue} onChange={(e) => setCommentValue(e.target.value)} />
                        <MainButton title='add comment' type='button' content={!commentValue ? <TbActivityHeartbeat /> : <IoIosSend />} clickEvent={() => handleAddComment()} />
                    </div>
                )}

            </div>
            {openDetailsPopup && <ProjectDetails projectData={project} onClose={() => setOpenDetailsPopup(false)} />}
        </>
    )
}

export default ProjectCard