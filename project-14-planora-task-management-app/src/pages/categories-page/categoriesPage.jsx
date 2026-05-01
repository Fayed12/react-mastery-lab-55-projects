// local
import styles from "./Categories.module.css"
import CategoryCard from "../../components/categories/category-card/categoryCard"
import MainButton from "../../ui/button/MainButton"
import { getCategoriesData } from "../../Redux/categoriesSlice"
import EmptyBox from "../../components/empty-box/emptyBox"
import Pagination from "../../components/Pagination-footer/Pagination"
import CreateNewItem from "../../components/create-edit-new-item/createEditNewItem"
import ActionsButtons from "../../components/actions-buttons/actionsButtons"
import deleteItem from "../../firebase/deleteDocument"
import useConfirm from "../../hooks/confirm"

// redux 
import { useSelector } from 'react-redux';

// react 
import { useState, useMemo } from 'react';

// react icons
import { MdGridView, MdViewList, MdAdd, MdOutlineCategory, MdStar, MdCalendarToday, MdTaskAlt } from 'react-icons/md';

function CategoriesPage() {
    const categoriesData = useSelector(getCategoriesData);

    const confirmAction = useConfirm()

    const [openCreateNewCategory, setOpenCreateNewCategory] = useState(false)
    const [formAction, setFromAction] = useState("")
    const [searchQuery, setSearchQuery] = useState("");
    const [editCategoryData, setEditCategoryData] = useState({})
    const [viewMode, setViewMode] = useState('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const [starsFilter, setStarsFilter] = useState("all");

    const categoriesAfterFilter = useMemo(() => {
        if (!categoriesData) return [];

        return categoriesData.filter(cat => {
            const matchSearch =
                cat.title
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase());

            const matchStars =
                starsFilter === "all" ||
                String(cat.stars) === starsFilter;

            return matchSearch && matchStars;
        }) || categoriesData;
    }, [categoriesData, searchQuery, starsFilter]);


    // handle delete category
    async function handleDeleteCategory(id) {
        const confirmed = await confirmAction({
            title: "Delete Category?",
            text: `Are you sure you want to delete this category?`,
            confirmText: "Yes, delete!",
            cancelText: "Cancel",
        })
        if (confirmed) {
            deleteItem("categories", id)
        } else {
            return
        }
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
                            clickEvent={() => { setOpenCreateNewCategory(!openCreateNewCategory); setFromAction("addNewItem") }}
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

                {/* Filter section */}
                <div className={styles.filterSection}>
                    <div className={styles.filterGroup} style={{ flex: 1 }}>
                        <input
                            type="text"
                            className={styles.searchInput}
                            placeholder="Search categories by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>Stars:</label>
                        <select
                            className={styles.selectFilter}
                            value={starsFilter}
                            onChange={(e) => setStarsFilter(e.target.value)}
                        >
                            <option value="all">All</option>
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                            <option value="0">0 Stars</option>
                        </select>
                    </div>
                </div>

                <div className={styles.tasksLength}>
                    <p>categories/ <span>{categoriesAfterFilter.length}</span></p>
                </div>

                {/* Workspace */}
                <div className={styles.workspace}>
                    {!categoriesAfterFilter || categoriesAfterFilter.length === 0 ? (
                        <EmptyBox title={"Categories"} navigateFunc={() => { setOpenCreateNewCategory(!openCreateNewCategory); setFromAction("addNewItem") }} />
                    ) : (
                        viewMode === 'grid' ? (
                            <div className={styles.grid}>
                                {(categoriesAfterFilter.slice(0, (10 * currentPage))).map((category, index) => (
                                    <CategoryCard
                                        key={category.id || index}
                                        category={category}
                                        setEditCategoryData={setEditCategoryData}
                                        openCreateNewCategory={openCreateNewCategory}
                                        setOpenCreateNewCategory={setOpenCreateNewCategory}
                                        setFromAction={setFromAction}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className={styles.list}>
                                {categoriesAfterFilter.map((category, index) => (
                                    <div key={category.id || index} className={styles.listRow}>
                                        <div className={styles.rowHeader}>
                                            <MdOutlineCategory style={{ color: 'var(--primary-500)', fontSize: '1.2rem' }} />
                                            <span className={styles.rowTitle}>{category.title}</span>
                                        </div>

                                        <div className={`${styles.rowMeta} ${styles.hidden}`}>
                                            <MdStar style={{ color: 'var(--warning-400)' }} />
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
                                                setEditTaskData={setEditCategoryData}
                                                openCreateNewTask={openCreateNewCategory}
                                                setOpenCreateNewTask={setOpenCreateNewCategory}
                                                setFromAction={setFromAction}
                                                deleteItem={() => handleDeleteCategory(category.id)}
                                                task={category}
                                                actionType="category"
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
            {openCreateNewCategory && <CreateNewItem formAction={formAction} itemName={"category"} closeFunc={() => setOpenCreateNewCategory(!openCreateNewCategory)} taskEditDefaultData={editCategoryData} />}
        </>
    )
}

export default CategoriesPage