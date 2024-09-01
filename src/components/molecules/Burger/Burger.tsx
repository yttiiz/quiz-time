"use client"

import { Navbar } from "@/components/mod";
import { useRef, useEffect, MouseEvent } from "react";

export const Burger = () => {
	const line1 = useRef<HTMLSpanElement | null>(null);
	const line2 = useRef<HTMLSpanElement | null>(null);
	const line3 = useRef<HTMLSpanElement | null>(null);
	const navBar = useRef<HTMLDivElement | null>(null);
	const burger = useRef<HTMLDivElement | null>(null);

	const handleBurgerAndNavigationAnimation = () => {
		if (line1.current && line2.current && line3.current) {
			line1.current.classList.toggle("line-1");
			line2.current.classList.toggle("line-2");
			line3.current.classList.toggle("line-3");
		}

		if (navBar.current) {
			navBar.current.classList.toggle("none");
		}
	};

	const handleClickOutsideBurgerAndNavigation = (event: MouseEvent) => {
		if (event && (event.currentTarget as Element)?.closest("#burger")) {
			return;
		} else if (navBar.current && !navBar.current.classList.contains("none")) {
			handleBurgerAndNavigationAnimation();
		}
	};
	
	useEffect(() => {
		const burgerElement = burger.current;
		const getBody = (element: Element | null) => element?.closest("body");

		if (burgerElement) {
			getBody(burgerElement)?.addEventListener("click", handleClickOutsideBurgerAndNavigation);
		}
		
		return () => {
			if (burgerElement) {
				getBody(burgerElement)?.removeEventListener("click", handleClickOutsideBurgerAndNavigation);
			}
		};
	});

	return (
		<div
			id="burger"
			ref={burger}
		>
			<button
				type="button"
				onClick={handleBurgerAndNavigationAnimation}
			>
				<span ref={line1}></span>
				<span ref={line2}></span>
				<span ref={line3}></span>
			</button>
			<Navbar ref={navBar} />
		</div>
	);
};