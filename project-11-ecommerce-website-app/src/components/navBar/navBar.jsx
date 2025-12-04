// local
import style from "./navBar.module.css"

// react router
import { NavLink } from "react-router";

function NavBar() {
    return (
        <>
            <div className={style.navBar}>
                <div className={style.content}>
                    <ul>
                        <li>
                            <NavLink to="home" className={({ isActive }) => isActive ? `${style.link} ${style.active}` : style.link}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="about" className={({ isActive }) => isActive ? `${style.link} ${style.active}` : style.link}>About</NavLink>
                        </li>
                        <li>
                            <NavLink to="contact" className={({ isActive }) => isActive ? `${style.link} ${style.active}` : style.link}>Contact</NavLink>
                        </li>
                        <li>
                            <NavLink to="menu" className={({ isActive }) => isActive ? `${style.link} ${style.active}` : style.link}>Menu</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default NavBar;