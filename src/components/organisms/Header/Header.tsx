import { Burger, Logo, WeatherWidget } from "@/components/mod";
import { Fetcher } from "@/utils/mod";

const { PAGE_TITLE, __NEXT_PRIVATE_ORIGIN, OPENWEATHER_API_KEY } = process.env;
const FONTENAY = {
	lon: 2.48333,
	lat: 48.849998,
};

export const Header = async () => {
	const { lat, lon } = FONTENAY;
	const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`;
	const weatherResp = await Fetcher.getData(api);
	const burgerResp = await Fetcher.getData(
		`${__NEXT_PRIVATE_ORIGIN}//api/json`,
	);

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
