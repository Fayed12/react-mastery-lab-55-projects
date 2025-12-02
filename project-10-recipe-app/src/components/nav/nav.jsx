// local
import style from "./nav.module.css"

// react router
import { NavLink } from "react-router";

function NavBar() {
    return ( 
        <>
            <div className={style.navBar}>
                <div className={style.logo}>
                    <img src="/navLogo.png" alt="nav-logo" />
                </div>
                <div className={style.content}>
                    <ul>
                        <li>
                            <NavLink to="/home">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/popular">Popular</NavLink>
                        </li>
                        <li>
                            <NavLink to="/recipe">Recipe</NavLink>
                        </li>
                    </ul>
                </div>
        </div>
        </>
     );
}

export default NavBar;