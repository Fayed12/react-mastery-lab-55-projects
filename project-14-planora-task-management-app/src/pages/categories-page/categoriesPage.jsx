// local
import styles from "./Categories.module.css"
import CategoryCard from "../../components/categories/category-card/categoryCard"
import MainButton from "../../ui/button/MainButton"
import { getCategoriesData } from "../../Redux/categoriesSlice"
import EmptyBox from "../../components/empty-box/emptyBox"
import Pagination from "../../components/Pagination-footer/Pagination"
import CreateNewItem from "../../components/create-edit-new-item/createEditNewItem"
import FilterBar from '../../components/filterBar/filterBarSection';
import ActionsButtons from "../../components/actions-buttons/actionsButtons"
import deleteItem from "../../firebase/deleteDocument"

// redux 
import { useSelector } from 'react-redux';

// react 
import { useState, useEffect } from 'react';

// react icons
import { MdGridView, MdViewList, MdAdd, MdOutlineCategory, MdStar, MdCalendarToday, MdTaskAlt } from 'react-icons/md';

const exCategory = {
    id: 'm8H824TcLQvdsg3OrDF4',
    createdAt: '2025-01-02T08:00:00Z',
    linkedTasks: [
        { title: 'open note' },
        { title: 'study TS' },
        { title: 'open note' }
    ],
    title: 'Frontend',
    userId: 'QVn1CbUkfqfKFKI1zJwyPkKG8gK2',
    stars: '4',
    description: 'All frontend related tasks'
}

function CategoriesPage() {
    const categoriesData = useSelector(getCategoriesData) || [];

    const [openCreateNewTask, setOpenCreateNewTask] = useState(false)
    const [formAction, setFromAction] = useState("")
    const [editTaskData, setEditTaskData] = useState({})
    
    // UI states
    const initialData = categoriesData.length > 0 ? categoriesData : [exCategory, exCategory, exCategory];
    const [categoriesAfterFilter, setCategoriesAfterFilter] = useState(initialData)
    const [viewMode, setViewMode] = useState('grid');
    const [currentPage, setCurrentPage] = useState(1);

    // Sync state when redux data changes
    useEffect(() => {
        if (categoriesData.length > 0) {
            setCategoriesAfterFilter(categoriesData);
        }
    }, [categoriesData]);

    function handleDeleteCategory(id) {
        deleteItem("categories", id)
    }

    return (
        <>
            <div className={styles.container}>
                {/* Header */}
                <header className={styles.header}>
                    <div className={styles.titleGroup}>
                        <h1 className={styles.title}>All Categories</h1>
                        <p className={styles.subtitle}>Organize and manage your task categories</p>
                    </div>

                    <div className={styles.headerActions}>
                        <MainButton
                            type='button'
                            title="Create Category"
                            content={<><MdAdd /> New Category</>}
                            clickEvent={() => { setOpenCreateNewTask(!openCreateNewTask); setFromAction("addNewItem") }}
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

                {/* Filter section using existing FilterBar */}
                <FilterBar originalData={categoriesData.length > 0 ? categoriesData : [exCategory, exCategory, exCategory]} setMainData={setCategoriesAfterFilter} />

                <div className={styles.tasksLength}>
                    <p>categories/ <span>{categoriesAfterFilter.length}</span></p>
                </div>

                {/* Workspace */}
                <div className={styles.workspace}>
                    {!categoriesAfterFilter || categoriesAfterFilter.length === 0 ? (
                        <EmptyBox title={"Categories"} navigateFunc={() => { setOpenCreateNewTask(!openCreateNewTask); setFromAction("addNewItem") }} />
                    ) : (
                        viewMode === 'grid' ? (
                            <div className={styles.grid}>
                                {(categoriesAfterFilter.slice(0, (10 * currentPage))).map((category, index) => (
                                    <CategoryCard 
                                        key={category.id || index} 
                                        category={category} 
                                        setEditTaskData={setEditTaskData} 
                                        openCreateNewTask={openCreateNewTask} 
                                        setOpenCreateNewTask={setOpenCreateNewTask} 
                                        setFromAction={setFromAction} 
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className={styles.list}>
                                {categoriesAfterFilter.map((category, index) => (
                                    <div key={category.id || index} className={styles.listRow}>
                                        <div className={styles.rowHeader}>
                                            <MdOutlineCategory style={{color: 'var(--primary-500)', fontSize: '1.2rem'}}/>
                                            <span className={styles.rowTitle}>{category.title}</span>
                                        </div>
                                        
                                        <div className={`${styles.rowMeta} ${styles.hidden}`}>
                                            <MdStar style={{color: 'var(--warning-400)'}}/>
                                            {category.stars} Stars
                                        </div>

                                        <div className={`${styles.rowMeta} ${styles.hidden}`}>
                                            <MdTaskAlt />
                                            {category.linkedTasks?.length || 0} Linked
                                        </div>

                                        <div className={`${styles.rowMeta} ${styles.hidden}`}>
                                            <MdCalendarToday />
                                            {new Date(category.createdAt).toLocaleDateString()}
                                        </div>

                                        <div className={styles.actions}>
                                            <ActionsButtons 
                                                setEditTaskData={setEditTaskData} 
                                                openCreateNewTask={openCreateNewTask} 
                                                setOpenCreateNewTask={setOpenCreateNewTask} 
                                                setFromAction={setFromAction} 
                                                deleteItem={() => handleDeleteCategory(category.id)} 
                                                task={category} 
                                                userRole={"owner"}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    )}
                </div>

                {/* Pagination */}
                {categoriesAfterFilter.length > 10 ? (
                    <Pagination allData={categoriesAfterFilter} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                ) : (
                    <div className={styles.results}>
                        <p>{categoriesAfterFilter.length} results</p>
                    </div>
                )}
            </div>

            {/* Render CreateNewItem component if state is true */}
            {openCreateNewTask && <CreateNewItem formAction={formAction} itemName={"category"} closeFunc={() => setOpenCreateNewTask(!openCreateNewTask)} taskEditDefaultData={editTaskData} />}
        </>
    )
}

export default CategoriesPage