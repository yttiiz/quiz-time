"use client";

import { ErrorResponseType, SuccessResponseType } from "@/utils/mod";

export const WeatherWidget = ({
	response,
}: {
	response: SuccessResponseType | ErrorResponseType;
}) => {
	let weatherInfo = "";

	if (response.ok) {
		weatherInfo = (response.data["main"] as unknown as { temp: string })[
			"temp"
		];
	} else weatherInfo = "No weather info"

	return <div>{weatherInfo}</div>;
};
