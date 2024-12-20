import { FooterLinks, FooterSocialMedia, ItemType } from "@/components/mod";
import { FooterCopyrights } from "@/components/molecules/FooterCopyrights/FooterCopyrights";
import { ErrorResponseType, Fetcher, SuccessResponseType } from "@yttiiz/utils";

export const Footer = async ({
	response,
	host,
}: {
	response: SuccessResponseType<{ items: ItemType[] }> | ErrorResponseType;
	host: string | undefined;
}) => {
	const footerResponse = await Fetcher.postData<{
		copyrights: string;
		socialMedia: (ItemType & {
			media: string;
		})[];
	}>(
		`${host}/api/json`,
		{
			file: "footer",
		},
		"next",
	);

	let copyrights: string = "copyrights not found";
	let socialMedia = [] as ItemType[];
	let links = [];

	if (footerResponse.ok) {
		copyrights = footerResponse.data["copyrights"];
		socialMedia = [...footerResponse.data["socialMedia"]];
	}

	response.ok
		? (links = [...response.data["items"]])
		: (links = [{ textContent: "accueil", url: "/" }]);

	return (
		<footer className="bg-primary-content/10">
			<div className="container grid gap-6 py-6">
				<FooterLinks links={links} />
				<div className="grid gap-2 text-center border-t-2 pt-4 border-primary-content/10">
					<FooterCopyrights copyrights={copyrights} />
					<FooterSocialMedia socialMedia={socialMedia} />
				</div>
			</div>
		</footer>
	);
};
