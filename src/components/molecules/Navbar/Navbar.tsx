/* eslint-disable react/display-name */
import { NavbarItemType, NavbarItem } from "@/components/mod";
import { ForwardedRef, forwardRef } from "react";

export const Navbar = forwardRef(
	(
		{ items }: { items: NavbarItemType[] },
		ref: ForwardedRef<HTMLDivElement | null>,
	) => {
		return (
			<nav
				ref={ref}
				className="none"
			>
				<ul className="bg-primary-content text-primary-default">
					{items.map(({ textContent, url }, index) => (
						<NavbarItem
							key={`${textContent}-${index + 1}`}
							textContent={textContent}
							url={url}
						/>
					))}
				</ul>
			</nav>
		);
	},
);