import styles from './NavBar.module.css';

const NavBar = () => {
    return (
        <nav className={styles.nav}>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/create">Create Post</a></li>
            </ul>
        </nav>
    );
};

export default NavBar;
