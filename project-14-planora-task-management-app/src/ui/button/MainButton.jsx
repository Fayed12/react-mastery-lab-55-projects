// local
import styles from './MainButton.module.css';

// prop types
import PropTypes from 'prop-types';

const MainButton = ({ type = "button", title = "", clickEvent, isDisabled = false, content }) => {
    return (
        <button className={styles.btn} aria-label={title} type={type} title={title} onClick={clickEvent} disabled={isDisabled}>{content}</button>
    );
};


MainButton.PropTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    clickEvent: PropTypes.func,
    isDisabled: PropTypes.bool,
    content: PropTypes.node,
}

export default MainButton;