// local
import styles from './chat.module.css';
import ChatHeader from '../ChatHeader/ChatHeader';
import MessageList from '../MessageList/MessageList';
import MessageInput from "../MessageInput/MessageInput"
import { getIsThereIsChat } from '../../redux/chatsSlice';
import { getCurrentUserData } from '../../redux/chatsSlice';
import { getCurrentChatMessages } from '../../redux/chatsSlice';

// redux
import { useSelector } from 'react-redux';

const Chat = () => {
    const isThereIsChat = useSelector(getIsThereIsChat);
    const currentChatMessages = useSelector(getCurrentChatMessages);
    const contectedUsersData = useSelector(getCurrentUserData);

    if (!isThereIsChat || currentChatMessages?.length === 0) {
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
