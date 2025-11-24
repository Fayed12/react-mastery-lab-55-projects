// react
import { useState, useRef, useEffect } from "react";


function Timer() {
    const [time, setTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [inputTime, setInputTime] = useState({
        inpHours: 0,
        inpMinutes: 0,
        inpSeconds: 0,
    });
    const [openTimer, setOpenTimer] = useState(false);
    const timerInterval = useRef(null);
    const startTimer = useRef(null);
    const [isRunning, setIsRunning] = useState(false);

    /*==========================================================================================================================
                                function to set value to timer after click start button
    ==========================================================================================================================*/
    function handleSetValueToTimer() {
        // check if input has non falsy value
        if (!inputTime.inpHours && !inputTime.inpMinutes && !inputTime.inpSeconds) {
            alert("Please enter a valid time");
            return;
        }

        // set value to timer
        setTime({
            hours: inputTime.inpHours,
            minutes: inputTime.inpMinutes,
            seconds: inputTime.inpSeconds,
        });

        // open timer card
        setOpenTimer(true);

        // check if there is last time or not, if not then set the time
        if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
            // get user time in milliseconds
            const userHour = inputTime.inpHours;
            const userMinute = inputTime.inpMinutes;
            const userSecond = inputTime.inpSeconds;
            const allTimeAsMillySeconds = userHour * 60 * 60 * 1000 + userMinute * 60 * 1000 + userSecond * 1000;
    
            // set start time by adding user time to current time
            startTimer.current = new Date().getTime() + allTimeAsMillySeconds;
        } else {
            // get user time in milliseconds
            const userHour = time.hours;
            const userMinute = time.minutes;
            const userSecond = time.seconds;
            const allTimeAsMillySeconds = userHour * 60 * 60 * 1000 + userMinute * 60 * 1000 + userSecond * 1000;

            // set start time by adding user time to current time
            startTimer.current = new Date().getTime() + allTimeAsMillySeconds;
        }


        // start timer interval
        timerInterval.current = setInterval(() => {
            const currentTime = new Date().getTime();

            // calculate left time by subtracting current time from start time
            const leftTime = ((startTimer.current - currentTime));
            if (leftTime < 0) {
                clearInterval(timerInterval.current);
                setOpenTimer(false);
                startTimer.current = null;
                timerInterval.current = null;
                setInputTime({
                    inpHours: 0,
                    inpMinutes: 0,
                    inpSeconds: 0,
                });
                setTime({
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                });
                return;
            }

            // calculate left time in hours, minutes and seconds
            const leftHours = Math.floor(leftTime / (60 * 60 * 1000));
            const leftMinutes = Math.floor((leftTime % (60 * 60 * 1000)) / (60 * 1000));
            const leftSeconds = Math.floor((leftTime % (60 * 1000)) / 1000);

            // set time to change time display
            setTime({
                hours: leftHours,
                minutes: leftMinutes,
                seconds: leftSeconds
            })
        }, 10);

        setIsRunning(true);
    }

    /*==========================================================================================================================
                            function to stop timer
    ==========================================================================================================================*/
    function handleStopTimer() {
        // check if timer is running
        if (!timerInterval.current) {
            return;
        }

        // if running, clear the interval
        clearInterval(timerInterval.current);
        timerInterval.current = null;

        setIsRunning(false);
    }

    /*==========================================================================================================================
                            function to reset timer
    ==========================================================================================================================*/
    function handleResetTimer() {
        // clear the interval
        clearInterval(timerInterval.current);
        timerInterval.current = null;

        // reset the start time
        startTimer.current = null;

        // reset the time
        setTime({
            hours: 0,
            minutes: 0,
            seconds: 0,
        });

        // reset the input time
        setInputTime({
            inpHours: 0,
            inpMinutes: 0,
            inpSeconds: 0,
        });

        setIsRunning(false);
        setOpenTimer(false);
    }

    // clear the interval when component unmount
    useEffect(() => {
        return () => clearInterval(timerInterval.current);
    }, []);

    /*==========================================================================================================================
                            render timer component
    ==========================================================================================================================*/
    return (
        <div className="stopwatch-page">

            <div className="stopwatch-card">
                {openTimer ? (<div className="time-display">
                    <div className="time-unit">
                        <span className="time-value">{time.hours < 10 ? `0${time.hours}` : time.hours}</span>
                        <span className="time-label">Hr</span>
                    </div>
                    <span className="separator">:</span>
                    <div className="time-unit">
                        <span className="time-value">{time.minutes < 10 ? `0${time.minutes}` : time.minutes}</span>
                        <span className="time-label">Min</span>
                    </div>
                    <span className="separator">:</span>
                    <div className="time-unit">
                        <span className="time-value">{time.seconds < 10 ? `0${time.seconds}` : time.seconds}</span>
                        <span className="time-label">Sec</span>
                    </div>
                </div>) : (<div className="timer-inputs">
                    <div className="input-group">
                        <input type="number" placeholder="00" min="0" max="99" value={inputTime.inpHours} onChange={(e) => setInputTime({ ...inputTime, inpHours: Number(e.target.value) })} />
                        <label>Hours</label>
                    </div>
                    <div className="input-group">
                        <input type="number" placeholder="00" min="0" max="59" value={inputTime.inpMinutes} onChange={(e) => setInputTime({ ...inputTime, inpMinutes: Number(e.target.value) })} />
                        <label>Minutes</label>
                    </div>
                    <div className="input-group">
                        <input type="number" placeholder="00" min="0" max="59" value={inputTime.inpSeconds} onChange={(e) => setInputTime({ ...inputTime, inpSeconds: Number(e.target.value) })} />
                        <label>Seconds</label>
                    </div>
                </div>)}

                <div className="controls">
                    <button className={!isRunning ? "stopwatch-btn stopRunningBtn stop timer-btn-stop" : "stopwatch-btn stop timer-btn-stop"} disabled={!isRunning} onClick={handleStopTimer}>Stop</button>
                    <button className={!isRunning ? "stopwatch-btn startRunningBtn start timer-btn-start" : "stopwatch-btn start timer-btn-start"} disabled={isRunning} onClick={handleSetValueToTimer}>Start</button>
                    <button className="stopwatch-btn reset timer-btn-reset" onClick={handleResetTimer}>Reset</button>
                </div>
            </div>
        </div>
    );  
}

export default Timer;