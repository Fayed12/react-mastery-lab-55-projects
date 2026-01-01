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

// react
import { useEffect, useReducer } from 'react';

// reducer function 
function reducer(state, action) {

    switch (action.type) {
        case "setSearchValue":
            return {
                ...state,
                searchValue: action.payload
            }
        case "setTasksData":
            return {
                ...state,
                allTasks: action.payload
            }
        case "setCompleteFilter":
            return {
                ...state,
                completeFilter: action.payload
            }
        case "setPriorityFilter":
            return {
                ...state,
                priorityFilter: action.payload
            }
        case "setSortKeyValue":
            return {
                ...state,
                sortKeyValue: action.payload
            }
        default:
            return state;
    }
}

const Tasks = () => {
    const tasksData = useSelector(getTasksData)
    const categoriesData = useSelector(getCategoriesData)
    const [{ searchValue, allTasks, completeFilter, priorityFilter, sortKeyValue }, dispatch] = useReducer(reducer, {
        searchValue: "",
        allTasks: tasksData,
        completeFilter: "all",
        priorityFilter: "all",
        sortKeyValue: "dueDate"
    })

    const navigate = useNavigate()

    // filter value
    useEffect(() => {
        let filtered = [...tasksData];

        // search
        if (searchValue) {
            filtered = filtered.filter(task =>
                task.title.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        // complete filter
        if (completeFilter && completeFilter !== "all") {
            filtered = filtered.filter(task =>
                completeFilter === "completed"
                    ? task.isCompleted
                    : !task.isCompleted
            );
        }

        // priority filter
        if (priorityFilter && priorityFilter !== "all") {
            filtered = filtered.filter(task =>
                task.priority === priorityFilter
            );
        }

        // sort from older 
        if (sortKeyValue === "dueDate") {
            filtered = [...filtered].sort((a, b) =>
                new Date(a.dueDate) - new Date(b.dueDate)
            )
        }

        // sort from modern
        if (sortKeyValue === "CreatedTimeline") {
            filtered = [...filtered].sort((a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
            )
        }

        if (sortKeyValue === "priority") {
            let priorityObj = {
                high: 1,
                medium: 2,
                low: 3,
            }
            filtered = [...filtered].sort((a, b) =>
                priorityObj[a.priority] - priorityObj[b.priority]
            )
        }

        dispatch({ type: "setTasksData", payload: filtered });
    }, [searchValue, completeFilter, priorityFilter, tasksData, sortKeyValue]);


    // make this side effect so when render happen value update
    useEffect(() => {
        dispatch({ type: "setTasksData", payload: tasksData });
    }, [tasksData]);

    if (!tasksData || tasksData.length === 0) {
        return (
            <div className={styles.emptyBox}>
                <h1>No Tasks Yet</h1>
                <p>Start by creating your first task</p>
                <MainButton title="start create task" content={<>Create new Task <MdAddToPhotos /></>} clickEvent={() => navigate("/dashboard/taskManagement")} />
            </div>
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
                <div className={styles.filterBar}>
                    <div className={styles.searchBar}>
                        <input type="text" name="search" placeholder='search by title...' value={searchValue} onChange={(e) => dispatch({ type: "setSearchValue", payload: e.target.value })} />
                    </div>
                    <div className={styles.filterContent}>
                        <div>
                            <select name="completeStatus" value={completeFilter} onChange={(e) => dispatch({ type: "setCompleteFilter", payload: e.target.value })}>
                                <option value="all">All</option>
                                <option value="completed">Done</option>
                                <option value="notCompleted">Pending</option>
                            </select>
                        </div>

                        <div>
                            <select name="priority" value={priorityFilter} onChange={(e) => dispatch({ type: "setPriorityFilter", payload: e.target.value })} >
                                <option value="all">All</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.sorted}>
                        <select name="sortBy" value={sortKeyValue} onChange={(e) => dispatch({ type: "setSortKeyValue", payload: e.target.value })}>
                            <option value="dueDate">Due Date</option>
                            <option value="priority">Priority</option>
                            <option value="CreatedTimeline">Created Timeline</option>
                        </select>
                    </div>
                </div>
                {!allTasks || allTasks.length === 0 ?
                    (
                        <div className={styles.emptyBox}>
                            <h1>No Tasks Yet</h1>
                            <p>Start by creating your first task</p>
                            <MainButton title="start create task" content={<>Create new Task <MdAddToPhotos /></>} clickEvent={() => navigate("/dashboard/taskManagement")} />
                        </div>
                    )
                    :
                    (
                        <div className={styles.tasksGrid}>
                            {allTasks.map((task) => (
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