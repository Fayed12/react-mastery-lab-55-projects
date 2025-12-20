// local
import styles from "./setPageValue.module.css"

function SetPageValue({ page, toatPages, setPage }) {

    function handleIncreasePageNumber() {
        if (page >= toatPages) {
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
                        disabled={page >= toatPages}
                    >
                        +
                    </button>
                </div>
            </div>
        </>
    )
}

export default SetPageValue;