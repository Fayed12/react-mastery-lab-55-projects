// local
import styles from './Home.module.css';
import ChatList from '../../components/ChatList/ChatList';
import Chat from '../../components/chat/chat';
import getMessages from '../../fierbase-services/fireStore/getAllChatMessages';
import { getCurrentChatId, setCurrentChatMessages } from '../../redux/chatsSlice';

// react
import { useEffect } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';


const Home = () => {
    const currentChatId = useSelector(getCurrentChatId);
    const dispatch = useDispatch();

    // get all cureent chat messages
    useEffect(() => {
        if (!currentChatId) return;
        const unsubscribe = getMessages(currentChatId, (messages) => {
            dispatch(setCurrentChatMessages(messages));
        });

        return () => unsubscribe();
    }, [currentChatId, dispatch]);

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