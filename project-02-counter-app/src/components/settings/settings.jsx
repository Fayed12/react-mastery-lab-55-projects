// local
import style from "./settings.module.css";

// react
import { useState } from "react";

// toast
import toast from "react-hot-toast";

// react icon
import { IoIosCloseCircle } from "react-icons/io";

function SettingsPopup({ closeFunc, stepsFunc, funcTheme, themeMood }) {
  const [countStep, setCountStep] = useState(1);
  const [theme, setTheme] = useState(themeMood);

  /*========================================================================
                                change theme text inside popup
    ==========================================================================*/
  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  /*========================================================================
                            handle save changes
    ==========================================================================*/
  function handleSaveValues() {
    toast.loading("loading....", { id: "toast" });
    setTimeout(() => {
      stepsFunc(countStep);
      funcTheme(theme === "light" ? "dark" : "light");
      closeFunc();
      toast.success("done", { id: "toast" });
    }, 1000);
  }

  return (
    <>
      <div className={style.settingsPopup}>
        <div className={style.overlay}></div>
        <div className={style.popup}>
          <h3 className={style.header}>Settings</h3>

          <label className={style.label}>Count Step</label>
          <input
            type="number"
            className={style.input}
            value={countStep}
            onChange={(e) => setCountStep(e.target.value)}
          />

          <button className={style.themeBtn} onClick={toggleTheme}>
            Change Theme To ( {theme === "light" ? "dark" : "light"} )
          </button>
          <button className={style.saveBtn} onClick={() => handleSaveValues()}>
            Save
          </button>

          <button
            type="button"
            title="close"
            className={style.closeBtn}
            onClick={() => closeFunc()}
          >
            <IoIosCloseCircle />
          </button>
        </div>
      </div>
    </>
  );
}

export default SettingsPopup;
