"use client";
import { useState, useRef } from "react";
import Header from "@/components/Header";
import WorkoutSelection from "@/components/WorkoutSelection";
import ActiveWorkout from "@/components/ActiveWorkout";
import Footer from "@/components/Footer";
import { Workout } from "@/types/workout";
import { gsap, Flip } from "@/utils/gsap";
import { useGSAP } from "@gsap/react";

export default function Home() {

  gsap.registerPlugin(useGSAP);

  const [startWorkout, setStartWorkout] = useState<boolean>(false);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const cardStateRef = useRef<Flip.FlipState | null>(null);

  const handleStartClick = (workout: Workout): void => {
    cardStateRef.current = Flip.getState(".workout-card-title, .workout-image, .workout-card");
    setStartWorkout(true);
    setSelectedWorkout(workout);
  };

  useGSAP(
    () => {
      if (!cardStateRef.current) return;
      if (startWorkout) {
        Flip.from(cardStateRef.current, {
          targets: ".workout-card-title, .workout-image, .workout-card",
          duration: 0.8,
          ease: "power1.in",
        });
      };
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
      {!startWorkout && <WorkoutSelection handleClick={handleStartClick}/>}
      {startWorkout && selectedWorkout && (
        <ActiveWorkout workout={selectedWorkout} goBack={handleGoBackClick} />
      )}
      <Footer />
    </div>
  );
}