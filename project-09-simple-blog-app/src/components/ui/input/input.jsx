// local
import styles from './input.module.css';

const Input = ({name,type, placeholder, register, ref}) => {
    return (
        <input ref={ref} name={name} type={type} placeholder={placeholder} className={styles.input} {...register} />
    );
};

export default Input;