// local
import styles from './UserChatList.module.css';
import { setIsThereIsChat } from '../../redux/chatsSlice';
import { getContectedUsersData } from '../../redux/usersSlice';
import { setCurrentUserData } from '../../redux/chatsSlice';
import {listenToChat} from '../../fierbase-services/fireStore/getChatData';

// redux
import { useSelector,useDispatch } from 'react-redux';

// react
import { useEffect, useState } from 'react';

// react icons
import { RxAvatar } from "react-icons/rx";
import { RiCheckDoubleLine } from "react-icons/ri";

const UserChatList = ({data, loginUser, handleClickChat }) => {
    const currentDay = new Date().toISOString().split("T")[0]
    const users = useSelector(getContectedUsersData);
    const dispatch = useDispatch();

    // local state
    const [chatuserData, setChatUserData] = useState(null)
    const [time, setTime] = useState(null)

    // handle click chat
    const handleClickChatUser =async () => {
        const chatId = loginUser.uid > data.uid ? `${loginUser.uid}-${data.uid}` : `${data.uid}-${loginUser.uid}`;
        handleClickChat(chatId)

        // set user data
        const userData = users.find((item) => item.uid === data.uid);
        dispatch(setIsThereIsChat(true))
        dispatch(setCurrentUserData(userData))
    }

    // update chat data real time
    useEffect(() => {
        function getData() {
            const chatId = loginUser.uid > data.uid ? `${loginUser.uid}-${data.uid}` : `${data.uid}-${loginUser.uid}`;
            listenToChat(chatId, (chatData) => {
                if (chatData) {
                    setChatUserData(chatData)
                    setTime(chatData.time?.split("T")[0])
                }
            })
        }
        getData()
    },[data.uid, dispatch, loginUser.uid])

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
                        <span className={`${styles.time} ${chatuserData?.seenStatus ? styles.seenTime : styles.unseenTime}`}>{currentDay === time ? `${chatuserData?.time?.split("T")[1].split(":")[0]}:${chatuserData?.time?.split("T")[1].split(":")[1]}` : time}</span>
                    </div>
                    <div className={styles.dataFooter}>
                        <div>
                            <span className={styles.arrow}>
                                {chatuserData?.senderId === loginUser.uid &&
                                    (   chatuserData?.seenStatus ?
                                        <span className={styles.seenArrow} title='seen' aria-label='seen'><RiCheckDoubleLine /></span> :
                                        <span className={styles.unseenArrow} title='unseen' aria-label='unseen'><RiCheckDoubleLine /></span>
                                    )
                                }
                            </span>
                            <span className={styles.lastMessage}>{chatuserData ? chatuserData?.lastMessage :""}</span>
                        </div>
                        <span>{chatuserData?.senderId !== loginUser.uid &&
                            (chatuserData?.seenStatus ||
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
