import { useRef, useState } from "react";

export default function Calculator() {
    const [numbers, setNumbers] = useState("");
    const calcNumbers = useRef([]);
    // const [operator]
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
                    alert("error");
                } else {
                    // 8- if no repeated sign operator ==> and press one, add the number and operator to array, then clear display
                    calcNumbers.current.push(Number(numbers));
                    calcNumbers.current.push(button);
                    setNumbers("");
                }
            }

            // 9- if user press "C" button ==> clear the display and history array
            if (button === "C") {
                setNumbers("");
                calcNumbers.current = [];
            }

            // 10- if user finally press "=" sign ==> then check the number and calcNumber array and then make calculation process
            if (button === "=") {
                if (Number.isNaN(Number(calcNumbers.current.at(-1)))) {
                    if (numbers) calcNumbers.current.push(Number(numbers));
                    checkOperation();
                } else {
                    checkOperation();
                }
            }
        }
    }

    /*========================================================================================
                        check if the operation is complete and perfect syntax
    ==========================================================================================*/
    function checkOperation() {
        if (operator.includes(calcNumbers.current.at(-1))) {
            alert("Incomplete operation");
            return;
        } else {
            console.log(calcNumbers.current);
            return;
        }
    }

    /*========================================================================================
                        check if the user exceeded the maximum value
    ==========================================================================================*/
    function checkMaxLength(button) {
        if (numbers.length < maxLength) {
            setNumbers((prev) => prev + button);
        } else {
            alert("max limit, try make operator");
        }
    }
    return (
        <div className="calc-container">
            <div className="calc-box">
                <div className="calc-header">
                    <h2>Calculator</h2>
                </div>

                <div className="calc-display">
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
