import { Burger, Logo, WeatherWidget } from "@/components/mod";
import { Fetcher, OpenWeather } from "@/utils/mod";

const { PAGE_TITLE, __NEXT_PRIVATE_ORIGIN, OPENWEATHER_API_KEY } = process.env;

export const Header = async () => {
	const burgerResp = await Fetcher.getData(`${__NEXT_PRIVATE_ORIGIN}/api/json`);

	return (
		<header className="main-header">
			<div className="container flex justify-between items-center h-full">
				<a
					href="/"
					className="flex gap-3 items-center"
				>
					<Logo />
					<p>{PAGE_TITLE}</p>
				</a>
				<div className="flex items-center gap-4">
					<WeatherWidget apiKey={OPENWEATHER_API_KEY as string} />
					<Burger response={burgerResp} />
				</div>
			</div>
		</header>
	);
};
