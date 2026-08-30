import { ActiveWorkoutProps } from "@/types/types";
import Timer from "../Timer";
import { gsap, SplitText } from "@/utils/gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const ActiveWorkout = ({ workout, goBack }: ActiveWorkoutProps) => {
  
  const activeWorkoutCardRef = useRef<HTMLDivElement | null>(null);
  const homeButtonRef = useRef<HTMLButtonElement | null>(null);

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
            delay: 0.8,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
          },
        );
      }
    },
    { scope: activeWorkoutCardRef },
  );

  useGSAP(
    () => {
      document.fonts.ready.then(() => {
        const button = homeButtonRef.current;
        if (!button) return;
        const split = SplitText.create(".home-button", {
          type: "words",
        });
        const handleHover = () => {
          gsap.fromTo(
            split.words,
            {
              y: 10,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              color: "#fbe282",
              duration: 0.3,
              stagger: 0.5,
              ease: "power2.out",
            },
          );
        };
        const handleLeave = () => {
          gsap.to(split.words, {
            color: "#ffffff",
            duration: 0.3,
            stagger: 0.5,
            ease: "power2.out",
          });
        };
        button.addEventListener("mouseenter", handleHover);
        button.addEventListener("mouseleave", handleLeave);
        return () => {
          button.removeEventListener("mouseenter", handleHover);
          button.removeEventListener("mouseleave", handleLeave);
          split.revert();
        };
      });
    },
    { scope: homeButtonRef },
  );

  return (
    <div className="flex grow mb-10">
      <div
        className="relative w-full bg-background-card flex flex-col justify-between md:mt-8 workout-card"
        ref={activeWorkoutCardRef}
        data-flip-id={`card-${workout.id}`}
      >
        <h3
          className="font-oswald text-6xl text-text-card-primary pl-8 pt-8 text-nowrap workout-card-title"
          data-flip-id={`heading-${workout.id}`}
        >
          {workout.name}
        </h3>
        <div className="flex justify-center items-center active-workout-element">
          <Timer startTime={workout.workTime} />
        </div>
        <button
          onClick={goBack}
          className="text-heading text-center text-lg font-semibold cursor-pointer ml-8 mb-4 w-25 home-button active-workout-element"
          ref={homeButtonRef}
        >
          Go Back
        </button>
        <div className="absolute h-auto w-[30%] flex justify-end right-0 xs:top-0 md:bottom-0 z-20 rounded-xl">
          <img
            className="w-full h-auto rounded-xl object-cover pt-5 pr-5 workout-image"
            src={`/images/${workout.image}`}
            alt={`${workout.name} workout`}
            width={350}
            height={390}
            data-flip-id={`image-${workout.id}`}
          />
        </div>
      </div>
    </div>
  );
};

export default ActiveWorkout;