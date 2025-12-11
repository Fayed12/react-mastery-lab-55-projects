// local
import styles from './exploreApp.module.css';

// react-icons
import { FaRocket, FaComments, FaUserShield, FaBolt } from "react-icons/fa6";

const ExploreApp = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Welcome to SparkChat</h1>
                <p className={styles.subtitle}>
                    The fastest and smoothest chat experience built with React & Firebase.
                </p>

                <div className={styles.features}>
                    <div className={styles.featureCard}>
                        <FaRocket className={styles.icon} />
                        <h3>Fast Messaging</h3>
                        <p>Instant real-time messaging powered by Firestore listeners.</p>
                    </div>

                    <div className={styles.featureCard}>
                        <FaComments className={styles.icon} />
                        <h3>Clean UI</h3>
                        <p>Minimal interface designed for clarity and focus.</p>
                    </div>

                    <div className={styles.featureCard}>
                        <FaUserShield className={styles.icon} />
                        <h3>Secure Accounts</h3>
                        <p>Authentication with Firebase Auth to keep your data safe.</p>
                    </div>

                    <div className={styles.featureCard}>
                        <FaBolt className={styles.icon} />
                        <h3>Instant Sync</h3>
                        <p>All chats auto-updated in real time across all devices.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExploreApp;
