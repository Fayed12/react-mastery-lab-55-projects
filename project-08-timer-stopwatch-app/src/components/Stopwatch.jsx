// react
import { useState, useRef } from "react";

function Stopwatch() {
    const [time, setTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [elapsed, setElapsed] = useState(0);
    const intervalRef = useRef(null);
    const startTimeRef = useRef(null);
    const [isRunning, setIsRunning] = useState(false);

    /*============================================================================================================================
                                            start stopwatch function 
    ============================================================================================================================*/

    function handleStartStopWatch() {
        // check if the interval is already running
        if (intervalRef.current) {
            return;
        }

        // if not running, get and store starter time
        startTimeRef.current = Date.now() - elapsed;

        // start the interval
        intervalRef.current = setInterval(() => {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTimeRef.current;
            const hours = Math.floor(elapsedTime / 3600000);
            const minutes = Math.floor((elapsedTime % 3600000) / 60000);
            const seconds = Math.floor((elapsedTime % 60000) / 1000);
            setElapsed(elapsedTime);
            setTime({
                hours,
                minutes,
                seconds,
            });
        }, 1000);

        setIsRunning(true);
    }

    /*============================================================================================================================
                                            stop stopwatch function 
    ============================================================================================================================*/

    function handleStopStopWatch() {
        // check if the interval is running
        if (!intervalRef.current) {
            return;
        }

        // if running, clear the interval
        clearInterval(intervalRef.current);
        intervalRef.current = null;

        setIsRunning(false);
    }

    /*============================================================================================================================
                                            reset stopwatch function 
    ============================================================================================================================*/

    function handleResetStopWatch() {
        // clear the interval
        clearInterval(intervalRef.current);
        intervalRef.current = null;

        // reset the start time
        startTimeRef.current = null;

        // reset the time
        setTime({
            hours: 0,
            minutes: 0,
            seconds: 0,
        });

        // reset the elapsed time
        setElapsed(0);

        setIsRunning(false);
    }

    /*============================================================================================================================
                                            render stopwatch component 
    ============================================================================================================================*/
    return (
        <div className="stopwatch-page">

            <div className="stopwatch-card">
                <div className="time-display">
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
                </div>

                <div className="controls">
                    <button className={!isRunning ? "stopwatch-btn stopRunningBtn stop" : "stopwatch-btn stop"} onClick={handleStopStopWatch} disabled={!isRunning}>Stop</button>
                    <button className={isRunning ? "stopwatch-btn runningBtn start" : "stopwatch-btn start"} onClick={handleStartStopWatch} disabled={isRunning}>Start</button>
                    <button className="stopwatch-btn reset" onClick={handleResetStopWatch}>Reset</button>
                </div>
            </div>
        </div>
    );
}

export default Stopwatch;