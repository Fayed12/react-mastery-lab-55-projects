// local
import styles from './Home.module.css';
import ChatList from '../../components/ChatList/ChatList';
import Chat from '../../components/chat/chat';

const Home = () => {

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