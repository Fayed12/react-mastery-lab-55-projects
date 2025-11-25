// styles
import styles from './NavBar.module.css';

// react router
import { NavLink, useNavigate } from "react-router";

const NavBar = () => {
    const navigate = useNavigate();
    return (
        <nav className={styles.nav}>
            <ul>
                <li><NavLink to="/home" replace={true}>Home</NavLink></li>
                <li><NavLink to="/about" replace={true}>About</NavLink></li>
                <li><NavLink to="/contact" replace={true}>Contact</NavLink></li>
                <li><button type='button' onClick={() => navigate('/login', {replace: true})}>
                    Login
                </button></li>
            </ul>
        </nav>
    );
};

export default NavBar;
