// local
import SettingsPopup from "../../components/settings/settings";
import style from "./counter.module.css";

// react
import { useReducer, useState } from "react";

// react icons
import { FaExclamationCircle } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { VscDebugRestart } from "react-icons/vsc";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";

// toast
import toast from "react-hot-toast";

// react-joyride
import Joyride from "react-joyride";

/*========================================================================
                                joyride objects
==========================================================================*/
const JoyrideSteps = [
  {
    target: ".info-btn",
    content: "This is the info button.",
    disableBeacon: true,
  },
  {
    target: ".counter",
    content: "This shows the current count.",
    disableBeacon: true,
  },
  {
    target: ".increment",
    content: "Click the + button to increase the count.",
    disableBeacon: true,
  },
  {
    target: ".decrement",
    content: "Click the - button to decrease the count.",
    disableBeacon: true,
  },
  {
    target: ".reset-btn",
    content: "Click this button to reset the count to zero.",
    disableBeacon: true,
  },
  {
    target: ".settings-btn",
    content: "Click here to open the counter settings.",
    disableBeacon: true,
  },
];

/*========================================================================
                            control reducer actions
==========================================================================*/
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      if (state.countStep === 0) {
        return {
          ...state,
          count: state.count + 1,
        };
      } else {
        return {
          ...state,
          count: state.count + Number(state.countStep),
        };
      }
    case "decrement":
      if (state.countStep === 0) {
        return {
          ...state,
          count: state.count - 1,
        };
      } else {
        return {
          ...state,
          count: state.count - Number(state.countStep),
        };
      }

    case "reset":
      return {
        ...state,
        count: 0,
      };
    case "openSettings":
      return {
        ...state,
        openSettings: !state.openSettings,
      };
    case "step":
      return {
        ...state,
        countStep: action.payload,
      };
    case "theme":
      return {
        ...state,
        theme: action.payload,
      };

    default:
      return state;
  }
}

/*========================================================================
                            starter values
==========================================================================*/
const initialState = {
  count: 0,
  openSettings: false,
  countStep: 0,
  theme: "dark",
};

function CounterPage() {
    const [{ count, openSettings, theme }, dispatch] = useReducer(
    reducer,
    initialState
    );
    const [runTour, setRunTour] = useState(false);

    /*========================================================================
                                handle increment count
    ==========================================================================*/
    function handleIncrement() {
        dispatch({ type: "increment" });
    }

    /*========================================================================
                                handle decrement count
    ==========================================================================*/
    function handleDecrement() {
        dispatch({ type: "decrement" });
    }

    /*========================================================================
                                handle reset count to zero
    ==========================================================================*/
    function handleResetValue() {
        if (count === 0) {
        toast.error("count value already 0!!", { id: "count-toast" });
        return;
        } else {
        const confirmMessage = window.confirm("Are you sure to reset Value? ");
        if (!confirmMessage) {
            toast.error("action closed!", { id: "count-toast" });
        } else {
            toast.loading("loading....", { id: "count-toast" });
            setTimeout(() => {
            dispatch({ type: "reset" });
            toast.success("done successfully!", { id: "count-toast" });
            }, 1000);
        }
        }
    }

    /*========================================================================
                                handle open settings popup
    ==========================================================================*/
    function handleOpenSettings() {
        dispatch({ type: "openSettings" });
    }

    /*========================================================================
                                handle change theme color
    ==========================================================================*/
    function handleTheme(color) {
        dispatch({ type: "theme", payload: color });
    }

    /*========================================================================
                                handle change step count
    ==========================================================================*/
    function handleSteps(step) {
        dispatch({ type: "step", payload: step });
    }
    return (
        <>
        <Joyride
            steps={JoyrideSteps}
            run={runTour}
            continuous={true}
            showSkipButton={true}
            showProgress={true}
            disableScrolling={true}
            spotlightClicks={true}
            styles={{
            options: {
                zIndex: 10000,
                arrowColor: "#fff",
                backgroundColor: "#fff",
                textColor: "#000",
                primaryColor: "#007bff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(255, 255, 255, 0.3)",
                fontSize: "14px",
                padding: "12px",
                width: 330,
            },
            buttonNext: {
                backgroundColor: "#292828ff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "6px 12px",
                marginLeft: "8px",
            },
            buttonBack: {
                backgroundColor: "#6c757d",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "6px 12px",
            },
            buttonSkip: {
                color: "#dc3545",
            },
            }}
        />

        <div
            className={`${style.counterPage} ${
            theme === "light" ? "lightMode" : ""
            }`}
        >
            <div className={style.counterHeader}>
            <button
                type="button"
                title="info"
                onClick={() => setRunTour(true)}
                className="info-btn"
            >
                <FaExclamationCircle />
            </button>
            <button
                type="button"
                title="settings"
                className="settings-btn"
                onClick={() => handleOpenSettings()}
            >
                <IoSettings />
            </button>
            <button
                type="button"
                title="restart"
                className="reset-btn"
                onClick={() => handleResetValue()}
            >
                <VscDebugRestart />
            </button>
            </div>
            <div className={style.counter}>
            <div>
                {count !== 0 && (
                <button
                    type="button"
                    title="restart"
                    className={`${style.decrement} decrement`}
                    onClick={() => handleDecrement()}
                >
                    <FaMinusCircle />
                </button>
                )}
            </div>
            <div className={style.countNum}>
                <span className="counter">{count}</span>
            </div>
            <div>
                {count <= 999 && (
                <button
                    type="button"
                    title="restart"
                    className={`${style.increment} increment`}
                    onClick={() => handleIncrement()}
                >
                    <FaPlusCircle />
                </button>
                )}
            </div>
            </div>
        </div>
        {openSettings && (
            <SettingsPopup
            closeFunc={handleOpenSettings}
            stepsFunc={handleSteps}
            funcTheme={handleTheme}
            themeMood={theme}
            />
        )}
        </>
    );
}

export default CounterPage;
