"use client";
import { useState, useRef } from "react";
import Header from "@/components/Header";
import WorkoutSelection from "@/components/WorkoutSelection";
import ActiveWorkout from "@/components/ActiveWorkout";
import Footer from "@/components/Footer";
import { Workout } from "@/types/types";
import { gsap, Flip } from "@/utils/gsap";
import { useGSAP } from "@gsap/react";

export default function Home() {
  
  gsap.registerPlugin(useGSAP);

  const [startWorkout, setStartWorkout] = useState<boolean>(false);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const cardStateRef = useRef<Flip.FlipState | null>(null);
  const scrollYRef = useRef<number>(0);

  const handleStartClick = (workout: Workout): void => {
    scrollYRef.current = window.scrollY;
    cardStateRef.current = Flip.getState(
      ".workout-card-title, .workout-image, .workout-card",
    );
    setStartWorkout(true);
    setSelectedWorkout(workout);
  };

  useGSAP(
    () => {
      if (!startWorkout || !cardStateRef.current) return;
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollYRef.current);
      });
      const flipTimeline = gsap.timeline();
      if (startWorkout) {
        gsap.set(".workout-card", {
          borderRadius: "16px",
          y: 0,
        });
      }
      flipTimeline.add(
        Flip.from(cardStateRef.current, {
          targets: ".workout-card-title, .workout-image, .workout-card",
          duration: 0.8,
          ease: "power1.in",
          onComplete: () => {
            gsap.to(".workout-card", {
              borderRadius: "0",
              duration: 0.5,
            });
          },
        }),
      );
    },
    { dependencies: [startWorkout, selectedWorkout] },
  );

  const handleGoBackClick = (): void => {
    setStartWorkout(false);
    setSelectedWorkout(null);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden relative">
      <Header />
      <main className="flex flex-col grow min-h-0 overflow-y-auto pt-35">
        {!startWorkout && <WorkoutSelection handleClick={handleStartClick} />}
        {startWorkout && selectedWorkout && (
          <ActiveWorkout workout={selectedWorkout} goBack={handleGoBackClick} />
        )}
      </main>
      <Footer />
    </div>
  );
}