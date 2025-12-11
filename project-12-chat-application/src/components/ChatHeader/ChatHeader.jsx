// local
import styles from './ChatHeader.module.css';
import { setIsThereIsChat, setCurrentChatId, setCurrentChatMessages } from '../../redux/chatsSlice';
import UserInfo from '../userInfo/userInfo';

// redux
import { useDispatch } from 'react-redux';

// react icons
import { RxAvatar } from 'react-icons/rx';
import { IoClose } from "react-icons/io5";

// react
import { useState } from 'react';

const ChatHeader = ({ userData }) => {
    const dispatch = useDispatch();
    const [openUserInfo, setOpenUserInfo] = useState(false)

    // handle close chat
    const handleCloseChat = () => {
        dispatch(setIsThereIsChat(false))
        dispatch(setCurrentChatId(null))
        dispatch(setCurrentChatMessages(null))
        setOpenUserInfo(false)
    }
    const { displayName, online, phone } = userData

    // handle open user info
    const handleOpenUserInfo = () => {
        setOpenUserInfo(true)
    }
    return (
        <>
            <div className={styles.headerContainer}>
                <div className={styles.leftSection} onClick={handleOpenUserInfo} >
                    <div className={styles.avatar}>
                        <RxAvatar />
                    </div>
                    <div className={styles.userDetails}>
                        <p className={styles.displayName}>{displayName}</p>
                        <p className={`${styles.status} ${online ? styles.online : ''}`}>
                            {online ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>

                <div className={styles.rightSection}>
                    {phone && <span className={styles.phoneNumber}>{phone}</span>}
                    <button
                        className={styles.closeButton}
                        onClick={handleCloseChat}
                        aria-label="Close chat"
                    >
                        <IoClose />
                    </button>
                </div>
            </div>
            {openUserInfo && <UserInfo userData={userData} close={() => setOpenUserInfo(false)} />}
        </>
    );
};

export default ChatHeader;
