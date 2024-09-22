"use client";

/* eslint-disable react/display-name */
import { NavbarItem } from "@/components/mod";
import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import { useHeaderStore } from "@/store/mod";

export const Navbar = forwardRef(
	(_, ref: ForwardedRef<HTMLDivElement | null>) => {
		const items = useHeaderStore((state) => state.items);

		useEffect(() => {
			if (globalThis.localStorage.getItem("userFirstname")) {
				const index = items.findIndex(
					(item) => item.textContent === "Connexion",
				);

				items[index] = { textContent: "Déconnexion", url: "", isFormConnexion: true };
			}
		}, [items]);

		return (
			<nav
				ref={ref}
				className="nav none"
			>
				<svg
					height="16"
					width="22"
					xmlns="http://www.w3.org/2000/svg"
				>
					<polygon points="0,16 8,0 22,16" />
				</svg>
				<ul>
					{items.map(({ textContent, url, isFormConnexion }, index) => (
						<NavbarItem
							key={`${textContent}-${index + 1}`}
							textContent={textContent}
							isFormConnexion={isFormConnexion}
							url={url}
						/>
					))}
				</ul>
			</nav>
		);
	},
);
