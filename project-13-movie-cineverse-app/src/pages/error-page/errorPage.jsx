// local
import styles from "./error.module.css";

// react router
import { useNavigate } from "react-router";

function ErrorPage() {
    const navigate = useNavigate();

    return (
        <div className={styles.errorContainer}>
            <div className={styles.errorContent}>
                <h1 className={styles.errorCode}>404</h1>
                <h2 className={styles.errorMessage}>Oops! Page Not Found</h2>
                <p className={styles.errorDescription}>The page you are looking for might have been removed or is temporarily unavailable.</p>
                <button className={styles.homeButton} onClick={() => navigate("/home", { replace: true })}>
                    Go Back Home
                </button>
            </div>
        </div>
    );
}

export default ErrorPage;
