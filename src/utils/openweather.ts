import { WeatherApiType } from "@/components/mod";

export class OpenWeather {
	/**
	 * Converts `kelvin` to `celcius`.
	 * @param temp Temperature in `kelvin`.
	 */
	private static convertKelvinToCelcius(temp: number) {
		return ((temp - 273.15).toFixed(1)) + "°C";
	}

	/**
	 * Returns current temperature.
	 * @param data Temperature details from a specific point.
	 */
	public static getTemperature(data: WeatherApiType) {
		return OpenWeather.convertKelvinToCelcius(data.main.temp);
	}

	/**
	 * Returns `openweathermap` api address according to given parameters.
	 */
	public static getApi({
		latitude,
		longitude,
		apiKey,
	}: {
		latitude: string | number;
		longitude: string | number;
		apiKey: string;
	}) {
		return `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
	}
}
