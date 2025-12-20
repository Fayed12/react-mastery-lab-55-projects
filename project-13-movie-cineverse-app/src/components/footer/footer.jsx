// local
import styles from "./footer.module.css"

function Footer() {
    return (
        <footer className={styles.footerContainer}>
            <p className={styles.footerText}>
                &copy; {new Date().getFullYear()} Cineverse. All rights reserved. designed by{" "}
                <span className={styles.author}>Mohamed Fayed</span>
            </p>
        </footer>
    );
}

export default Footer;
