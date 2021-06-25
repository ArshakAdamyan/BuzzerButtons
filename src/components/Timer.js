import '../stylesheets/Timer.css';
import React, { useState } from 'react';


const StartButton =(startFunc) => {
    return(
    <>
        <button onClick={() => startFunc}>Start</button>
    </>
    )
}

const PauseButton =(pauseFunc) => {
    return(
        <>
            <button onClick={() => pauseFunc}>Pause</button>
        </>
    )
}

const ResetButton =(resetFunc) => {
    return(
        <>
            <button onClick={() => resetFunc}>Reset</button>
        </>
    )
}
const Timer = ({props}) => {

    let setTimer = { time: { m: [0, 1], s: [0, 0] }, seconds: 60, timeColor: '#ffffff' };
    let timer = 0;

    const [timerShow, changeTime]=useState(setTimer)
    // const [ti1mer, changeTime]=useState(timer)


    const secondsToTime = (secs) => {
        let hours = Math.floor(secs / (60 * 60));
        let h = [Math.floor(hours / 10), hours % 10];

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
        let m = [Math.floor(minutes / 10), minutes % 10];

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
        let s = [Math.floor(seconds / 10), seconds % 10];

        let obj = {
            "h": h,
            "m": m,
            "s": s
        };
        return obj;
    }

    const startTimer = () => {
        console.log(true);
        if (timer === 0) {
            this.timer = setInterval(countDown, 1000);
            timer = setInterval(countDown, 1000);
        }
    }

    const pauseTimer = () => {
        clearInterval(this.timer);
        timer = 0;
    }

    const resetTimer = () => {
        clearInterval(timer);
        timer = 0;
        changeTime({ time: { m: [0, 1], s: [0, 0] }, seconds: 60, timeColor: '#ffffff' });
    }

    const countDown = () => {
        // Remove one second, set state so a re-render happens.
        let seconds = setTimer.seconds - 1;
        changeTime({
            time: secondsToTime(seconds),
            seconds: seconds,
        });

        // Play Sound
        let timeSound = document.getElementById('timeSound');

        // Check if we are near to end change color
        if (seconds < 10) {
            document.getElementById('timeSoundDanger').play();
            changeTime({ timeColor: '#ff0000' });
        } else if (seconds < 25) {
            // timeSound.play();
            changeTime({ timeColor: '#ff8800' });
        } else {
            timeSound.play();
            changeTime({ timeColor: '#ffffff' });
        }

        // Check if we're at zero.
        if (seconds === 0) {
            clearInterval(timer);
        }
    }

    const decreaseTime = () => {
        if (setTimer.seconds > 15) {
            changeTime({
                time: secondsToTime(setTimer.seconds - 15),
                seconds: setTimer.seconds - 15
            });
        }
    }

    const increaseTime = () => {
        changeTime({
            time: secondsToTime(setTimer.seconds + 15),
            seconds: setTimer.seconds + 15
        });
    }
        let timeColor = {
            color: setTimer.timeColor
        };

        return (
            <div className="timer">
                <div className="buttons">
                    <StartButton color="success" startFunc={startTimer}  />
                    <PauseButton color="danger" pauseFunc={pauseTimer}  />
                    <ResetButton color="warning" resetFunc={resetTimer}  />
                </div>
                {/*<audio id="timeSound" src={timeSound}></audio>*/}
                {/*<audio id="timeSoundDanger" src={timeSoundDanger}></audio>*/}
                <div className="flip-container" style={timeColor}>
                    <div className="time-control" onClick={decreaseTime}>-</div>
                    <div className="flip-item">
                        <div className="digit">{timerShow.time.m[0]}</div>
                    </div>
                    <div className="flip-item">
                        <div className="digit">{timerShow.time.m[1]}</div>
                    </div>
                    <div className="ticker">:</div>
                    <div className="flip-item">
                        <div className="digit">{timerShow.time.s[0]}</div>
                    </div>
                    <div className="flip-item">
                        <div className="digit">{timerShow.time.s[1]}</div>
                    </div>
                    <div className="time-control" onClick={increaseTime}>+</div>
                </div>
            </div>
        );
}

export default Timer;
