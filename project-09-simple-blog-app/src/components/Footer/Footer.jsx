import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>&copy; {new Date().getFullYear()} Simple Blog App</p>
        </footer>
    );
};

export default Footer;
