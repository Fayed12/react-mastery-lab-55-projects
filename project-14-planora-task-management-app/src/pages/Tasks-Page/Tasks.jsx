// local
import styles from './Tasks.module.css';
import { getTasksData } from '../../Redux/tasksSlice';
import { getCategoriesData } from '../../Redux/categoriesSlice';
import MainButton from "../../ui/button/MainButton"
import TaskCard from '../../components/task-card/TaskCard';

import PieChartComponent from '../../components/charts/completePieChart';
import BarChartComponent from '../../components/charts/priorityBarChart';
import HorizontalBarChart from '../../components/charts/categoriesHorizontalBarChart';
import LineChartComponent from '../../components/charts/dateLineChart';

// redux 
import { useSelector } from 'react-redux';

// react router
import { useNavigate } from 'react-router';

// react icons
import { MdAddToPhotos } from "react-icons/md";

const Tasks = () => {
    const tasksData = useSelector(getTasksData)
    const categoriesData = useSelector(getCategoriesData)

    const navigate = useNavigate()

    if (!tasksData) {
        return (
            <div className={styles.emptyBox}>
                <h1>No Tasks Yet</h1>
                <p>Start by creating your first task</p>
                <MainButton title="start create task" content={<>Create new Task <MdAddToPhotos /></>} clickEvent={() => navigate("/dashboard/taskManagement")} />
            </div>
        )
    }

    return (
        <>
            <div className={styles.taskPage}>
                <div className={styles.absoluteButton}>
                    <MainButton title="create task" content={<>Create Task <MdAddToPhotos /></>} clickEvent={() => navigate("/dashboard/taskManagement")} />
                </div>
                <div className={styles.headerTitle}>
                    <h1>Tasks</h1>
                    <p>A quick overview of all tasks and comprehensive statistics</p>
                </div>
                <div className={styles.chartsGrid}>
                    <div className={styles.pieChart}>
                        <PieChartComponent tasks={tasksData} />
                    </div>
                    <div className={styles.barChart}>
                        <BarChartComponent tasks={tasksData} />
                    </div>
                    <div className={styles.heBarChart}>
                        <HorizontalBarChart categories={categoriesData} />
                    </div>
                    <div className={styles.lineChart}>
                        <LineChartComponent tasks={tasksData} />
                    </div>
                </div>
                <div className={styles.filterBar}>
                    <div className={styles.searchBar}>
                        <input type="text" name="search" placeholder='search by title...' />
                    </div>
                    <div className={styles.filterContent}>
                        <div>
                            <select name="completeStatus">
                                <option value="all">All</option>
                                <option value="completed">Done</option>
                                <option value="notCompleted">Pending</option>
                            </select>
                        </div>

                        <div>
                            <select name="priority">
                                <option value="all">all</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.sorted}>
                        <select name="sortBy">
                            <option value="dueDate">Due Date</option>
                            <option value="priority">Priority</option>
                            <option value="CreatedTimeline">Created Timeline</option>
                        </select>
                    </div>
                </div>
                <div className={styles.tasksGrid}>
                    {tasksData.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Tasks; 