/* eslint-disable react/display-name */
import { Item, NavbarItem } from "@/components/mod";
import { ForwardedRef, forwardRef } from "react";

const items: Item[] = [];

for (let i = 0; i <= 3; i++) {
	items.push({ textContent: "item" + (i + 1), url: "/" });
}

export const Navbar = forwardRef((_, ref: ForwardedRef<HTMLDivElement | null>) => {
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
});