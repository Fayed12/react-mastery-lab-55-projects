// local
import styles from './Home.module.css';
import ChatList from '../../components/ChatList/ChatList';
import Chat from '../../components/chat/chat';
import { getCurrentChatId, setAllContectedChats, setCurrentChatMessages } from '../../redux/chatsSlice';
import { selectUser } from '../../redux/authSlice';
import getAllChats from '../../fierbase-services/fireStore/getallChats';
import getMessages from '../../fierbase-services/fireStore/getAllChatMessages';
import { setIsThereIsChat } from '../../redux/chatsSlice';

// redux
import { useDispatch, useSelector } from 'react-redux';

// react
import { useEffect, useState } from 'react';

const Home = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [allChats, setAllChats] = useState([]);
    const currentChatId = useSelector(getCurrentChatId);

    // compare all chats with the current id ser press 
    useEffect(() => {
        const chat = allChats.find((item) => item.id === currentChatId);
        if (chat) {
            const unsubscribe = getMessages(chat.id, (messages) => {
                dispatch(setCurrentChatMessages(messages))
                dispatch(setIsThereIsChat(true))
            });

            return () => unsubscribe();
        }
    }, [allChats, currentChatId, dispatch]);

    // get all chats related to user
    useEffect(() => {
        async function getALlContectedChats() {
            const allContectedChats = await getAllChats(user?.uid);
            if (allContectedChats.length > 0) {
                setAllChats(allContectedChats)
                dispatch(setAllContectedChats(allContectedChats))
            }
        }
        getALlContectedChats();

    }, [user?.uid, dispatch]);

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
