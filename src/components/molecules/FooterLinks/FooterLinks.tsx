"use client";

import { ItemType } from "@/components/mod";
import { useUserDataStore } from "@/store/mod";

export const FooterLinks = ({ links }: { links: ItemType[] }) => {
	const firstname = useUserDataStore((state) => state.firstname);

	// If user is connected, remove 'connexion' item in the list.
	if (firstname) {
		links = links.filter(links => links.textContent !== "Connexion")
	}

	return (
		<div>
			<h3 className="mb-2">Catégories</h3>
			<ul>
				{links.map(({ textContent, url }) => (
					<li key={(Math.random() + 1) * 1000}>
						<a
							href={url}
							className="hover:text-alert-default"
						>
							{textContent}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};
