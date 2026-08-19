"use client";
import { useState } from "react";
import Header from "@/components/Header";
import WorkoutSelection from "@/components/WorkoutSelection";
import ActiveWorkout from "@/components/ActiveWorkout";
import Footer from "@/components/Footer";
import { Workout } from "@/types/workout";

export default function Home() {
  const [startWorkout, setStartWorkout] = useState<boolean>(false);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  const handleStartClick = (workout: Workout): void => {
    setStartWorkout(true);
    setSelectedWorkout(workout);
  };

  const handleGoBackClick = (): void => {
    setStartWorkout(false);
    setSelectedWorkout(null);
  };

  return (
    <div className="flex flex-col">
      <Header />
      {!startWorkout && <WorkoutSelection handleClick={handleStartClick} />}
      {startWorkout && selectedWorkout && (
        <ActiveWorkout workout={selectedWorkout} goBack={handleGoBackClick} />
      )}
      <Footer />
    </div>
  );
}