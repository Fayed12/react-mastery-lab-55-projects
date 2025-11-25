// local
import styles from './input.module.css';

const Input = ({type, placeholder}) => {
    return (
        <input type={type} placeholder={placeholder} className={styles.input} />
    );
};

export default Input;