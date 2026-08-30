"use client";
import { workouts } from "@/data/workouts";
import WorkoutCard from "@/components/WorkoutCard";
import { WorkoutSelectionProps } from "@/types/types";
import { gsap } from "@/utils/gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const WorkoutSelection = ({ handleClick }: WorkoutSelectionProps) => {

  const workoutCardContainerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".workout-card",
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
    },
    { scope: workoutCardContainerRef },
  );

  return (
    <div className="h-auto md:h-full flex flex-col mb-8 items-center">
      <h2 className="text-end font-oswald text-[#222c33] text-xl w-[95%] pb-4">
        Choose your workout
      </h2>
      <div
        data-testid="workout-selection"
        className="workout-grid w-[90%] flex justify-center h-full"
        ref={workoutCardContainerRef}
      >
        {workouts &&
          workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              handleClick={handleClick}
            />
          ))}
      </div>
    </div>
  );
};

export default WorkoutSelection;