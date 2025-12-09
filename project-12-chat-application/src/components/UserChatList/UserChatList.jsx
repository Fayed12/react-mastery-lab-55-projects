// local
import styles from './UserChatList.module.css';
import { getAllContectedChats } from '../../redux/chatsSlice';

// redux
import { useSelector } from 'react-redux';

// react
import { useEffect, useState } from 'react';

// react icons
import { RxAvatar } from "react-icons/rx";
import { RiCheckDoubleLine } from "react-icons/ri";

const UserChatList = ({ data, loginUser, handleClickChat }) => {
    const currentDay = new Date().toISOString().split("T")[0];
    const allContectedChats = useSelector(getAllContectedChats);
    const [userData, setUserData] = useState(null)
    const [time, setTime] = useState(null)
    // const [newChatId, setNewChatId] = useState(null)

    // handle click chat
    const handleClickChatUser = () => {
        const chatId = loginUser.uid > data.uid ? `${loginUser.uid}-${data.uid}` : `${data.uid}-${loginUser.uid}`;
        handleClickChat(chatId)
    }

    // get each user to related chat
    useEffect(() => {
        allContectedChats.forEach((item) => {
            const isMember = item.members.find((id) => id === data.uid);

            if (isMember) {
                setUserData(item);
                setTime(item.time?.split("T")[0])
            }
        });
    }, [allContectedChats, data]);

    return (
        <div className={styles.container} onClick={() => handleClickChatUser()}>
            <div className={styles.userChatItem}>
                <div className={styles.image}>
                    {data.online && <div className={styles.onlineStatus}><span className={styles.online}></span></div>}
                    <RxAvatar />
                </div>
                <div className={styles.data}>
                    <div className={styles.dataHeader}>
                        <span>{data.userName}</span>
                        <span className={`${styles.time} ${userData?.seenStatus ? styles.seenTime : styles.unseenTime}`}>{currentDay === time ? `${userData?.time?.split("T")[1].split(":")[0]}:${userData?.time?.split("T")[1].split(":")[1]}` : time}</span>
                    </div>
                    <div className={styles.dataFooter}>
                        <div>
                            <span className={styles.arrow}>
                                {userData?.senderId === loginUser.uid &&
                                    (userData?.seenStatus ?
                                        <span className={styles.seenArrow} title='seen' aria-label='seen'><RiCheckDoubleLine /></span> :
                                        <span className={styles.unseenArrow} title='unseen' aria-label='unseen'><RiCheckDoubleLine /></span>
                                    )
                                }
                            </span>
                            <span className={styles.lastMessage}>{userData?.lastMessage}</span>
                        </div>
                        <span>{userData?.senderId !== loginUser.uid &&
                            (userData?.seenStatus ||
                                <span className={styles.unseen} title='unseen' aria-label='unseen'></span>
                            )
                        }</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserChatList;
