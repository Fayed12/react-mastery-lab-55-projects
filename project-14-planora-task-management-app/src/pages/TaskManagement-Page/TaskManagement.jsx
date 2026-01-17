// local
import styles from './TaskManagement.module.css';
import { getTasksData } from '../../Redux/tasksSlice';
import MainButton from '../../ui/button/MainButton';
import TaskCard from '../../components/task-card/TaskCard';
import FilterBar from '../../components/filterBar/filterBarSection';
import updateData from '../../firebase/updateExistingData';
import Pagination from '../../components/Pagination-footer/Pagination';
import ActionsButtons from '../../components/actions-buttons/actionsButtons';
import TaskDetails from '../../components/task-details/taskDetails';

// redux
import { useSelector } from 'react-redux';

// react
import { useState } from 'react';

// react router
import { useNavigate } from 'react-router';

// react icons
import {
    MdGridView,
    MdViewList,
    MdAdd,
    MdNavigateBefore,
    MdNavigateNext,
    MdFlag,
    MdDateRange,
    MdLock
} from 'react-icons/md';
import EmptyBox from '../../components/empty-box/emptyBox';

const TaskManagement = () => {
    const tasksData = useSelector(getTasksData);

    const [tasksAfterFilter, setTasksAfterFilter] = useState(tasksData)
    const [openDetailsPopup, setOpenDetailsPopup] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)
    const navigate = useNavigate()

    // State for UI controls
    const [viewMode, setViewMode] = useState('grid');
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <>
            <div className={styles.container}>
                {/* Header Section */}
                <header className={styles.header}>
                    <div className={styles.titleGroup}>
                        <h1 className={styles.title}>All Tasks</h1>
                        <p className={styles.subtitle}>Manage your tasks effectively</p>
                    </div>

                    <div className={styles.headerActions}>
                        <MainButton
                            type='button'
                            title="Create Task"
                            content={<><MdAdd /> New Task</>}
                        />

                        <div className={styles.viewToggle}>
                            <button
                                className={`${styles.toggleBtn} ${viewMode === 'grid' ? styles.active : ''}`}
                                onClick={() => setViewMode('grid')}
                                title="Grid View"
                            >
                                <MdGridView />
                            </button>
                            <button
                                className={`${styles.toggleBtn} ${viewMode === 'list' ? styles.active : ''}`}
                                onClick={() => setViewMode('list')}
                                title="List View"
                            >
                                <MdViewList />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Controls Section (Search & Filters) */}
                <>
                    <FilterBar originalData={tasksData} setMainData={setTasksAfterFilter} />
                </>

                <div className={styles.tasksLength}>
                    <p>tasks/ <span>{tasksData.length}</span></p>
                </div>

                {/* Workspace Section */}
                <div className={styles.workspace}>
                    {!tasksAfterFilter || tasksAfterFilter.length === 0 ?
                        (
                            <EmptyBox title={"Tasks"} navigateFunc={() => navigate("/dashboard/taskManagement")} />
                        ) :
                        (
                            viewMode === 'grid' ? (
                                <div className={styles.grid}>
                                    {tasksAfterFilter.map(task => (
                                        <TaskCard key={task.id} task={task} />
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.list}>
                                    {tasksAfterFilter.map(task => (
                                        <div key={task.id} className={styles.listRow}>
                                            <div className={styles.rowHeader}>
                                                <input type="checkbox" checked={task.isCompleted} className={styles.rowCheckbox} onChange={() => updateData("tasks", task.id, { isCompleted: !task.isCompleted })} />
                                                <span className={`${styles.rowTitle} ${task.isCompleted ? styles.completed : ''}`}>
                                                    {task.title}
                                                </span>
                                            </div>
                                            <div className={`${styles.rowMeta} ${styles.hidden}`}>
                                                <MdFlag style={{
                                                    color: task.priority === 'high' ? 'var(--error-500)' :
                                                        task.priority === 'medium' ? 'var(--warning-500)' : 'var(--success-500)'
                                                }} />
                                                {task.priority}
                                            </div>
                                            <div className={`${styles.rowMeta} ${styles.hidden}`}>
                                                <MdDateRange />
                                                {new Date(task.dueDate).toLocaleDateString()}
                                            </div>
                                            <div className={styles.rowMeta}>
                                                <MdLock />
                                                {task.privacy}
                                            </div>
                                            <ActionsButtons task={task} setSelectedTask={setSelectedTask} openDetailsPopup={openDetailsPopup} setOpenDetailsPopup={setOpenDetailsPopup} />
                                        </div>
                                    ))}
                                </div>
                            )
                        )
                    }
                </div>

                {/* Pagination Footer */}
                {tasksData.length >= 10 ? (
                    <Pagination allData={tasksData} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                ) :
                    (
                        <div className={styles.results}>
                            <p>{tasksData.length} results </p>
                        </div>
                    )}

            </div>
            {openDetailsPopup && <TaskDetails taskData={selectedTask} onClose={() => setOpenDetailsPopup(false)} />}
        </>
    );
};

export default TaskManagement;
