// local
import styles from "./mainButton.module.css";

const MainButton = ({type, title, onclick, children  }) => {
    return <button type={type} onClick={onclick} title={title} className={styles.button}>{children}</button>
};

export default MainButton;
