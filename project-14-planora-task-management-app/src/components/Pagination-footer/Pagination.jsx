// local
import styles from "./Pagination.module.css"
import MainButton from "../../ui/button/MainButton";

// react icons
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";

function Pagination({ allData, setCurrentPage, currentPage }) {
    const maxNumber = Math.ceil(allData.length / 10);

    // Placeholder functions for interactivity (visual only for now)
    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(maxNumber, prev + 1))
    };
    const handlePrevPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
    
    return (
        <>
            <footer className={styles.footer}>
                <MainButton
                    title="Previous"
                    content={<MdNavigateBefore />}
                    clickEvent={handlePrevPage}
                    isDisabled={currentPage <= 1}
                />
                <span className={styles.pageNumber}><span title="number of results">{allData.slice(0, (10 * currentPage)).length}R/</span> Page {currentPage}</span>
                <MainButton
                    title="Next"
                    content={<MdNavigateNext />}
                    clickEvent={handleNextPage}
                    isDisabled={currentPage >= maxNumber}
                />
            </footer>
        </>
    )
}

export default Pagination