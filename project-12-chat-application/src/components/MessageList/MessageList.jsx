// local
import styles from './MessageList.module.css';
import { getCurrentChatMessages } from '../../redux/chatsSlice';
import { selectUser } from '../../redux/authSlice';

// data
import { format } from "date-fns";

// redux
import { useSelector } from 'react-redux';

// react icons
import { RiCheckDoubleLine } from "react-icons/ri";

// react
import { useEffect, useRef } from 'react';

const MessageList = () => {
    const currentChatMessages = useSelector(getCurrentChatMessages);
    const authUser = useSelector(selectUser);

    const currentTime = new Date().toISOString().split('T')[0];
    const containerRef = useRef(null)

    // move to bottom
    useEffect(() => {
        if (!containerRef.current) return;

        containerRef.current.scrollTop =
            containerRef.current.scrollHeight;
    }, [currentChatMessages]);

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.messages}>
                <div className={styles.overlay}></div>
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
                                            <div className={styles.time}>
                                                <span>{message.time ? `${format(new Date(message?.time), "h:mm aaa")}` : ""}</span>
                                                <span>{message.time.split('T')[0] === currentTime ? "Today" : (message.time.split('T')[0].split('-')[0] === new Date().getFullYear().toString() ? `${message.time.split('T')[0].split('-')[1]}-${message.time.split('T')[0].split('-')[2]}` : message.time.split('T')[0])}</span>
                                            </div>
                                            <span className={styles.sender}><RiCheckDoubleLine /></span>
                                        </div>
                                    </div>
                                </div>
                            )
                        ) : (
                            message.text !== "" && (
                                <div className={styles.leftMessage} key={message.id}>
                                    <div className={styles.textContainer}>{message.text}
                                        <div className={styles.timeContainer}>
                                            <div className={styles.time}>
                                                <span>{message?.time ? `${format(new Date(message?.time), "h:mm aaa")}` : ""}</span>
                                                <span>{message.time.split('T')[0] === currentTime ? "Today" : (message.time.split('T')[0].split('-')[0] === new Date().getFullYear().toString() ? `${message.time.split('T')[0].split('-')[1]}-${message.time.split('T')[0].split('-')[2]}` : message.time.split('T')[0])}</span>
                                            </div>
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
