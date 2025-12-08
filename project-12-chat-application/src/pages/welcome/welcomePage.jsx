// local
import styles from './welcome.module.css';

const WelcomePage = () => {
    return (
        <div className={styles.container}>
            <h1>Welcome to our chat application</h1>
            <p>Chat with your friends and family</p>
        </div>
    );
};

export default WelcomePage;