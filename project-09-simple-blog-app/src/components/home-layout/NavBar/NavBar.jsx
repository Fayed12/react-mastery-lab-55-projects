// styles
import styles from './NavBar.module.css';

// react
import { useContext,useEffect } from 'react';

// react icons
import { MdDarkMode, MdLightMode } from 'react-icons/md';

// react router
import { NavLink, useNavigate } from "react-router";

// local
import { ThemeContext } from "../../../context/themeContext"
import Button from "../../ui/button/button";
import { userContext } from "../../../context/userContext"
import UserPopup from "../../ui/userPopup";

const NavBar = () => {
    const navigate = useNavigate();
    const { theme, setTheme } = useContext(ThemeContext);
    const {isLogin } = useContext(userContext);

    // set theme mode 
    useEffect(() => {
        const root = document.documentElement;
        if(theme === "dark"){
            root.classList.remove("light");
        }else{
            root.classList.add("light")
        }

        sessionStorage.setItem("theme", theme);
    },[theme])
    return (
        <nav className={styles.nav}>
            <ul>
                <li><NavLink to="/home" replace={true}>Home</NavLink></li>
                <li><NavLink to="/about" replace={true}>About</NavLink></li>
                <li><NavLink to="/contact" replace={true}>Contact</NavLink></li>
                <li><NavLink to="/blog" replace={true}>Blog</NavLink></li>
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
                <li>
                    {isLogin ? (<UserPopup />): (<Button type = "button" content = "Login" onClick = { () => navigate('/login', { replace: true })}/>)}
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
