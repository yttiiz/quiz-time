import { Cheerio } from "@/utils/mod";

export const AboutDetails = async () => {
	const url = process.env.ABOUT_URL;
	const data = await Cheerio.getAboutDataFrom(url, ".container-fluid");

	if (data) {
		const { fullname, pseudo, description } = data;

    return (
			<>
				<h1 className="mb-6">Qui sommes-nous ?</h1>
				<div className="flex flex-col p-6 gap-2 border-2 border-primary-content/10 rounded-2xl">
					<h2>{pseudo}</h2>
					<h3>{fullname}</h3>
					<p>{description}</p>
				</div>
			</>
		);
	}

	return <div>No data</div>;
};
