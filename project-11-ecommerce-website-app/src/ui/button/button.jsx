// react
import style from "./button.module.css";

function Button({ type, content, onClick, disabled = false, title = "buuton" }) {
    return (
        <>
            <button aria-label={title} type={type} onClick={onClick} className={style.button} disabled={disabled}>{content}</button>
        </>
    );
}

export default Button;
