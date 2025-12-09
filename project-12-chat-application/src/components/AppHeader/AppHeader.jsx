// local
import styles from './AppHeader.module.css';
import MainButton from '../ui/button/mainButton';
import { selectUser } from '../../redux/authSlice';
import { getTheme } from '../../redux/themeSlice';
import { setTheme } from '../../redux/themeSlice';

// redux
import { useSelector,useDispatch } from 'react-redux';

// react icons
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";

const AppHeader = () => {
    const user = useSelector(selectUser);
    const theme = useSelector(getTheme);
    const dispatch = useDispatch();
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <span>SparkChat</span>
            </div>
            <div className={styles.content}>
                <div className={styles.btnContainer}>
                    <MainButton children={<><FaPlus /> New Chat</>} title={"newchat"} type={"button"} />
                </div>
                <div className={styles.themeContainer}>
                    {theme === "dark" ? (
                        <MdLightMode onClick={() => dispatch(setTheme("light"))} />
                    ) : (
                        <MdDarkMode onClick={() => dispatch(setTheme("dark"))} />
                    )}
                </div>
                <div className={styles.userContainer}>
                    <span title={user?.displayName}><RxAvatar /></span>
                    <span>{user?.displayName}</span>
                </div>
            </div>
        </div>
    );
};

export default AppHeader;
