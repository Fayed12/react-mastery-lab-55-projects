// react
import { useEffect } from "react";

// local
import styles from "./welcomePage.module.css";

function WelcomePage({ onComplete }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 4000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Welcome to My Blog</h1>
                <p className={styles.subtitle}>Explore the world of ideas</p>
            </div>
        </div>
    );
}

export default WelcomePage;