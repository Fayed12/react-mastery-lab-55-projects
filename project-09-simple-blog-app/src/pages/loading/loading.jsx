// local
import styles from "./loading.module.css";

const Loading = () => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.loader}>
                <div className={styles.ring}></div>
                <div className={styles.ring}></div>
                <div className={styles.ring}></div>
            </div>
            <div className={styles.text}>LOADING</div>
        </div>
    );
};

export default Loading;
