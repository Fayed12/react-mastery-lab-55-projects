// local
import styles from "./navBar.module.css";
import UserMenu from "../userInfo/userInfo";
import { ThemeContext } from "../../context/context";

// react router
import { NavLink } from "react-router";

// react
import { useContext } from "react";

// react icons
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

function NavBar() {
    const { theme, setTheme } = useContext(ThemeContext);
    return (
        <div className={styles.NavBar}>
            <div className={styles.logo}>
                <img src="/movieLogo.png" alt="logo" />
            </div>
            <div className={styles.nav}>
                <ul>
                    <li>
                        <NavLink to={"home"} replace={true}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"movies"} replace={true}>
                            Movies
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"tvs"} replace={true}>
                            tv shows
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"search"} replace={true}>
                            Search
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"favorite"} replace={true}>
                            Favorite
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className={styles.user}>
                <div className={styles.theme}>
                    {theme ==="dark" ? <MdDarkMode onClick={() => setTheme("light")} /> : <MdLightMode onClick={() => setTheme("dark")} />}
                </div>
                <UserMenu/>
            </div>
        </div>
    );
}

export default NavBar;
