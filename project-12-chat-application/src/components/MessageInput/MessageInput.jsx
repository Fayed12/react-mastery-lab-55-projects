import styles from './MessageInput.module.css';

const MessageInput = () => {
    return (
        <div className={styles.container}>
            <input type="text" placeholder="Type a message..." />
            <button>Send</button>
        </div>
    );
};

export default MessageInput;
