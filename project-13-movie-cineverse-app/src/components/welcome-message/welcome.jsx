// local
import styles from "./welcome.module.css";
import { BiCameraMovie } from "react-icons/bi";
import { MdWifiTetheringError } from "react-icons/md";

function WelcomeMessage() {
    return (
        <div className={styles.welcome}>
            <div className={styles.iconWrapper}>
                <BiCameraMovie />
            </div>
            <p className={styles.title}>Welcome to Cineverse</p>
            <p className={styles.text}>
                You can manage and select all you want in this movie app, whether it is movies, TV shows, or series.
            </p>
            <div className={styles.notice}>
                <MdWifiTetheringError className={styles.noticeIcon} />
                <p className={styles.noticeText}>
                    Notice: Please check your internet connection before exploring our vast collection.
                </p>
            </div>
        </div>
    );
}

export default WelcomeMessage;