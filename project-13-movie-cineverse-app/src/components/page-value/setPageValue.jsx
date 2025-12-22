// local
import styles from "./setPageValue.module.css"

function SetPageValue({ page, totalPages, setPage }) {

    function handleIncreasePageNumber() {
        if (page >= totalPages) {
            return;
        } else {
            setPage(prev => prev + 1)
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // handle decrease page number
    function handleDecreasePageNumber() {
        if (page === 1) {
            return
        } else {
            setPage(prev => prev - 1)
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    return (
        <>
            <div className={styles.page}>
                <div>
                    <button
                        className={styles.pageButton}
                        onClick={handleDecreasePageNumber}
                        disabled={page === 1}
                    >
                        -
                    </button>
                    <span className={styles.pageNumber}>Page {page}</span>
                    <button
                        className={styles.pageButton}
                        onClick={handleIncreasePageNumber}
                        disabled={page >= totalPages}
                    >
                        +
                    </button>
                </div>
            </div>
        </>
    )
}

export default SetPageValue;