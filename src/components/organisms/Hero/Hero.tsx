import { GetStartedButton } from "@/components/client.mod";
import { Fetcher } from "@yttiiz/utils";

export const Hero = async () => {
	const { APP_URL: host } = process.env;
	const response = await Fetcher.postData<{
		title: string;
		subtitle: string;
		hookContent: string;
	}>(`${host}/api/json`, { file: "hero" }, "next");

	return (
		<section
			id="hero-banner"
			className="hero-quiz"
		>
			<div className="container grid md:py-24 md:px-6 gap-4">
				{response.ok ? (
					<>
						<h1 className="text-center text-secondary-default">
							{response.data.title}
						</h1>
						<h2 className="text-center">{response.data.subtitle}</h2>
						<p className="text-center">{response.data.hookContent}</p>
						<GetStartedButton />
					</>
				) : (
					<h2 className="text-center">Something went wrong !</h2>
				)}
			</div>
		</section>
	);
};
