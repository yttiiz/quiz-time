import { Cheerio } from "@/utils/mod";

export const AboutDetails = async () => {
	const url = process.env.ABOUT_URL;
	const data = await Cheerio.getAboutDataFrom(url, ".container-fluid");

	if (data) {
		const { fullname, pseudo, description } = data;

    return (
			<>
				<h1 className="mb-6">Qui sommes-nous ?</h1>
				<div className="flex flex-col gap-4">
					<h2>{fullname}</h2>
					<h3>{pseudo}</h3>
					<p>{description}</p>
				</div>
			</>
		);
	}

	return <div>No data</div>;
};
