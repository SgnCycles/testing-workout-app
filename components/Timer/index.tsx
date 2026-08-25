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
    <div className="min-h-full flex flex-col justify-evenly">
      <CountdownCircleTimer
        key={key}
        isPlaying={workout}
        duration={startTime}
        colors={["#4C956C", "#FBE282", "#F5793A", "#D64545"]}
        colorsTime={[30, 20, 10, 0]}
        onComplete={timerCompleted}
        size={340}
        trailColor="#2F4858"
      >
        {({ remainingTime }) => (
          <span
            className="text-[13rem] font-oswald text-text text-heading"
            data-testid="timer"
            role="timer"
            aria-live="assertive"
          >
            {remainingTime}
          </span>
        )}
      </CountdownCircleTimer>
      <div className="flex justify-between">
        {!workout && !workoutCompleted && (
          <button
            onClick={handleClick}
            className="start-button text-2xl font-oswald text-text text-heading cursor-pointer ml-auto hover:tracking-widest"
          >
            Start
          </button>
        )}
        {workout && (
          <p
            data-testid="cheer"
            className="text-2xl font-oswald text-text text-heading ml-auto"
          >
            Lets go!
          </p>
        )}
        {workoutCompleted && (
          <p className="text-2xl font-oswald text-text text-heading">
            You did it!
          </p>
        )}
        {workoutCompleted && (
          <button
            onClick={handleReset}
            className="restart-button text-2xl font-oswald text-text text-heading cursor-pointer hover:tracking-widest"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default Timer;