// local
import styles from './plogNav.module.css';
import UserMenu from '../../ui/userPopup';
import { ThemeContext } from '../../../context/themeContext'

// react router
import { NavLink } from 'react-router';

// react
import { useEffect, useContext } from 'react';

// react icons
import { MdDarkMode, MdLightMode } from "react-icons/md";

const PlogNav = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    // set theme mode 
    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.remove("light");
        } else {
            root.classList.add("light")
        }

        sessionStorage.setItem("theme", theme);
    }, [theme])
    return (
        <div className={styles.plogNav}>
            <div className={styles.logo}>
                <h1>Plog</h1>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li>
                        <NavLink to="allPostsHome" replace={true}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="profile" replace={true}>Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" replace={true}>About</NavLink>
                    </li>
                </ul>
            </nav>
            <div className={styles.actions}>
                <div className={styles.theme}>
                    {theme === "dark" ?
                        (<span>
                            <MdDarkMode onClick={() => setTheme("light")} />
                        </span>)
                        :
                        (<span>
                            <MdLightMode onClick={() => setTheme("dark")} />
                        </span>)
                    }
                </div>
                <div className={styles.user}>
                    <UserMenu />
                </div>
            </div>
        </div>
    );
};

export default PlogNav;
