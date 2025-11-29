// local
import NavBar from '../NavBar/NavBar';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <h1>Blog</h1>
            </div>
            <div className={styles.navBar}>
                <NavBar />
            </div>
        </header>
    );
};

export default Header;
