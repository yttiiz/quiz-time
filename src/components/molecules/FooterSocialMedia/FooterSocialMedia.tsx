import { IconGithub, IconGitlab, ItemsType } from "@/components/atoms/mod";

export const FooterSocialMedia = ({
	socialMedia,
}: {
	socialMedia: ItemsType[];
}) => {
	return (
		<>
			<ul className="flex gap-4 justify-center">
				{socialMedia.map(({ textContent, url }) => {
					let icon;

					switch (textContent) {
						case "github": {
							icon = (
								<IconGithub
									variant="primary"
									model="content"
								/>
							);
							break;
						}

						case "gitlab": {
							icon = (
								<IconGitlab
									variant="primary"
									model="content"
								/>
							);
							break;
						}
					}

					return (
						<li key={(Math.random() + 1) * 1000}>
							<a
								href={url}
								target="_blank"
								className="social-media-links flex items-center gap-2"
							>
								{textContent}
								{icon}
							</a>
						</li>
					);
				})}
			</ul>
		</>
	);
};
