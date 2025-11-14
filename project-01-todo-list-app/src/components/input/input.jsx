// local
import style from "./input.module.css";

function Input({ type, placeholder, inpValue, changeFunc }) {
  return (
    <>
      <input
        className={style.inp}
        type={type}
        placeholder={placeholder}
        value={inpValue}
        onChange={(e) => changeFunc(e)}
      />
    </>
  );
}

export default Input;
