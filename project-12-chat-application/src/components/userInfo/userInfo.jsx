// local
import styles from './userInfo.module.css';
import MainButton from "../ui/button/mainButton"

// react icons
import { RxAvatar } from 'react-icons/rx';
import { IoClose } from "react-icons/io5";

const UserInfo = ({ userData, close }) => {
    return (
        <div className={styles.container} onClick={close}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                <div className={styles.avatarContainer}>
                    <span><RxAvatar /></span>
                    <p>{userData?.userName}</p>
                    <p>{userData?.displayName}</p>
                    <span className={userData?.online ? styles.online : styles.offline}>{userData?.online ? "Online" : "Offline"}</span>

                </div>
                <div className={styles.infoContainer}>
                    <p>{userData?.phone}</p>
                    <p>{userData?.email}</p>
                    <p>{userData?.country}</p>
                </div>
                <MainButton title="Close" onclick={close} type="button" children={<IoClose />} />
            </div>
        </div>
    );
};

export default UserInfo;