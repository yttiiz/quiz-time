"use client"

import { Navbar, NavbarItemType } from "@/components/mod";
import { SetterType, store, useHeaderStore } from "@/store/mod";
import { ErrorResponseType, SuccessResponseType } from "@/utils/types";
import { useRef, useEffect, useState } from "react";

export const Burger = ({ response }: { response: SuccessResponseType | ErrorResponseType }) => {
	let items: NavbarItemType[] = [];

	if (response.ok) {
		items = [...response.data as unknown as NavbarItemType[]];

		const [setItems] = store(useHeaderStore, "setItems") as [
			SetterType<NavbarItemType[]>,
		];
	
		setItems(items);
	}

	const line1 = useRef<HTMLSpanElement | null>(null);
	const line2 = useRef<HTMLSpanElement | null>(null);
	const line3 = useRef<HTMLSpanElement | null>(null);
	const navBar = useRef<HTMLDivElement | null>(null);
	const burger = useRef<HTMLDivElement | null>(null);
	const [isNavbarOpen, setIsNavbarOpen] = useState(false);

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

	const handleClickInsideBurgerAndNavigation = () => {
		handleBurgerAndNavigationAnimation();
		setIsNavbarOpen(!isNavbarOpen);
	};

	const handleClickOutsideBurgerAndNavigation = (
		event: globalThis.MouseEvent,
	) => {
		if ((event.target as HTMLElement).closest("#burger")) return;
		if (isNavbarOpen) {
			handleBurgerAndNavigationAnimation();
			setIsNavbarOpen(!isNavbarOpen);
		}
	};

	useEffect(() => {
		const burgerElement = burger.current;

		if (burgerElement) {
			globalThis.addEventListener(
				"click",
				handleClickOutsideBurgerAndNavigation,
			);
		}

		return () => {
			if (burgerElement) {
				globalThis.removeEventListener(
					"click",
					handleClickOutsideBurgerAndNavigation,
				);
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
				className="btn-menu-opener"
				onClick={handleClickInsideBurgerAndNavigation}
			>
				<span ref={line1}></span>
				<span ref={line2}></span>
				<span ref={line3}></span>
			</button>
			<Navbar ref={navBar} />
		</div>
	);
};