import * as React from 'react';
import { useState } from 'react';

type Props = {
    setTimeInSeconds: Function
};

function TimerControls(props: any) {
    const { setTimeInSeconds } = props;
    const [intervalId, setIntervalId] = useState<number>(0)
    const [show, setShow] = useState<boolean>(false)

    const handleStart = () => {
        let interval: any = setInterval(() => {
            setTimeInSeconds((previousState: number) => previousState + 1)
        }, 1000);
        setIntervalId(interval);
        setShow(true)
    }

    const handleStop = () => {
        clearInterval(intervalId);
        setShow(false)
    }

    const handleRest = () => {
        clearInterval(intervalId);
        setTimeInSeconds(0);
        setShow(false)

    }
    if (show === true) {
        return (
            <section className="row justify-content-around">
                <button onClick={handleRest} className="btn btn-warning btn-lg rounded-pill">Reset</button>
                <button onClick={handleStop} className="btn btn-danger btn-lg rounded-pill">Stop</button>
                {/* <button onClick={handleStart} className="btn btn-primary btn-lg">Start</button> */}
            </section>
        )
    } else {
        return (
            <section className="row justify-content-around">
                <button onClick={handleRest} className="btn btn-warning btn-lg rounded-pill">Reset</button>
                {/* <button onClick={handleStop} className="btn btn-danger btn-lg">Stop</button> */}
                <button onClick={handleStart} className="btn btn-success btn-lg rounded-pill">Start</button>
            </section>
        )
    }


}

export default TimerControls;