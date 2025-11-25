// local
import styles from './input.module.css';

const Input = ({name,type, placeholder, register}) => {
    return (
        <input name={name} type={type} placeholder={placeholder} className={styles.input} {...register} />
    );
};

export default Input;