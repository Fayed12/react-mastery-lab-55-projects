// local
import styles from "./mainInput.module.css";

const MainInput = ({ type, placeholder, register, name, defaultValue = "", icon: Icon }) => {
    return (
        <div className={styles.inputContainer}>
            {Icon && <div className={styles.iconWrapper}><Icon /></div>}
            <input
                type={type}
                placeholder={placeholder}
                {...register}
                name={name}
                defaultValue={defaultValue}
                className={styles.input}
            />
        </div>
    );
};

export default MainInput;