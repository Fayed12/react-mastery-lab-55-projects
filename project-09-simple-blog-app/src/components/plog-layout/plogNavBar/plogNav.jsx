// local
import styles from './plogNav.module.css';
import UserMenu from '../../ui/userPopup';

// react router
import { NavLink } from 'react-router';

// react
import { useState } from 'react';

// react icons
import { MdDarkMode, MdLightMode } from "react-icons/md";

const PlogNav = () => {
    const [darkMode, setDarkMode] = useState(false);
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
                        <NavLink to="settings" replace={true}>Settings</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" replace={true}>About</NavLink>
                    </li>
                </ul>
            </nav>
            <div className={styles.actions}>
                <div className={styles.theme}>
                    {darkMode ?
                        (<span>
                            <MdDarkMode onClick={() => setDarkMode(false)} />
                        </span>)
                        :
                        (<span>
                            <MdLightMode onClick={() => setDarkMode(true)} />
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
