import { ItemsType } from "@/components/mod";
import { ErrorResponseType, Fetcher, SuccessResponseType } from "@yttiiz/utils";

export const Footer = async ({
	response,
	host,
}: {
	response: SuccessResponseType | ErrorResponseType;
	host: string | undefined;
}) => {
	const footeResponse = await Fetcher.postData(
		`${host}/api/json`,
		{
			file: "footer",
		},
		"next",
	);

	let copyrights: string = "copyrights not found";
	let links: ItemsType[] = [];

	if (footeResponse.ok) {
		copyrights = footeResponse.data["copyrights"];
	}

	if (response.ok) {
		links = [...response.data["items"]] as unknown as ItemsType[];
	} else {
		links = [{ textContent: "home", url: "/" }];
	}

	return (
		<footer className="bg-primary-content/10">
			<div className="container grid gap-6 py-6">
				<ul>
					{links.map(({ textContent, url }) => (
						<li key={(Math.random() + 1) * 1000}>
							<a href={url}>{textContent}</a>
						</li>
					))}
				</ul>
				<div className="text-center border-t-2 pt-4 border-primary-content/10">
					<span className="text-primary-content/40">
						{copyrights} {new Date().getUTCFullYear()}
					</span>
				</div>
			</div>
		</footer>
	);
};
