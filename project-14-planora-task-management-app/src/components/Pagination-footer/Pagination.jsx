// local
import styles from "./Pagination.module.css"
import MainButton from "../../ui/button/MainButton";

// react icons
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";

function Pagination({ allData, setCurrentPage, currentPage }) {

    // Placeholder functions for interactivity (visual only for now)
    const handleNextPage = () => setCurrentPage(prev => prev + 1);
    const handlePrevPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
    
    return (
        <>
            <footer className={styles.footer}>
                <MainButton
                    title="Previous"
                    content={<MdNavigateBefore />}
                    clickEvent={handlePrevPage}
                />
                <span className={styles.pageNumber}><span title="number of results">{allData.length}R/</span> Page {currentPage}</span>
                <MainButton
                    title="Next"
                    content={<MdNavigateNext />}
                    clickEvent={handleNextPage}
                />
            </footer>
        </>
    )
}

export default Pagination