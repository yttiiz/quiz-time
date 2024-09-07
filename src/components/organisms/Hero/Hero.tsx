import { GetStartedButton } from "@/components/mod";
import { Fetcher } from "@/utils/mod";

export const Hero = async () => {
	const { __NEXT_PRIVATE_ORIGIN: host } = process.env;
	const response = await Fetcher.postData(`${host}/api/json`, { file: "hero" });

	return (
		<div id="hero-banner">
			<div className="container grid py-24 px-6 gap-4">
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
		</div>
	);
};
