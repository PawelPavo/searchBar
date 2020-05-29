import * as React from 'react';
import Navbah from '../components/Navbah';
import TimerControls from '../components/TimerControls'
import { useLocation } from 'react-router-dom';
import { getPathText } from '../utils/pathing';
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import * as moment from 'moment';


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
        <main className="container ">
            <Helmet>
                <title>{navbarText}</title>
            </Helmet>
            <Navbah />
            <h2 className="text-center my-4 text-muted">{navbarText}</h2>
            <section className="timer-body text-center my-5 timer-container">
                {/* <span className="timer-text">{timerArray[0]}</span>
                <span> </span> */}
                <span className="timer-text ">{timerArray[0]}:{timerArray[1]} </span>
                <span> </span>
                <span className="timer-text mil-sec"> {timerArray[2]}</span>
            <div className="control-div timer-container py-5">
                <TimerControls setTimeInSeconds={setTimeInSeconds} />
            </div>
            </section>
        </main >
    )
}

export interface IProfileProps { }



export default Profile;
