import { WeatherApiType } from "@/components/mod";

export class OpenWeather {
	/**
	 * Returns icon url according to given `code` parameter.
	 * @param icon icon code.
	 */
	private static getIcon(icon: string) {
		return `https://openweathermap.org/img/wn/${icon}@2x.png`;
	}

	/**
	 * Returns current temperature details.
	 * @param data Temperature details from a specific point.
	 */
	public static getDetails(data: WeatherApiType) {
		const {
			main: { temp },
			weather,
			name,
		} = data;

		return {
			temperature: temp.toFixed(1) + "°C",
			iconUrl: OpenWeather.getIcon(weather[0]["icon"]),
			location: name,
			description: weather[0]["description"],
		};
	}

	/**
	 * Returns `openweathermap` api address according to given parameters.
	 */
	public static getApi({
		latitude,
		longitude,
		apiKey,
		units = "metric",
	}: {
		latitude: string | number;
		longitude: string | number;
		apiKey: string;
		units?: "metric" | "imperial"
	}) {
		return `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
	}
}
