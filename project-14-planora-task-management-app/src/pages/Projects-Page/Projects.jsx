// local
import styles from './Projects.module.css';
import { getProjectsData } from '../../Redux/projectsSlice';
import MainButton from '../../ui/button/MainButton';
import EmptyBox from '../../components/empty-box/emptyBox';
import FilterBar from '../../components/filterBar/filterBarSection';
import Pagination from '../../components/Pagination-footer/Pagination';
import ProjectCard from '../../components/projects/project-card/projectCard';

// redux 
import { useSelector } from 'react-redux';

// react router
import { useNavigate } from 'react-router';

// react 
import { useState } from 'react';

import { MdAddToPhotos } from "react-icons/md";
import ProjectPieChart from "../../components/charts/projectPieChart";
import ProjectBarChart from "../../components/charts/projectBarChart";
import ProjectRadialChart from "../../components/charts/projectRadialChart";

const Projects = () => {
    const projectsData = useSelector(getProjectsData)
    const [projectsAfterFilter, setProjectsAfterFilter] = useState(projectsData)
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState(1)

    if (!projectsData || projectsData.length === 0) {
        return (
            <EmptyBox title={"projects"} navigateFunc={() => navigate("/dashboard/projectsManagement")} />
        )
    }

    return (
        <div className={styles.allPage}>
            <div className={styles.projectPage}>
                <div className={styles.absoluteButton}>
                    <MainButton title="create project" content={<>Create Project <MdAddToPhotos /></>} clickEvent={() => navigate("/dashboard/projectsManagement")} />
                </div>
                <div className={styles.headerTitle}>
                    <h1>Projects</h1>
                    <p>A quick overview of all projects and comprehensive statistics</p>
                </div>
                <div className={styles.chartsGrid}>
                    <div className={styles.pieChart}>
                        <ProjectPieChart projects={projectsData} />
                    </div>
                    <div className={styles.barChart}>
                        <ProjectBarChart projects={projectsData} />
                    </div>
                    <div className={styles.radialChart}>
                        <ProjectRadialChart projects={projectsData} />
                    </div>
                </div>
                <>
                    <FilterBar originalData={projectsData} setMainData={setProjectsAfterFilter} />
                </>
                {!projectsAfterFilter || projectsAfterFilter.length === 0 ?
                    (
                        <EmptyBox title={"Projects"} navigateFunc={() => navigate("/dashboard/projectsManagement")} />
                    )
                    :
                    (
                        <>
                            <div className={styles.projectsGrid}>
                                {projectsAfterFilter.slice((currentPage - 1) * 10, currentPage * 10).map((project) => (
                                    <ProjectCard key={project.id} project={project} />
                                ))}
                            </div>
                            {projectsAfterFilter.length > 10 && (
                                <Pagination allData={projectsAfterFilter} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                            )}
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default Projects;
