// react
import { useRef, useState } from "react";

// toast
import toast from "react-hot-toast";

export default function Calculator() {
    const [numbers, setNumbers] = useState("");
    const [result, setResult] = useState(0);
    const [process, setProcess] = useState("");
    const calcNumbers = useRef([]);

    // initial values
    const buttons = [
        "C",
        "±",
        "%",
        "/",
        "7",
        "8",
        "9",
        "*",
        "4",
        "5",
        "6",
        "-",
        "1",
        "2",
        "3",
        "+",
        "0",
        ".",
        "=",
    ];

    // main values used in logic
    const number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "±", "."];
    const operator = ["+", "-", "/", "%", "*"];
    const maxLength = 8;

    /* ================================================================================================================================
                            main function ==> Gather all the numbers in one array and specify the operations on them.
    ====================================================================================================================================*/
    function handleCollectNumbers(button) {
        // 1- check that press button is [number | ± | .]
        if (number.includes(button)) {
            // 2- handel positive and negative signs
            if (button === "±") {
                setNumbers((prev) => {
                    if (!prev) return "";
                    return prev.startsWith("-") ? prev.slice(1) : "-" + prev;
                });
                setProcess((prev) => {
                    if (!prev) return "";
                    return prev.startsWith("-") ? prev.slice(1) : "-" + prev;
                });
            } else {
                // 3- handle decimal point sign
                if (button === ".") {
                    if (numbers.includes(".")) {
                        return;
                    } else {
                        // 4- Determining the length of the number in decimal number
                        checkMaxLength(button);
                    }
                } else {
                    // 5- Determining the length of the number in normal number
                    checkMaxLength(button);
                }
            }
        } else {
            // 6- check the operator sign
            if (operator.includes(button)) {
                // 7- check if there is one operator sign Once and not repeated consecutively
                if (!numbers) {
                    toast.error("please add new number", { id: "calc-toast" });
                } else {
                    // 8- if no repeated sign operator ==> and press one, add the number and operator to array, then clear display
                    calcNumbers.current.push(Number(numbers));
                    calcNumbers.current.push(button);
                    setProcess((prev) => prev + button);
                    setNumbers("");
                }
            }

            // 9- if user press "C" button ==> clear the display and history array
            if (button === "C") {
                if (Number(numbers)) {
                    setNumbers("");
                    setProcess("")
                    setResult(0)
                    calcNumbers.current = [];
                    toast.success("All values have been reset", {
                        id: "calc-toast",
                    });
                } else if (!Number(numbers)) {
                    toast.error("already 0!", {
                        id: "calc-toast",
                    });
                }
            }

            // 10- if user finally press "=" sign ==> then check the number and calcNumber array and then make calculation process
            if (button === "=") {
                if (Number.isNaN(Number(calcNumbers.current.at(-1)))) {
                    if (numbers) calcNumbers.current.push(Number(numbers));
                    if (checkOperation()) {
                        calculationProcess();
                    }
                } else {
                    // checkOperation();
                    // calculationProcess();
                    if (checkOperation()) {
                        calculationProcess();
                    }
                }
            }
        }
    }

    /*========================================================================================
                        check if the operation is complete and perfect syntax
    ==========================================================================================*/
    function checkOperation() {
        if (operator.includes(calcNumbers.current.at(-1))) {
            toast.error("Incomplete operation", { id: "calc-toast" });
            return false;
        } else {
            return true;
        }
    }

    /*========================================================================================
                        check if the user exceeded the maximum value
    ==========================================================================================*/
    function checkMaxLength(button) {
        if (numbers.length < maxLength) {
            setNumbers((prev) => prev + button);
            setProcess((prev) => prev + button);
        } else {
            toast.error("max limit, try make operator", { id: "calc-toast" });
        }
    }

    /*========================================================================================
                        Main calculation function
    ==========================================================================================*/
    function calculationProcess() {
        // 1- get the current array and check length
        const calcArray = calcNumbers.current;
        if (calcArray.length === 0) return 0;

        let step1 = [];
        let i = 0;

        // 2- here we check to all elements in array that element == [* || /],
        // if not equal ==> push this element in step1 array,
        //  if equal tack the last number as prev and make i+1 to tack the next number, then check the process
        // if the process end successful push the result to array as the last number in array to make loop again
        while (i < calcArray.length) {
            if (
                calcArray[i] === "*" ||
                calcArray[i] === "/" ||
                calcArray[i] === "%"
            ) {
                const prev = step1.pop();
                const next = calcArray[i + 1];

                let result;
                if (calcArray[i] === "*") result = prev * next;
                if (calcArray[i] === "/") {
                    if (prev > next) {
                        result = (prev / next).toFixed(2);
                    } else if (prev == next) {
                        result = (prev / next).toFixed(0);
                    } else{
                        result = (prev / next).toFixed(4);
                    }
                };
                if (calcArray[i] === "%") result = (prev * next) / 100;

                step1.push(result);
                i += 2;
            } else {
                // 3- if this element in array not equal to [* || /] push to step1 array
                step1.push(calcArray[i]);
                i++;
            }
        }

        // 4- after end the first process to check the [* || /] process, now calc the [+ || -] in for loop and not leave the loop before finishing it
        let result = step1[0];

        for (let j = 1; j < step1.length; j += 2) {
            const op = step1[j];
            const next = step1[j + 1];

            if (op === "+") result += next;
            if (op === "-") result -= next;
        }

        setResult(result);
        setNumbers(String(result));
        calcNumbers.current = [];
        setProcess(String(result));
        return result;
    }

    return (
        <div className="calc-container">
            <div className="calc-box">
                <div className="calc-header">
                    <h2>Calculator</h2>
                </div>

                <div className="calc-display">
                    <span className="result">{result}</span>
                    <span className="process">P: {process}</span>
                    <div className="calc-display-text">{numbers || 0}</div>
                </div>

                <div className="calc-grid">
                    {buttons.map((b, i) => {
                        const isOperator = [
                            "/",
                            "*",
                            "-",
                            "+",
                            "=",
                            "%",
                        ].includes(b);
                        const isClear = b === "C";
                        const isZero = b === "0";
                        const isEquals = b === "=";

                        let className = "calc-btn";
                        if (isEquals) className += " equals";
                        else if (isOperator) className += " operator";
                        else if (isClear) className += " clear";

                        return (
                            <button
                                key={i}
                                className={`${className} ${
                                    isZero ? "zero" : ""
                                }`}
                                onClick={() => handleCollectNumbers(b)}>
                                {b}
                            </button>
                        );
                    })}
                </div>

                <p className="calc-footer"> &copy; by mohamed Fayed</p>
            </div>
        </div>
    );
}
