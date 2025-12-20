// local
import styles from "./loading.module.css";

function LoadingPage() {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <h2>Loading Cineverse...</h2>
        </div>
    );
}

export default LoadingPage;
