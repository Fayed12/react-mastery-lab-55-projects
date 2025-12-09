// local
import styles from './SideBar.module.css';
import MainButton from '../ui/button/mainButton';
import { logout } from '../../fierbase-services/logout';
import { selectUser } from '../../redux/authSlice';
import { useSelector } from 'react-redux';
import updateUserField from '../../fierbase-services/fireStore/updateValueInUsers';

// react router
import { NavLink } from 'react-router';

// react icons
import { RxAvatar } from "react-icons/rx";
import { BsInfoLg } from "react-icons/bs";
import { IoChatbubbles } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaLink } from "react-icons/fa6";
import { RiShutDownLine } from "react-icons/ri";
import { LuPanelLeftOpen } from "react-icons/lu";
import { LuPanelRightOpen } from "react-icons/lu";

// toast
import toast from 'react-hot-toast';

// react 
import { useState } from 'react';

const SideBar = () => {
    const user = useSelector(selectUser);
    const [openSideBar, setOpenSideBar] = useState(true);

    // handle logout
    const handleLogout = async () => {
        toast.loading("Logging out...", { id: "logging-out" });
        setTimeout(async () => {
            const result = await logout();
            await updateUserField(user.uid, { online: false });
            if (result) {
                toast.success("Logged out successfully", { id: "logging-out" });
            }
        }, 1500);
    }
    return (
        <div className={openSideBar ? styles.container : styles.containerClose}>
            <div className={styles.logo}>
                <span title={user?.displayName}><RxAvatar /></span>
                <h1>Hi, <span>{user?.displayName}</span></h1>
            </div>
            <div className={styles.menu}>
                <ul className={styles.linkList}>
                    <li title='Explore' aria-label='Explore'>
                        <NavLink
                            to="exploreApp"
                            className={({ isActive }) =>
                                isActive ? `${styles.link} ${styles.active}` : styles.link
                            }
                        >
                            <BsInfoLg className={styles.icon} />
                            <span>Explore</span>
                        </NavLink>
                    </li>
                    <li title='Chats' aria-label='Chats'>
                        <NavLink
                            to="homeChats"
                            className={({ isActive }) =>
                                isActive ? `${styles.link} ${styles.active}` : styles.link
                            }
                        >
                            <IoChatbubbles className={styles.icon} />
                            <span>Chats</span>
                        </NavLink>
                    </li>
                    <li title='Profile' aria-label='Profile'>
                        <NavLink
                            to="profile"
                            className={({ isActive }) =>
                                isActive ? `${styles.link} ${styles.active}` : styles.link
                            }
                        >
                            <FaUser className={styles.icon} />
                            <span>Profile</span>
                        </NavLink>
                    </li>
                    <li title='Setting' aria-label='Setting'>
                        <NavLink
                            to="setting"
                            className={({ isActive }) =>
                                isActive ? `${styles.link} ${styles.active}` : styles.link
                            }
                        >
                            <IoSettings className={styles.icon} />
                            <span>Setting</span>
                        </NavLink>
                    </li>
                    <li title='Contact Us' aria-label='Contact Us'>
                        <NavLink
                            to="contactUs"
                            className={({ isActive }) =>
                                isActive ? `${styles.link} ${styles.active}` : styles.link
                            }
                        >
                            <FaLink className={styles.icon} />
                            <span>Contact Us</span>
                        </NavLink>
                    </li>
                </ul>
                <div className={styles.logout}>
                    <MainButton children={<><RiShutDownLine /> <span>logout</span></>} onclick={() => handleLogout()} />
                </div>
            </div>
            <div className={styles.toggle}>
                {openSideBar ? <span title='Close' aria-label='Close' onClick={() => setOpenSideBar(false)}><LuPanelRightOpen /></span> : <span title='Open' aria-label='Open' onClick={() => setOpenSideBar(true)}><LuPanelLeftOpen /></span>}
            </div>
        </div>
    );
};

export default SideBar;

