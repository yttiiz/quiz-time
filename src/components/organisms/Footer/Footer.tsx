import { IconGithub } from "@/components/atoms/Icons/Github";
import { IconGitlab } from "@/components/atoms/Icons/Gitlab";
import { ItemsType } from "@/components/mod";
import { ErrorResponseType, Fetcher, SuccessResponseType } from "@yttiiz/utils";

export const Footer = async ({
	response,
	host,
}: {
	response: SuccessResponseType | ErrorResponseType;
	host: string | undefined;
}) => {
	const footerResponse = await Fetcher.postData(
		`${host}/api/json`,
		{
			file: "footer",
		},
		"next",
	);

	let copyrights: string = "copyrights not found";
	let socialMedia = [] as (ItemsType & { media: string })[];
	let links = [];

	if (footerResponse.ok) {
		copyrights = footerResponse.data["copyrights"];
		socialMedia = [
			...(footerResponse.data["socialMedia"] as unknown as (ItemsType & {
				media: string;
			})[]),
		];
	}

	response.ok
		? (links = [...response.data["items"]] as unknown as ItemsType[])
		: (links = [{ textContent: "accueil", url: "/" }]);

	return (
		<footer className="bg-primary-content/10">
			<div className="container grid gap-6 py-6">
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
				<div className="grid gap-2 text-center border-t-2 pt-4 border-primary-content/10">
					<span className="text-primary-content/40">
						{copyrights}{" "}
						{copyrights.includes("not found")
							? ""
							: new Date().getUTCFullYear()}
					</span>
					<ul className="flex gap-4 justify-center">
						{socialMedia.map(({ media, url }) => {
							let icon;

							switch (media) {
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
										{media}
										{icon}
									</a>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</footer>
	);
};
