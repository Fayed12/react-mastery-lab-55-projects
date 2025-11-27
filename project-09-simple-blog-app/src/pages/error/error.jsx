// react router
import { useNavigate } from 'react-router';

// local
import styles from './error.module.css';
import NotFoundSvg from './NotFoundSvg';

function Error() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <NotFoundSvg />
                <h1 className={styles.title}>Page Not Found</h1>
                <p className={styles.message}>Oops! The page you are looking for seems to have vanished into the void.</p>
                <button
                    type="button"
                    className={styles.button}
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>
            </div>
        </div>
    );
}

export default Error;
