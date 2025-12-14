// local
import styles from './MessageInput.module.css';
import { sendMessage } from '../../fierbase-services/fireStore/addNewMessage';
import { selectUser } from '../../redux/authSlice';
import { getCurrentChatId } from '../../redux/chatsSlice';

// redux
import { useSelector } from 'react-redux';

// react
import { useState } from 'react';

// react icons
import { TbActivityHeartbeat } from "react-icons/tb";
import { RiSendPlaneFill } from "react-icons/ri";

const MessageInput = () => {
    const user = useSelector(selectUser);
    const currentChatId = useSelector(getCurrentChatId);

    // local state
    const [message, setMessage] = useState('');

    // handle send new message
    async function handleSendMessage(e) {
        e.preventDefault();
        if (message.trim() === '') return;
        await sendMessage(currentChatId, user.uid, message.trim());
        setMessage('');
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSendMessage}>
                <input type="text" placeholder="Type a message..." name='message' value={message} onChange={(e) => setMessage(e.target.value)} />
                <button title='Send Message' type='submit'>{message.trim() === '' ? <span className={styles.empty}><TbActivityHeartbeat /></span> : <span className={styles.send}><RiSendPlaneFill /></span>}</button>
            </form>
        </div>
    );
};

export default MessageInput;
