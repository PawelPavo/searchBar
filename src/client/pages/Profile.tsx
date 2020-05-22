import * as React from 'react';
import Navbah from '../components/Navbah';
import TimerControls from '../components/TimerControls'
import { useLocation } from 'react-router-dom';
import { getPathText } from '../utils/pathing';
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';

import calculateTimer from '../utils/calculateTimer'

const Profile: React.FC<IProfileProps> = () => {
    const { pathname } = useLocation()
    const navbarText = getPathText(pathname)

    const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
    const [timerArray, setTimerArray] = useState<Array<number | string>>([]);

    useEffect(() => {
        let timerArray: Array<number | string> = calculateTimer(timeInSeconds)
        setTimerArray(timerArray)
        calculateTimer(timeInSeconds)
    }, [timeInSeconds])

    return (
        <main className="container">
            <Helmet>
                <title>{navbarText}</title>
            </Helmet>
            <Navbah />
            <h2 className="text-center my-4 text-muted">{navbarText}</h2>
            <div className="row justify-content-center">
                <div className="col-md-6 timer-container">
                    <section className="timer-body">
                        <p className="timer-text">{timerArray[0]}</p>
                        <span>:</span>
                        <p className="timer-text">{timerArray[1]}</p>
                        <span>:</span>
                        <p className="timer-text">{timerArray[2]}</p>
                    </section>
                    <div className="control-div">
                        <TimerControls setTimeInSeconds={setTimeInSeconds} />
                    </div>
                </div>
            </div>


        </main >
    )
}

export interface IProfileProps { }



export default Profile;
