// local
import styles from "./actionsButton.module.css"
import MainButton from "../../ui/button/MainButton";

// react router
import { useLocation } from 'react-router';

// react icons
import { MdVisibility } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function ActionsButtons({ setEditTaskData, setOpenCreateNewTask, openCreateNewTask, setFromAction, deleteItem, task = {}, setSelectedTask = () => { }, openDetailsPopup, setOpenDetailsPopup }) {
    const locationPath = useLocation().pathname

    return (
        <>
            <div className={styles.actions}>
                <div className={`${styles.actionBtn} ${styles.infoBtn}`}>
                    <MainButton title='View Details' content={<><MdVisibility /></>} clickEvent={() => { setOpenDetailsPopup(!openDetailsPopup); setSelectedTask(task) }} />
                </div>
                {locationPath === "/dashboard/taskManagement" && (
                    <>
                        <div className={`${styles.actionBtn} ${styles.editBtn}`}>
                            <MainButton title='edit task' content={<><MdEdit /></>} clickEvent={() => { setOpenCreateNewTask(!openCreateNewTask); setFromAction("editItem");  setEditTaskData(task)}} />
                        </div>
                        <div className={`${styles.actionBtn} ${styles.deleteBtn}`}>
                            <MainButton title='delete task' content={<><MdDelete /></>} clickEvent={deleteItem}/>
                        </div>
                    </>
                )}

            </div>
        </>
    )
}

export default ActionsButtons;