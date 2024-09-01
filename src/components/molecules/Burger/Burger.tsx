"use client"

import { Navbar } from "@/components/mod";
import { MouseEvent, useRef } from "react";

export const Burger = () => {
  const line1 = useRef<HTMLSpanElement | null>(null);
	const line2 = useRef<HTMLSpanElement | null>(null);
	const line3 = useRef<HTMLSpanElement | null>(null);

	const animateButton = (event: MouseEvent<HTMLButtonElement>) => {
		if (line1.current && line2.current && line3.current) {
			line1.current.classList.toggle("line-1");
			line2.current.classList.toggle("line-2");
			line3.current.classList.toggle("line-3");
		}
	};

  return (
    <div id="burger">
      <button
        type="button"
        onClick={animateButton}
      >
        <span ref={line1}></span>
        <span ref={line2}></span>
        <span ref={line3}></span>
      </button>
      <Navbar />
    </div>
  );
};