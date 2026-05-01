// local
import styles from "./categoryCard.module.css"
import ActionsButtons from "../../actions-buttons/actionsButtons"
import deleteItem from "../../../firebase/deleteDocument"
import { getTasksData } from "../../../Redux/tasksSlice";
import updateData from "../../../firebase/updateExistingData";
import TaskDetails from "../../task-details/taskDetails";
import useConfirm from "../../../hooks/confirm";

// react
import { useState } from "react";

// redux
import { useSelector } from "react-redux";

// react icons
import { MdOutlineCategory, MdStar, MdStarBorder, MdCalendarToday, MdTaskAlt } from "react-icons/md";

function CategoryCard({ category = {}, setEditCategoryData, openCreateNewCategory, setOpenCreateNewCategory, setFromAction }) {

    const tasksData = useSelector(getTasksData)

    const confirmAction = useConfirm()

    const [openDetailsPopup, setOpenDetailsPopup] = useState(false)
    const [selectedTask, setSelectedTask] = useState({})

    const data = category;

    const {
        id,
        title,
        description,
        stars,
        linkedTasks,
        createdAt
    } = data;

    async function handleDelete() {
        const confirmed = await confirmAction({
            title: "Delete Category",
            text: `Are you sure you want to delete "${title}" category?`,
            confirmText: "Yes, delete!",
            cancelText: "Cancel",
        })
        if (confirmed) {
            deleteItem("categories", id)
            tasksData.forEach(task => {
                if (task.category?.id === id) {
                    updateData("tasks", task.id, { ...task, category: {} })
                }
            })
        } else {
            return
        }
    }

    const renderStars = () => {
        const starCount = parseInt(stars) || 0;
        return (
            <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((s) => (
                    s <= starCount ? <MdStar key={s} /> : <MdStarBorder key={s} />
                ))}
            </div>
        )
    }

    const handleDetailsPopup = (taskId) => {
        const taskData = tasksData.find((task) => task?.id === taskId)
        setOpenDetailsPopup(true)
        setSelectedTask(taskData)
    }

    return (
        <>

            <div className={styles.categoryCard}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <MdOutlineCategory />
                        {title}
                    </div>
                    {renderStars()}
                </div>

                <div className={styles.body}>
                    <p className={styles.description}>{description}</p>

                    <div className={styles.metaInfo}>
                        {linkedTasks?.length > 0 ? (
                            <div className={styles.taskCardsContainer}>
                                {linkedTasks.map((task) => {
                                    if (!task) return null;
                                    return (
                                        <div
                                            key={task.id}
                                            className={styles.taskCard}
                                            onClick={() => handleDetailsPopup(task.id)}
                                        >
                                            <MdTaskAlt />
                                            <span className={styles.taskTitle}>{task.title}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className={styles.metaItem}>
                                <MdTaskAlt />
                                <span>0 Linked Tasks</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.date}>
                        <MdCalendarToday />
                        <span>{new Date(createdAt).toLocaleDateString()}</span>
                    </div>
                    <div style={{ minWidth: '120px' }}>
                        <ActionsButtons
                            task={data}
                            setEditTaskData={setEditCategoryData}
                            openCreateNewTask={openCreateNewCategory}
                            setOpenCreateNewTask={setOpenCreateNewCategory}
                            setFromAction={setFromAction}
                            deleteItem={handleDelete}
                            actionType={"category"}
                        />
                    </div>
                </div>
            </div>

            {/* Task details popup */}
            {openDetailsPopup && selectedTask && (
                <TaskDetails
                    taskData={selectedTask}
                    onClose={() => setOpenDetailsPopup(false)}
                />
            )}
        </>
    )
}

export default CategoryCard