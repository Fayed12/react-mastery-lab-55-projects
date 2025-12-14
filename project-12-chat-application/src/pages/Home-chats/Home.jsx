// local
import styles from './Home.module.css';
import ChatList from '../../components/ChatList/ChatList';
import Chat from '../../components/chat/chat';
import getMessages from '../../fierbase-services/fireStore/getAllChatMessages';
import { getCurrentChatId, setCurrentChatMessages } from '../../redux/chatsSlice';
import { getAllContectedChats } from '../../redux/chatsSlice';

// react
import { useEffect } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';


const Home = () => {

    // redux
    const allChats = useSelector(getAllContectedChats);
    const currentChatId = useSelector(getCurrentChatId);
    const dispatch = useDispatch();

    // get all cureent chat messages
    useEffect(() => {
        const chat = allChats?.find((item) => item.id === currentChatId);
        if (chat) {
            const unsubscribe = getMessages(chat.id, (messages) => {
                dispatch(setCurrentChatMessages(messages))
            });
            return () => unsubscribe();
        }
    }, [allChats, currentChatId, dispatch]);

    return (
        <div className={styles.container}>
            <div className={styles.chatList}>
                <ChatList />
            </div>
            <div className={styles.chat}>
                <Chat />
            </div>
        </div>
    );
};

export default Home;