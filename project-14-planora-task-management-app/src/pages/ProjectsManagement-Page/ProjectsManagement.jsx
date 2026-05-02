// local
import styles from './ProjectsManagement.module.css';
import { getProjectsData } from '../../Redux/projectsSlice';
import MainButton from '../../ui/button/MainButton';
import ProjectCard from '../../components/projects/project-card/projectCard';
import FilterBar from '../../components/filterBar/filterBarSection';
import Pagination from '../../components/Pagination-footer/Pagination';
import ActionsButtons from '../../components/actions-buttons/actionsButtons';
import ProjectDetails from '../../components/projects/project-details/projectDetails';
import updateData from '../../firebase/updateExistingData';
import deleteItem from '../../firebase/deleteDocument';
import useConfirm from '../../hooks/confirm';
import EmptyBox from '../../components/empty-box/emptyBox';
import CreateNewItem from '../../components/create-edit-new-item/createEditNewItem';

// redux
import { useSelector } from 'react-redux';

// react
import { useState } from 'react';

// react icons
import {
    MdGridView,
    MdViewList,
    MdAdd,
    MdFlag,
    MdDateRange,
    MdLock
} from 'react-icons/md';

const ProjectsManagement = () => {
    const projectsData = useSelector(getProjectsData);

    const confirmAction = useConfirm()

    const [projectsAfterFilter, setProjectsAfterFilter] = useState(projectsData)
    const [openDetailsPopup, setOpenDetailsPopup] = useState(false)
    const [selectedProject, setSelectedProject] = useState(null)
    const [openCreateNewProject, setOpenCreateNewProject] = useState(false)
    const [formAction, setFormAction] = useState("")
    const [editProjectData, setEditProjectData] = useState({})

    // State for UI controls
    const [viewMode, setViewMode] = useState('grid');
    const [currentPage, setCurrentPage] = useState(1);

    // handle delete project
    async function handleDeleteProject(id) {
        const projectToDelete = projectsData.find(p => p.id === id);
        const confirmed = await confirmAction({
            title: "Delete Project?",
            text: `Are you sure you want to delete ${projectToDelete?.title || 'this'} Project?`,
            confirmText: "Yes, delete!",
            cancelText: "Cancel",
        })
        if (confirmed) {
            deleteItem("projects", id)
        } else {
            return
        }
    }

    return (
        <>
            <div className={styles.container}>
                {/* Header Section */}
                <header className={styles.header}>
                    <div className={styles.titleGroup}>
                        <h1 className={styles.title}>All Projects</h1>
                        <p className={styles.subtitle}>Manage your projects effectively</p>
                    </div>

                    <div className={styles.headerActions}>
                        <MainButton
                            type='button'
                            title="Create Project"
                            content={<><MdAdd /> New Project</>}
                            clickEvent={() => { setOpenCreateNewProject(!openCreateNewProject); setFormAction("addNewItem") }}
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
                    <FilterBar originalData={projectsData} setMainData={setProjectsAfterFilter} />
                </>

                <div className={styles.tasksLength}>
                    <p>projects/ <span>{projectsAfterFilter.length}</span></p>
                </div>

                {/* Workspace Section */}
                <div className={styles.workspace}>
                    {!projectsAfterFilter || projectsAfterFilter.length === 0 ?
                        (
                            <EmptyBox title={"Projects"} navigateFunc={() => { setOpenCreateNewProject(!openCreateNewProject); setFormAction("addNewItem") }} />
                        ) :
                        (
                            viewMode === 'grid' ? (
                                <div className={styles.grid}>
                                    {(projectsAfterFilter.slice(0, (10 * currentPage))).map(project => (
                                        <ProjectCard setEditProjectData={setEditProjectData} key={project.id} project={project} openCreateNewProject={openCreateNewProject} setOpenCreateNewProject={setOpenCreateNewProject} setFromAction={setFormAction} />
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.list}>
                                    {projectsAfterFilter.map(project => (
                                        <div key={project.id} className={styles.listRow}>
                                            <div className={styles.rowHeader}>
                                                {(new Date() < new Date(project?.dueDate).getTime() && !project?.isCompleted) && <input type="checkbox" checked={project.isCompleted} className={styles.rowCheckbox} onChange={() => updateData("projects", project.id, { isCompleted: !project.isCompleted })} />}
                                                <span className={`${styles.rowTitle} ${project.isCompleted ? styles.completed : ''}`}>
                                                    {project.title}
                                                </span>
                                            </div>
                                            <div className={`${styles.rowMeta} ${styles.hidden}`}>
                                                <MdFlag style={{
                                                    color: project.priority === 'high' ? 'var(--error-500)' :
                                                        project.priority === 'medium' ? 'var(--warning-500)' : 'var(--success-500)'
                                                }} />
                                                {project.priority}
                                            </div>
                                            <div className={`${styles.rowMeta} ${styles.hidden}`}>
                                                <MdDateRange />
                                                {new Date(project.dueDate).toLocaleDateString()}
                                            </div>
                                            <div className={styles.rowMeta}>
                                                <MdLock />
                                                {project.privacy}
                                            </div>
                                            <div className={styles.actions}>
                                                <ActionsButtons actionType={"project"} setEditTaskData={setEditProjectData} openCreateNewTask={openCreateNewProject} setOpenCreateNewTask={setOpenCreateNewProject} setFromAction={setFormAction} deleteItem={() => handleDeleteProject(project.id)} task={project} setSelectedTask={setSelectedProject} openDetailsPopup={openDetailsPopup} setOpenDetailsPopup={setOpenDetailsPopup} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        )
                    }
                </div>

                {/* Pagination Footer */}
                {projectsAfterFilter.length > 10 ? (
                    <Pagination allData={projectsAfterFilter} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                ) :
                    (
                        <div className={styles.results}>
                            <p>{projectsAfterFilter.length} results </p>
                        </div>
                    )}

            </div>
            {/* this details is exist for the row grid show not to the card */}
            {openDetailsPopup && <ProjectDetails projectData={selectedProject} onClose={() => setOpenDetailsPopup(false)} />}
            {openCreateNewProject && <CreateNewItem formAction={formAction} itemName={"project"} closeFunc={() => setOpenCreateNewProject(!openCreateNewProject)} taskEditDefaultData={editProjectData} />}
        </>
    );
};

export default ProjectsManagement;
