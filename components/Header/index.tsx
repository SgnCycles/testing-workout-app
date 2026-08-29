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
    <header
      className="absolute flex justify-center md:justify-start items-center top-0 left-0 w-full z-10 h-35 md:pl-8 md:pt-8"
      ref={headingRef}
    >
      <div className="absolute inset-0 bg-background-transparent backdrop-blur-xs pointer-events-none"></div>
      <h1
        className="font-anton text-heading text-5xl md:text-8xl text-shadow-lg opacity-0 text-center md:text-start absolute z-50"
        id="heading"
      >
        Workout Timer
      </h1>
    </header>
  );
};

export default Header;