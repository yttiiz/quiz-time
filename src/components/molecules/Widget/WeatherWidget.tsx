"use client";

import { ErrorResponseType, SuccessResponseType } from "@/utils/mod";
import { WeatherApiType } from "../mod";
import { OpenWeather } from "@/utils/mod";

export const WeatherWidget = ({
	response,
}: {
	response: SuccessResponseType | ErrorResponseType;
}) => {
	const weatherInfo = response.ok
		? OpenWeather.getTemperature(response.data as unknown as WeatherApiType)
		: "No weather info avaible.";

	return <div>{weatherInfo}</div>;
};
