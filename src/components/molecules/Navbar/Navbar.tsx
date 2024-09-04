/* eslint-disable react/display-name */
import { NavbarItem } from "@/components/mod";
import { ForwardedRef, forwardRef } from "react";
import { useHeaderStore } from "@/store/mod";

export const Navbar = forwardRef(
	(
		_,
		ref: ForwardedRef<HTMLDivElement | null>,
	) => {
		const items = useHeaderStore((state) => state.items);
		
		return (
			<nav
				ref={ref}
				className="nav none"
			>
				<ul>
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