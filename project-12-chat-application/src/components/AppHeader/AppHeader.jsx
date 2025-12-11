// local
import styles from './AppHeader.module.css';
import MainButton from '../ui/button/mainButton';
import { selectUser } from '../../redux/authSlice';
import { getTheme } from '../../redux/themeSlice';
import { setTheme } from '../../redux/themeSlice';
import SearchPopup from '../searchPopup/searchPopup';

// redux
import { useSelector, useDispatch } from 'react-redux';

// react icons
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";

// react
import { useState } from 'react';

//react router
import { useNavigate } from 'react-router';

const AppHeader = () => {
    const [openSearchPopup, setOpenSearchPopup] = useState(false);
    const user = useSelector(selectUser);
    const theme = useSelector(getTheme);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOpenProfile = () => {
        navigate("/profile");
    };
    return (
        <>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <span>SparkChat</span>
                </div>
                <div className={styles.content}>
                    <div className={styles.btnContainer}>
                        <MainButton children={<><FaPlus /> New Chat</>} title={"newchat"} type={"button"} onclick={() => setOpenSearchPopup(true)} />
                    </div>
                    <div className={styles.themeContainer}>
                        {theme === "dark" ? (
                            <MdLightMode onClick={() => dispatch(setTheme("light"))} />
                        ) : (
                            <MdDarkMode onClick={() => dispatch(setTheme("dark"))} />
                        )}
                    </div>
                    <div className={styles.userContainer} onClick={handleOpenProfile}>
                        <span title={user?.displayName}><RxAvatar/></span>
                        <span>{user?.displayName}</span>
                    </div>
                </div>
            </div>
            {
                openSearchPopup && <SearchPopup closePopup={() => setOpenSearchPopup(false)} />
            }
        </>
    );
};

export default AppHeader;
