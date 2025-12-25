// prop type
import PropTypes from "prop-types";

// local
import styles from "./MainInput.module.css"

function MainInput({ type, name, placeholder, title, register }) {
    return (
        <div className={styles.inputGroup}>
            <input
                className={styles.input}
                type={type}
                name={name}
                placeholder={placeholder}
                title={title}
                aria-label={title}
                {...register}
            />
        </div>
    );
}


MainInput.PropTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    title: PropTypes.string,
};

export default MainInput;