// local
import styles from "./actionsButton.module.css"
import MainButton from "../../ui/button/MainButton";
import useUserRole from "../../hooks/userUserRole";
import { getUserDetails } from "../../Redux/authUserSlice";

// react router
import { useLocation } from 'react-router';

// react icons
import { MdVisibility } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

// rdux
import { useSelector } from "react-redux";

function ActionsButtons({setEditTaskData, setOpenCreateNewTask, openCreateNewTask, setFromAction, deleteItem, task = {}, setSelectedTask = () => { }, openDetailsPopup, setOpenDetailsPopup }) {
    const locationPath = useLocation().pathname
    const userDetails = useSelector(getUserDetails)
    const {userRole} = useUserRole(task?.access ,userDetails?.id )


    return (
        <>
            <div className={styles.actions}>
                <div className={`${styles.actionBtn} ${styles.infoBtn}`}>
                    <MainButton title='View Details' content={<><MdVisibility /></>} clickEvent={() => { setOpenDetailsPopup(!openDetailsPopup); setSelectedTask(task) }} />
                </div>
                {locationPath === "/dashboard/taskManagement" && (
                    <>
                        <div className={`${styles.actionBtn} ${styles.editBtn}`}>
                            {(userRole === "editor" || userRole === "owner") && (<MainButton title='edit task' content={<><MdEdit /></>} clickEvent={() => { setOpenCreateNewTask(!openCreateNewTask); setFromAction("editItem"); setEditTaskData(task) }} />)}
                        </div>
                        <div className={`${styles.actionBtn} ${styles.deleteBtn}`}>
                            {userRole === "owner" && <MainButton title='delete task' content={<><MdDelete /></>} clickEvent={deleteItem} />}
                        </div>
                    </>
                )}

            </div>
        </>
    )
}

export default ActionsButtons;