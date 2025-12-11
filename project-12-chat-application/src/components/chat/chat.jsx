// local
import styles from './chat.module.css';
import ChatHeader from '../ChatHeader/ChatHeader';
import MessageList from '../MessageList/MessageList';
import MessageInput from "../MessageInput/MessageInput"
import { getIsThereIsChat } from '../../redux/chatsSlice';
import { getCurrentUserData } from '../../redux/chatsSlice';

// redux
import { useSelector } from 'react-redux';

const Chat = () => {
    const isThereIsChat = useSelector(getIsThereIsChat);
    const contectedUsersData = useSelector(getCurrentUserData);

    if (!isThereIsChat) {
        return (
            <div className={styles.emptyContainer}>
                <div className={styles.overlay}></div>
            </div>
        );
    }
    
    return (
        <div className={styles.container}>
            <div>
                <ChatHeader userData={contectedUsersData} />
            </div>
            <div className={styles.messageList}>
                <MessageList />
            </div>
            <div>
                <MessageInput />
            </div>
        </div>
    );
};

export default Chat;
