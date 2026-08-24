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
    <header className="w-full min-h-[10%] pt-8 pl-8" ref={headingRef}>
      <h1
        className="font-anton text-heading text-7xl md:text-[150px] text-shadow-lg opacity-0"
        id="heading"
      >
        Workout Timer
      </h1>
    </header>
  );
};

export default Header;