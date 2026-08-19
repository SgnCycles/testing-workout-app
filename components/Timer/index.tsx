"use client";
import { TimerProps } from "@/types/workout";
import { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Timer = ({ startTime }: TimerProps) => {
  const [workout, setWorkout] = useState<boolean>(false);
  const [workoutCompleted, setWorkoutCompleted] = useState<boolean>(false);
  const [key, setKey] = useState<number>(0);

  const handleClick = () => {
    setWorkout(true);
    setWorkoutCompleted(false);
  };

  const timerCompleted = () => {
    setWorkout(false);
    setWorkoutCompleted(true);
  };

  const handleReset = () => {
    setKey((prevKey) => prevKey + 1);
    setWorkout(false);
    setWorkoutCompleted(false);
  };

  return (
    <div>
      <CountdownCircleTimer
        key={key}
        isPlaying={workout}
        duration={startTime}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[7, 5, 2, 0]}
        onComplete={timerCompleted}
        size={340}
      >
        {({ remainingTime }) => (
          <span data-testid="timer" role="timer" aria-live="assertive">
            {remainingTime}
          </span>
        )}
      </CountdownCircleTimer>
      {!workout && !workoutCompleted && (
        <button onClick={handleClick}>Start</button>
      )}
      {workout && <p>Lets go</p>}
      {workoutCompleted && <p>You did it</p>}
      {workoutCompleted && <button onClick={handleReset}>Reset</button>}
    </div>
  );
};

export default Timer;