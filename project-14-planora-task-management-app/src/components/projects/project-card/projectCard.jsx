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
import TaskDetails from "../../task-details/taskDetails"
import { getTasksData } from "../../../Redux/tasksSlice"

// react
import { useMemo, useState } from "react"
import { useSelector } from "react-redux"

// react icons
import { MdDateRange, MdRemoveRedEye, MdPerson, MdLock, MdPublic, MdFlag, MdSentimentVeryDissatisfied, MdSentimentNeutral, MdSentimentSatisfied, MdSentimentVerySatisfied, MdCheckCircle, MdTaskAlt, MdAdd, MdRemove } from "react-icons/md";
import { TbActivityHeartbeat } from "react-icons/tb";
import { IoIosSend } from "react-icons/io";
import { CiEdit } from "react-icons/ci";

// toast
import toast from "react-hot-toast"

function ProjectCard({ project, setEditProjectData, openCreateNewProject, setOpenCreateNewProject, setFromAction }) {
    const userDetails = useSelector(getUserDetails)
    const tasks = useSelector(getTasksData || [])

    const confirmAction = useConfirm()

    const [openDetailsPopup, setOpenDetailsPopup] = useState(false)
    const [commentValue, setCommentValue] = useState("")
    const [openTasksPopup, setOpenTasksPopup] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)
    const [progressStepValue, setProgressStepValue] = useState(10)

    const { userRole } = useUserRole(project?.access, userDetails?.id)

    const userTasks = useMemo(() => {
        const tasksMap = new Map(tasks.map(t => [t.id, t]));

        return project?.linkedTasks
            ?.map(task => tasksMap.get(task.id))
            .filter(Boolean) || [];
    }, [tasks, project?.linkedTasks]);

    if (!project) return null;

    const {
        id,
        title,
        isCompleted,
        priority,
        dueDate,
        privacy,
        description,
        progress
    } = project;

    const getPriorityColor = (p) => {
        switch (p) {
            case 'high': return 'var(--error-500)';
            case 'medium': return 'var(--warning-500)';
            case 'low': return 'var(--success-500)';
            default: return 'var(--text-500)';
        }
    };

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

    async function handleUpdateProjectProgress(action = "") {
        let newProgress = Number(progress || 0);
        const step = Number(progressStepValue) || 10;
        
        if (action === "increase") {
            newProgress += step;
        } else if (action === "decrease") {
            newProgress -= step;
        }
        
        if (newProgress < 0) newProgress = 0;
        if (newProgress > 100) newProgress = 100;
        
        await updateData("projects", id, { progress: newProgress });
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

                    {isCompleted ? (
                        <div className={styles.completedMessage}>
                            <MdCheckCircle className={styles.completedIcon} />
                            <span>This project has been successfully completed!</span>
                        </div>
                    ) : (
                        <div className={styles.progressContainer}>
                            {userRole !== "viewer" && (
                                <div className={styles.progressActions}>
                                    <input 
                                        type="number" 
                                        className={styles.stepInput} 
                                        value={progressStepValue}
                                        onChange={(e) => setProgressStepValue(e.target.value)}
                                        title="Step size"
                                        min="1"
                                        max="100"
                                    />
                                    <MainButton type="button" content={<MdRemove />} clickEvent={() => handleUpdateProjectProgress("decrease")} />
                                    <MainButton type="button" content={<MdAdd />} clickEvent={() => handleUpdateProjectProgress("increase")} />
                                </div>
                            )}
                            <div className={styles.progressBar}>
                                <div className={styles.progressFill} style={{ width: `${progress || 0}%`, backgroundColor: progressColor }}></div>
                            </div>
                            <span className={styles.progressText} style={{ color: progressColor }}>{progress || 0}%</span>
                            <ProgressIcon style={{ color: progressColor, fontSize: '1.2rem' }} />
                        </div>
                    )}

                    <div className={styles.labels}>
                        {userTasks?.length > 0 ? (
                            <div className={styles.taskCardsContainer}>
                                {userTasks.map((task) => {
                                    if (!task) return null;
                                    return (
                                        <div
                                            key={task.id}
                                            className={styles.taskCard}
                                            onClick={() => {
                                                setSelectedTask(task)
                                                setOpenTasksPopup(true)
                                            }}
                                        >
                                            <MdTaskAlt />
                                            <span className={styles.taskTitle}>{task.title}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <span className={styles.label}>No Tasks Linked</span>
                        )}
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

                    <ActionsButtons actionType="project" userRole={userRole} task={project} setEditTaskData={setEditProjectData} setOpenCreateNewTask={setOpenCreateNewProject} openCreateNewTask={openCreateNewProject} setFromAction={setFromAction} deleteItem={() => handleDeleteProject()} openDetailsPopup={openDetailsPopup} setOpenDetailsPopup={setOpenDetailsPopup} />
                </div>
                {(new Date() < new Date(dueDate).getTime() && !isCompleted) && (
                    <div className={styles.addComment}>
                        <input type="text" placeholder='add comment' value={commentValue} onChange={(e) => setCommentValue(e.target.value)} />
                        <MainButton title='add comment' type='button' content={!commentValue ? <TbActivityHeartbeat /> : <IoIosSend />} clickEvent={() => handleAddComment()} />
                    </div>
                )}

            </div>
            {openDetailsPopup && <ProjectDetails projectData={project} onClose={() => setOpenDetailsPopup(false)} />}
            {userTasks?.length > 0 && openTasksPopup && (
                <TaskDetails taskData={selectedTask} onClose={() => setOpenTasksPopup(false)} />
            )}
        </>
    )
}

export default ProjectCard