import { Burger, Logo, WeatherWidget } from "@/components/mod";
import { Fetcher, OpenWeather } from "@/utils/mod";

const { PAGE_TITLE, __NEXT_PRIVATE_ORIGIN, OPENWEATHER_API_KEY } = process.env;

export const Header = async () => {
	const api = OpenWeather.getApi({
		latitude: 48.849998,
		longitude: 2.48333,
		apiKey: OPENWEATHER_API_KEY as string
	});
	const weatherResp = await Fetcher.getData(api);
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
				<div className="flex gap-4">
					<WeatherWidget response={weatherResp} />
					<Burger response={burgerResp} />
				</div>
			</div>
		</header>
	);
};
