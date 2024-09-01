import { Item, NavbarItem } from "@/components/mod";

const items: Item[] = [];

for (let i = 0; i <= 3; i++) {
	items.push({ textContent: "item" + (i + 1), url: "/" });
}

export const Navbar = () => {
	return (
		<nav className="header-navbar">
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
};
