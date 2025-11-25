// styles
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>&copy; {new Date().getFullYear()} Simple Blog App,By <span> Mohamed Fayed</span></p>
        </footer>
    );
};

export default Footer;
