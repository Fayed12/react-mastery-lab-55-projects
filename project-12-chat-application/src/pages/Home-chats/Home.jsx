// local
import styles from './Home.module.css';
import ChatList from '../../components/ChatList/ChatList';
import Chat from '../../components/chat/chat';
import { getCurrentChatId, getAllContectedChats, setAllContectedChats } from '../../redux/chatsSlice';
import { selectUser } from '../../redux/authSlice';
import getAllChats from '../../fierbase-services/fireStore/getallChats';

// redux
import { useDispatch, useSelector } from 'react-redux';

// react
import { useEffect, useState } from 'react';

const Home = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [allChats, setAllChats] = useState([]);
    const currentChatId = useSelector(getCurrentChatId);
    // console.log(currentChatId)
    // console.log(allChats)

    useEffect(() => {
        // const chat = allChats.find((item) => item.id === currentChatId);
        // if (chat) {
        //     console.log(chat.id)
        // } else {
        //     // console.log(currentChatId)
        //     console.log("no chat")
        // }

        allChats.forEach((item) => {
            if (String(item.id) === String(currentChatId)) {
                console.log(item.id)
                console.log(currentChatId)
            } else {
                console.log(item.id)
                console.log(currentChatId)
            }
        })
    }, [allChats, currentChatId]);

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
