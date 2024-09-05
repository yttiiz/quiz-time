"use client";

import { Fetcher } from "@/utils/mod";
import { WeatherApiType } from "../mod";
import Image from "next/image";
import { OpenWeather } from "@/utils/mod";

export const WeatherWidget = async ({ apiKey }: { apiKey: string }) => {
	const api = OpenWeather.getApi({
		latitude: 16.2333,
		longitude: -61.3833,
		apiKey,
	});
	const response = await Fetcher.getData(api);

	if (response && response.ok) {
		const { temperature, iconUrl, location } = OpenWeather.getDetails(
			response.data as unknown as WeatherApiType,
		);

		return (
			<div className="flex items-center gap-2">
				<span className="lg:text-red">{location}</span>
				<Image
					src={iconUrl}
					width={30}
					height={30}
					alt="icon details"
					className="openweather-icon w-[30px] h-auto"
					priority={false}
				/>
				<span>{temperature}</span>
			</div>
		);
	} else return <div>No weather info avaible</div>;
};
