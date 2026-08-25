"use client";
import { gsap } from "@/utils/gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const Header = () => {

  gsap.registerPlugin(useGSAP);
  const headingRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      document.fonts.ready.then(() => {
        gsap.to("#heading", {
          ease: "power1.inOut",
          opacity: 1,
        });
      });
    },
    { scope: headingRef },
  );

  return (
    <header className="w-full min-h-[10%] pb-4 md:pb-8 p-8" ref={headingRef}>
      <h1
        className="font-anton text-heading text-5xl md:text-[6rem] text-shadow-lg opacity-0 text-center md:text-start"
        id="heading"
      >
        Workout Timer
      </h1>
    </header>
  );
};

export default Header;