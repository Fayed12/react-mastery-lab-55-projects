import styles from './Footer.module.css';

const Footer = () => {
    return (
        <div className={styles.footerBottom}>
            <p>&copy; {new Date().getFullYear()} Planora. All rights reserved.</p>
        </div>
    );
};

export default Footer;
