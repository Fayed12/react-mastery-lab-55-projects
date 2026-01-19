// local
import styles from './Tasks.module.css';
import { getTasksData } from '../../Redux/tasksSlice';
import { getCategoriesData } from '../../Redux/categoriesSlice';
import MainButton from "../../ui/button/MainButton"
import TaskCard from '../../components/task-card/TaskCard';
import FilterBar from '../../components/filterBar/filterBarSection';
import EmptyBox from '../../components/empty-box/emptyBox';

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

// react
import { useState } from 'react';

const Tasks = () => {
    const tasksData = useSelector(getTasksData)
    const categoriesData = useSelector(getCategoriesData)
    const [tasksAfterFilter, setTasksAfterFilter] = useState(tasksData)
    const navigate = useNavigate()

    if (!tasksData || tasksData.length === 0) {
        return (
            <EmptyBox title={"tasks"} navigateFunc={() => navigate("/dashboard/taskManagement")}/>
        )
    }

    return (
        <div className={styles.allPage}>
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
                <>
                    <FilterBar originalData={tasksData} setMainData={ setTasksAfterFilter} />
                </>
                {!tasksAfterFilter || tasksAfterFilter.length === 0 ?
                    (
                        <EmptyBox title={"Tasks"} navigateFunc={()=>navigate("/dashboard/taskManagement")}/>
                    )
                    :
                    (
                        <div className={styles.tasksGrid}>
                            {tasksAfterFilter.map((task) => (
                                <TaskCard key={task.id} task={task} />
                            ))}
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default Tasks; 