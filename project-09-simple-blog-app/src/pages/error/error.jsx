// local
import styles from './error.module.css';

function Error() {
    return (
        <div className={styles.error}>
            <h1>404</h1>
            <h2>Page Not Found</h2>
        </div>
    );
}

export default Error;
