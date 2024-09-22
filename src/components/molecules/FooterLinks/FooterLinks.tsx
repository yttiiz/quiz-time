import { ItemType } from "@/components/mod";

export const FooterLinks = ({ links }: { links: ItemType[] }) => {
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
