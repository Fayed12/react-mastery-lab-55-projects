// local
import styles from './header.module.css';
import UserAvatarMenu from "../userInfo"
import { getThemeValue } from '../../Redux/themeSlice';
import { getUserDetails } from '../../Redux/authUserSlice';
import { setThemeToggle } from '../../Redux/themeSlice';

// react router
import { useLocation } from 'react-router';

// redux
import { useSelector, useDispatch } from 'react-redux';

// react router
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";

// react icons
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { AiOutlineMenuFold } from "react-icons/ai";

const Header = ({ setOpenMenu, openMenu }) => {
    const themeValue = useSelector(getThemeValue)
    const userDetails = useSelector(getUserDetails)
    const dispatch = useDispatch()
    const location = useLocation().pathname

    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <div className={styles.link}>
                    <div className={styles.openCloseMenu}>
                        {!openMenu ?
                            <span onClick={() => setOpenMenu((prev) => !prev)}><AiOutlineMenuUnfold /></span>
                            :
                            <span onClick={() => setOpenMenu((prev) => !prev)}><AiOutlineMenuFold /></span>}
                    </div>
                    <span>Dashboard/ {location.split("/").at(-1) === "dashboard" ? "home" : location.split("/").at(-1)}</span>
                </div>
                <div className={styles.Actions}>
                    {themeValue === "light" ? <span onClick={() => dispatch(setThemeToggle("dark"))}><MdDarkMode /></span> : <span onClick={() => dispatch(setThemeToggle("light"))}><MdLightMode /></span>}
                    <span><IoIosNotifications /></span>
                </div>
                <div className={styles.userInfo}>
                    <UserAvatarMenu user={userDetails} />
                </div>
            </div>
        </div>
    );
};

export default Header;
