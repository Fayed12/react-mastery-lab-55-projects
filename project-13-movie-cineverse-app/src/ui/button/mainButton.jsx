// props type
import PropTypes from "prop-types";

// local
import styles from "./button.module.css"

function MainButton({ type = "button", content = "base Button", isDisabled = false, clickEvent = () => { }, title = "button" }) {
    return (
        <>
            <button className={styles.button} type={type} disabled={isDisabled} onClick={() => clickEvent()} title={title} aria-label={title}>{content}</button>
        </>
    );
}

export default MainButton;

MainButton.propTypes = {
    type: PropTypes.string,
    content: PropTypes.string,
    isDisabled: PropTypes.bool,
    clickEvent: PropTypes.func,
};
