"use client";

import { ItemType } from "@/components/mod";
import { useUserSession } from "@/store/mod";

export const FooterLinks = ({ links }: { links: ItemType[] }) => {
	const session = useUserSession((state) => state.session);

	// If user is connected, remove 'connexion' item in the list.
	if (session) {
		links = links.filter(link => link.textContent !== "Connexion")
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
