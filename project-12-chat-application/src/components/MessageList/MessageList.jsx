// local
import styles from './MessageList.module.css';
import { getCurrentChatMessages } from '../../redux/chatsSlice';
import { selectUser } from '../../redux/authSlice';
import { getAllContectedChats, getCurrentChatId } from '../../redux/chatsSlice';

// redux
import { useSelector } from 'react-redux';

// react icons
import { RiCheckDoubleLine } from "react-icons/ri";

// react
import { useEffect, useRef } from 'react';

const MessageList = () => {
    const currentChatMessages = useSelector(getCurrentChatMessages);
    const authUser = useSelector(selectUser);
    const allContectedChats = useSelector(getAllContectedChats);
    const currentChatId = useSelector(getCurrentChatId);

    const currentTime = new Date().toISOString().split('T')[0];
    const currentChatLastMessageTime = allContectedChats.find((chat) => chat.id === currentChatId)?.time.split('T')[0];
    const containerRef = useRef(null);

    // does not work
    useEffect(() => {
        containerRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.messages} ref={containerRef}>
                <div className={styles.overlay}></div>
                {currentTime > currentChatLastMessageTime ? <span className={styles.mainTime}>{currentChatLastMessageTime}</span> : <span className={styles.mainTime}>Today</span>}
                {currentChatMessages?.length === 0 || currentChatMessages === null ? (
                    <div></div>
                ) : (
                    currentChatMessages?.map((message) => (
                        message?.senderId === authUser?.uid ? (
                            message.text !== "" && (
                                <div className={styles.rightMessage} key={message.id}>
                                    <div className={styles.textContainer}>
                                        {message.text}
                                        <div className={styles.timeContainer}>
                                            <span className={styles.time}>{message.time ? `${message?.time?.split('T')[1].split(':')[0]}:${message?.time?.split('T')[1].split(':')[1]}` : ""}</span>
                                            <span><RiCheckDoubleLine /></span>
                                        </div>
                                    </div>
                                </div>
                            )
                        ) : (
                            message.text !== "" && (
                                <div className={styles.leftMessage} key={message.id}>
                                    <div className={styles.textContainer}>{message.text}
                                        <div className={styles.timeContainer}>
                                            <span className={styles.time}>{message?.time ? `${message?.time?.split('T')[1].split(':')[0]}:${message?.time?.split('T')[1].split(':')[1]}` : ""}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        )
                    ))

                )}

            </div>
        </div>
    );
};

export default MessageList;
