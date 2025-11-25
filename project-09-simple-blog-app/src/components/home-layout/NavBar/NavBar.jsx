// styles
import styles from './NavBar.module.css';

// react router
import { NavLink, useNavigate } from "react-router";

const NavBar = () => {
    const navigate = useNavigate();
    return (
        <nav className={styles.nav}>
            <ul>
                <li><NavLink to="/home">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
                <li><button type='button' onClick={() => navigate('/login', {replace: true})}>
                    Login
                </button></li>
            </ul>
        </nav>
    );
};

export default NavBar;
