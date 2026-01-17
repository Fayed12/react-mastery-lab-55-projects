// local
import styles from "./filterBarSection.module.css"

// react 
import { useEffect, useReducer } from "react";

// reducer function 
function reducer(state, action) {
    switch (action.type) {
        case "setSearchValue":
            return {
                ...state,
                searchValue: action.payload
            }
        case "setAllData":
            return {
                ...state,
                allData: action.payload
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
        case "setPrivacyValue":
            return {
                ...state,
                privacyValue: action.payload
            }
        default:
            return state;
    }
}

function FilterBar({ originalData, setMainData }) {
    const [{ searchValue, allData, completeFilter, priorityFilter, sortKeyValue, privacyValue }, dispatch] = useReducer(reducer, {
        searchValue: "",
        allData: originalData,
        completeFilter: "",
        priorityFilter: "",
        sortKeyValue: "",
        privacyValue: ""
    })

    // handle filter value
    useEffect(() => {
        let filtered = [...originalData];

        // search
        if (searchValue) {
            filtered = filtered.filter(item =>
                item.title.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        // complete filter
        if (completeFilter && completeFilter !== "all") {
            filtered = filtered.filter(item =>
                completeFilter === "completed"
                    ? item.isCompleted
                    : !item.isCompleted
            );
        }

        // privacy filter
        if (privacyValue && privacyValue !== "all") {
            filtered = filtered.filter(item =>
                item.privacy === privacyValue);
        }

        // priority filter
        if (priorityFilter && priorityFilter !== "all") {
            filtered = filtered.filter(item =>
                item.priority === priorityFilter
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

        dispatch({ type: "setAllData", payload: filtered });
    }, [searchValue, completeFilter, priorityFilter, originalData, sortKeyValue, privacyValue]);

    // handle the main data after all data is changed 
    useEffect(() => {
        setMainData(allData)
    }, [allData, setMainData])
    return (
        <>
            <div className={styles.filterBar}>
                <div className={styles.searchBar}>
                    <input type="text" name="search" placeholder='search by title...' value={searchValue} onChange={(e) => dispatch({ type: "setSearchValue", payload: e.target.value })} />
                </div>
                <div className={styles.filterContent}>
                    <div>
                        <select name="completeStatus" value={completeFilter} onChange={(e) => dispatch({ type: "setCompleteFilter", payload: e.target.value })}>
                            <option value="" disabled>Status</option>
                            <option value="all">All</option>
                            <option value="completed">Done</option>
                            <option value="notCompleted">Pending</option>
                        </select>
                    </div>

                    <div>
                        <select name="priority" value={priorityFilter} onChange={(e) => dispatch({ type: "setPriorityFilter", payload: e.target.value })} >
                            <option value="" disabled>Priority</option>
                            <option value="all">All</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                </div>
                <div>
                    <select name='Privacy' value={privacyValue} onChange={(e) => dispatch({ type: "setPrivacyValue", payload: e.target.value })}>
                        <option value="" disabled>Privacy</option>
                        <option value="all">All</option>
                        <option value="private">Private</option>
                        <option value="global">Global</option>
                    </select>
                </div>

                <div className={styles.sorted}>
                    <select name="sortBy" value={sortKeyValue} onChange={(e) => dispatch({ type: "setSortKeyValue", payload: e.target.value })}>
                        <option value="" disabled>Sort By</option>
                        <option value="dueDate">Due Date</option>
                        <option value="priority">Priority</option>
                        <option value="CreatedTimeline">Created Timeline</option>
                    </select>
                </div>
            </div>
        </>
    )
}

export default FilterBar