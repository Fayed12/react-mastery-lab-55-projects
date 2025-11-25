// local
import styles from './button.module.css';

const Button = ({ type, onClick, content, className }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${styles.button} ${className || ''}`}
        >
            {content}
        </button>
    );
};

export default Button;
