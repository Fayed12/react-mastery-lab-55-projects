// local
import styles from './Offline.module.css';

// react icons
import { BiWifiOff } from 'react-icons/bi';

const Offline = () => {
    return (
        <div className={styles.offlineContainer}>
            <div className={styles.offlineCard}>
                <div className={styles.iconContainer}>
                    <BiWifiOff className={styles.icon} />
                </div>
                <h1 className={styles.title}>You are offline</h1>
                <p className={styles.description}>
                    It seems you have lost your internet connection. Please check your network settings and try again.
                </p>
                <button
                    className={styles.retryButton}
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </button>
            </div>
        </div>
    );
};

export default Offline;
