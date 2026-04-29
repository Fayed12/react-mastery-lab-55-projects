// local
import styles from "./categoryCard.module.css"
import ActionsButtons from "../../actions-buttons/actionsButtons"
import deleteItem from "../../../firebase/deleteDocument"

// react icons
import { MdOutlineCategory, MdStar, MdStarBorder, MdCalendarToday, MdTaskAlt } from "react-icons/md";

const exCategory = {
    id: 'm8H824TcLQvdsg3OrDF4',
    createdAt: '2025-01-02T08:00:00Z',
    linkedTasks: [
        { title: 'open note' },
        { title: 'study TS' },
        { title: 'open note' },
        { title: 'open note' },
        { title: 'Open note' }
    ],
    title: 'Frontend',
    userId: 'QVn1CbUkfqfKFKI1zJwyPkKG8gK2',
    stars: '4',
    description: 'All frontend related tasks'
}

function CategoryCard({ category = exCategory, setEditTaskData, openCreateNewTask, setOpenCreateNewTask, setFromAction }) {
    
    // Fallback to exCategory if category is undefined or missing important fields
    const data = category || exCategory;

    const {
        id,
        title,
        description,
        stars,
        linkedTasks,
        createdAt
    } = data;

    function handleDelete() {
        deleteItem("categories", id)
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

    return (
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
                    <div className={styles.metaItem}>
                        <MdTaskAlt />
                        <span>{linkedTasks?.length || 0} Linked Tasks</span>
                        {linkedTasks?.length > 0 && (
                            <span className={styles.badge}>Active</span>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.date}>
                    <MdCalendarToday />
                    <span>{new Date(createdAt).toLocaleDateString()}</span>
                </div>
                <div style={{minWidth: '120px'}}>
                    <ActionsButtons 
                        task={data} 
                        setEditTaskData={setEditTaskData} 
                        openCreateNewTask={openCreateNewTask} 
                        setOpenCreateNewTask={setOpenCreateNewTask} 
                        setFromAction={setFromAction} 
                        deleteItem={handleDelete} 
                        userRole={"owner"} // Defaulting to owner for category management
                    />
                </div>
            </div>
        </div>
    )
}

export default CategoryCard