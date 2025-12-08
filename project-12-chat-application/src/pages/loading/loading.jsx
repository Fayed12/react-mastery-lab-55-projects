// local
import styles from "./loading.module.css";

function Loading() {
    return (
        <div className={styles.container} aria-label="loading">
            <div className={styles.loader}></div>
        </div>
    );
}

export default Loading;
