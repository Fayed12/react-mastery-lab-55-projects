// local
import styles from './sideBar.module.css';
import MainButton from '../../ui/button/MainButton';
import { getThemeValue } from '../../Redux/themeSlice';
import logoutWithFirebase from "../../firebase/auth/firebaseLogout"

// redux
import { useSelector } from 'react-redux';

// react
import { useEffect, useRef, useState } from 'react';

// react icons
import { RiShutDownLine } from "react-icons/ri";
import { LuPanelRightClose } from "react-icons/lu";
import { LuPanelLeftClose } from "react-icons/lu";
import { IoIosHome } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import { FaProjectDiagram } from "react-icons/fa";
import { TbSettingsShare } from "react-icons/tb";
import { BsCalendar2Date } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { MdQueryStats } from "react-icons/md";

// react router
import { NavLink } from 'react-router';

const SideBar = ({ openMenu, setOpenMenu }) => {
    const [minimizeSideBar, setMinimizeSideBar] = useState(false)
    const themeValue = useSelector(getThemeValue)

    const sideRef = useRef()

    // close if click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (sideRef.current?.contains(e.target)) return;
            setOpenMenu(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setOpenMenu]);

    return (
        <>
            {openMenu && <div className={styles.overlay}></div>}
            <div ref={sideRef} className={`${styles.sideBar} ${minimizeSideBar ? styles.close : ""} ${openMenu ? styles.openMenu : undefined}`}>
                <div className={styles.logo}>
                    <img src={`${themeValue === "light" ? "/light-logo.png" : "/dark-logo.png"}`} alt="logo" aria-label='logo' />
                </div>
                <div className={styles.container}>
                    <ul>
                        <li>
                            <NavLink to={"home"} onClick={() => setOpenMenu(false)}>
                                <IoIosHome />
                                <span className={styles.text}>Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"tasks"} onClick={() => setOpenMenu(false)}>
                                <FaTasks />
                                <span className={styles.text}>Tasks</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"taskManagement"} onClick={() => setOpenMenu(false)}>
                                <MdOutlineSettings />
                                <span className={styles.text}>Manage Tasks</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"projects"} onClick={() => setOpenMenu(false)}>
                                <FaProjectDiagram />
                                <span className={styles.text}>Projects</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"projectsManagement"} onClick={() => setOpenMenu(false)}>
                                <TbSettingsShare />
                                <span className={styles.text}>Manage Project</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"calendar"} onClick={() => setOpenMenu(false)}>
                                <BsCalendar2Date />
                                <span className={styles.text}>Calendar</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"statistics"} onClick={() => setOpenMenu(false)}>
                                <MdQueryStats />
                                <span className={styles.text}>Statistics</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"profile"} onClick={() => setOpenMenu(false)}>
                                <FaUser />
                                <span className={styles.text}>Profile</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className={styles.footer}>
                    <MainButton type='button' title='logout' content={<RiShutDownLine />} clickEvent={() => logoutWithFirebase()} />
                    {!minimizeSideBar && <span>Logout</span>}
                </div>
                <div className={styles.openClose}>
                    {minimizeSideBar ?
                        (
                            <span onClick={() => setMinimizeSideBar((prev) => !prev)}><LuPanelRightClose /></span>
                        ) :
                        (
                            <span onClick={() => setMinimizeSideBar((prev) => !prev)}> <LuPanelLeftClose /></span>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default SideBar;
