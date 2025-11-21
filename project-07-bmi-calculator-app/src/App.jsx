// react
import { useState } from "react";

// toast
import toast from "react-hot-toast";

function App() {
    const [measurements, setMeasurements] = useState({
        heightInCM: 0,
        weightInKG: 0,
    });
    const [bmiResult, setBmiResult] = useState(0);
    const [gender, setGender] = useState("");
    /*===================================================================================================================
                                    check empty value
  =======================================================================================================================*/
    function handleCheckEmptyValue() {
        if (!measurements.heightInCM) {
            toast.error("please enter your tall?", { id: "bmi" });
            return false;
        } else if (!measurements.weightInKG) {
            toast.error("please enter your weight?", { id: "bmi" });
            return false;
        } else {
            return true;
        }
    }

    /*===================================================================================================================
                                    check truth values
  =======================================================================================================================*/
    function checkTruthValues() {
        if (measurements.weightInKG <= 20) {
            toast.error("please make sure the weight is greater than 20KG", {
                id: "bmi",
            });
            return false;
        } else if (measurements.heightInCM <= 70) {
            toast.error("please make sure the tall is greater than 70CM", {
                id: "bmi",
            });
            return false;
        } else {
            return true;
        }
    }

    /*===================================================================================================================
                                    calculate BMI function
  =======================================================================================================================*/
    function handleCalculateBMI(e) {
        e.preventDefault();
        if (!handleCheckEmptyValue()) return;
        if (!checkTruthValues()) return;
        toast.loading("loading.....", { id: "bmi" });
        setTimeout(() => {
            const tallInM = measurements?.heightInCM / 100;
            const result = measurements?.weightInKG / (tallInM * tallInM);
            setBmiResult(result.toFixed(1));
            toast.success("calculation done successfully", { id: "bmi" });
        }, 2000);
    }

    /*===================================================================================================================
                                    reset all values if there is any mistake in writing data
  =======================================================================================================================*/
    function handelResetValues() {
        if (!measurements.heightInCM && !measurements.weightInKG) {
          toast.error("Nothing to reset" ,{})
        } else {
          toast.loading("loading.....", { id: "bmi" });
          setTimeout(() => {
              setMeasurements({
                  heightInCM: 0,
                  weightInKG: 0,
              }),
                  setGender("");
              toast.success("reset done successfully", { id: "bmi" });
          }, 1500);
        }
    }

    return (
        <>
            <div className="all-page">
                <div className="card-decor" aria-hidden>
                    <svg
                        width="420"
                        height="120"
                        viewBox="0 0 420 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="decor-top">
                        <defs>
                            <linearGradient id="g1" x1="0" x2="1">
                                <stop
                                    offset="0"
                                    stopColor="#3aa0ff"
                                    stopOpacity="0.14"
                                />
                                <stop
                                    offset="1"
                                    stopColor="#1e88ff"
                                    stopOpacity="0.06"
                                />
                            </linearGradient>
                        </defs>
                        <rect
                            x="20"
                            y="10"
                            width="380"
                            height="100"
                            rx="50"
                            fill="url(#g1)"></rect>
                        <g opacity="0.9">
                            <circle
                                cx="60"
                                cy="40"
                                r="18"
                                fill="#1e88ff"
                                opacity="0.08">
                                <animate
                                    attributeName="cy"
                                    values="40;34;40"
                                    dur="6s"
                                    repeatCount="indefinite"
                                />
                            </circle>
                            <circle
                                cx="120"
                                cy="30"
                                r="12"
                                fill="#3aa0ff"
                                opacity="0.06">
                                <animate
                                    attributeName="cx"
                                    values="120;128;120"
                                    dur="7s"
                                    repeatCount="indefinite"
                                />
                            </circle>
                        </g>
                    </svg>
                </div>
                <div className="header">
                    <h1>Calculate your BMI </h1>
                </div>
                <div className="form">
                    <form onSubmit={(e) => handleCalculateBMI(e)}>
                        <div className="gender">
                            <div
                                className="male"
                                role="button"
                                aria-pressed="false">
                                <img src="/male.svg" alt="male" />
                                <button
                                    type="button"
                                    onClick={() => setGender("male")}
                                    className={
                                        gender === "female" ? "disabled" : ""
                                    }
                                    disabled={
                                        gender == "female" ? true : false
                                    }>
                                    {" "}
                                    Male
                                </button>
                            </div>
                            <div
                                className="female"
                                role="button"
                                aria-pressed="false">
                                <img src="/female.svg" alt="female" />
                                <button
                                    type="button"
                                    onClick={() => setGender("female")}
                                    className={
                                        gender === "male" ? "disabled" : ""
                                    }
                                    disabled={gender == "male" ? true : false}>
                                    Female
                                </button>
                            </div>
                        </div>

                        <div className="age">
                            <input
                                type="number"
                                name="age"
                                placeholder="21"
                                max={100}
                            />
                            <span>Years</span>
                        </div>
                        <div className="tall">
                            <input
                                type="number"
                                name="tall"
                                max={300}
                                value={measurements.heightInCM}
                                onChange={(e) =>
                                    setMeasurements({
                                        ...measurements,
                                        heightInCM: e.target.value,
                                    })
                                }
                            />
                            <span>CM</span>
                        </div>
                        <div className="weight">
                            <input
                                type="number"
                                name="weight"
                                value={measurements.weightInKG}
                                onChange={(e) =>
                                    setMeasurements({
                                        ...measurements,
                                        weightInKG: e.target.value,
                                    })
                                }
                            />
                            <span>KG</span>
                        </div>
                        <button type="submit"> Calculate Your BMI</button>
                    </form>
                        <div className="resetContainer">
                            <button
                                type=" button"
                                className="reset"
                                onClick={() => handelResetValues()}>
                                Reset
                            </button>
                        </div>
                </div>
                <footer>
                    <p>
                        &copy; all right reserved, by{" "}
                        <span className="author">Mohamed Fayed</span>
                    </p>
                </footer>
            </div>
        </>
    );
}

export default App;
