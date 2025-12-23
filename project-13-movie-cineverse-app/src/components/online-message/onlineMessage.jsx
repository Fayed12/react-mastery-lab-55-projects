// local
import styles from "./onlineMessage.module.css";

// react icon
import { BiWifiOff } from "react-icons/bi";

function OnlineMessage() {
    return (
        <div className={styles.offlineContainer}>
            <div className={styles.iconWrapper}>
                <BiWifiOff />
            </div>
            <p className={styles.title}>No Internet Connection</p>
            <p className={styles.description}>
                It looks like you are offline. Please check your network settings and try again.
            </p>
            <p className={styles.retryText}>Waiting for connection...</p>
        </div>
    );
}

export default OnlineMessage;