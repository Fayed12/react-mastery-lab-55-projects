// local
import styles from './Home.module.css';
import ChatList from '../../components/ChatList/ChatList';
import Chat from '../../components/chat/chat';
import { getCurrentChatId, setAllContectedChats, setCurrentChatMessages } from '../../redux/chatsSlice';
import { selectUser } from '../../redux/authSlice';
import getAllChats from '../../fierbase-services/fireStore/getallChats';
import getMessages from '../../fierbase-services/fireStore/getAllChatMessages';
import { setAllAppUsers } from '../../redux/usersSlice';
import getAppUsers from '../../fierbase-services/fireStore/getAllAppUsers';
import { setLoginUser } from '../../redux/usersSlice';

// redux
import { useDispatch, useSelector } from 'react-redux';

// react
import { useEffect, useState } from 'react';

const Home = () => {
    const user = useSelector(selectUser);
    const currentChatId = useSelector(getCurrentChatId);
    const dispatch = useDispatch();

    // local state
    const [allChats, setAllChats] = useState([]);

    // compare all chats with the current id ser press 
    useEffect(() => {
        const chat = allChats.find((item) => item.id === currentChatId);
        if (chat) {
            const unsubscribe = getMessages(chat.id, (messages) => {
                dispatch(setCurrentChatMessages(messages))
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
    }, [user, dispatch]);

    // get all app users
    useEffect(() => {
        async function getAllAppUsers() {
            const allAppUsers = await getAppUsers();
            if (allAppUsers.length > 0) {
                const allUsers= allAppUsers.filter((u)=>u.uid !== user.uid)
                dispatch(setAllAppUsers(allUsers))
                dispatch(setLoginUser(allAppUsers.filter((u) => u.uid === user.uid)[0]))
            }
        }
        getAllAppUsers();
    }, [dispatch, user]);

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

// Hoda@h123