import React from 'react';
import { useCountdown } from './useCountdown';
import './display.scss';

export const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <span className='expired'>Time expired</span>;
  } else {
    return (
        // <>{days} days :{hours} hours :{minutes} minutes:{seconds} seconds</>
        <div className="display">
            <div className="rs">
                <div className="time">
                    <span>{days}</span>
                    <span>DD</span>
                </div> 
                <div className="colon">
                    :
                </div>
                <div className="time">
                    <span>{hours}</span>
                    <span>HH</span>
                </div> 
                <div className="colon">
                    :
                </div>
                <div className="time">
                    <span>{minutes}</span>
                    <span>mm</span>
                </div>
                <div className="colon">
                    :
                </div>
                <div className="time">
                    <span>{seconds}</span>
                    <span>ss</span>
                </div>
            </div>
        </div>
    );
  }
};
