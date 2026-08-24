import { ActiveWorkoutProps } from "@/types/workout";
import Timer from "../Timer";
import { gsap } from "@/utils/gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const ActiveWorkout = ({ workout, goBack }: ActiveWorkoutProps) => {

  const activeWorkoutCardRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!activeWorkoutCardRef.current) return;
      if (activeWorkoutCardRef.current) {
        gsap.fromTo(
          ".active-workout-element",
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            delay: 0.5,
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.out",
          },
        );
      }
    },
    { scope: activeWorkoutCardRef },
  );
  return (
    <div
      className="bg-background-card flex flex-col justify-between grow relative"
      ref={activeWorkoutCardRef}
    >
      <h3
        data-flip-id={`heading-${workout.id}`}
        className="workout-card-title font-oswald text-6xl text-text-card-primary pl-8 pt-8 text-nowrap workout-card-title"
      >
        {workout.name}
      </h3>
      <div className="flex justify-center items-center active-workout-element ">
        <Timer startTime={workout.workTime} />
      </div>
      <button
        onClick={goBack}
        className="cursor-pointer text-text-card-primary active-workout-element text-start pl-8"
      >
        Go Back
      </button>
      <div>
        <img
          className="absolute right-0 bottom-0 z-20 rounded-xl workout-image"
          src={`/images/${workout.image}`}
          alt="workout"
          width={350}
          height={390}
          data-flip-id={`image-${workout.id}`}
        ></img>
      </div>
    </div>
  );
};

export default ActiveWorkout;