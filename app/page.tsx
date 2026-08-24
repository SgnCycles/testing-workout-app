"use client";
import { useState, useRef } from "react";
import Header from "@/components/Header";
import WorkoutSelection from "@/components/WorkoutSelection";
import ActiveWorkout from "@/components/ActiveWorkout";
import Footer from "@/components/Footer";
import { Workout } from "@/types/workout";
import { gsap, Flip } from "@/utils/gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Home() {

  const [startWorkout, setStartWorkout] = useState<boolean>(false);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const cardState = useRef<Flip.FlipState | null>(null);

  const handleStartClick = (workout: Workout): void => {
    cardState.current = Flip.getState(".workout-card-title, .workout-image");
    setStartWorkout(true);
    setSelectedWorkout(workout);
  };

  useGSAP(
    () => {
      if (!cardState.current) return;
      if (startWorkout) {
        Flip.from(cardState.current, {
          targets: ".workout-card-title, .workout-image",
          duration: 0.5,
          ease: "power2.in",
        });
      }
    },
    { dependencies: [startWorkout] },
  );

  const handleGoBackClick = (): void => {
    setStartWorkout(false);
    setSelectedWorkout(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {!startWorkout && <WorkoutSelection handleClick={handleStartClick} />}
      {startWorkout && selectedWorkout && (
        <ActiveWorkout workout={selectedWorkout} goBack={handleGoBackClick} />
      )}
      <Footer />
    </div>
  );
}
