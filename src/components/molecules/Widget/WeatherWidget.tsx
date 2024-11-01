"use client";

import { ErrorResponseType, Fetcher, SuccessResponseType } from "@yttiiz/utils";
import { WeatherApiType } from "../mod";
import Image from "next/image";
import { OpenWeather } from "@/utils/mod";
import { SetStateAction, useEffect, useState } from "react";

type ResponseType = SuccessResponseType<WeatherApiType> | ErrorResponseType | null;

export const WeatherWidget = ({ host }: { host: string | undefined }) => {
	const [isFrenchBrowser, setIsFrenchBrowser] = useState(true);
	const [response, setResponse] = useState<ResponseType>(null);

	const retreiveDataFromApi = (hostUrl: string, body: string) => {
		Fetcher.postData<SetStateAction<ResponseType>>(
			hostUrl + "/api/weather",
			body,
			"next",
		)
			.then((res) => (res.ok ? res.data : null))
			.then((res) => setResponse(res));
	};
	
	useEffect(() => {
		if (globalThis) {
			if (globalThis.navigator.language) {
				setIsFrenchBrowser(globalThis.navigator.language === "fr-FR");
			}

			if (globalThis.navigator.geolocation && host) {
				globalThis.navigator.geolocation.getCurrentPosition(
					(data) => {
						const { latitude, longitude } = data.coords;
						retreiveDataFromApi(host, JSON.stringify({ latitude, longitude }));
					},
					(err) => {
						retreiveDataFromApi(host, JSON.stringify({ message: err.message }));
					},
				);
			}
		}
	}, [setResponse, setIsFrenchBrowser, host]);

	if (!response)
		return (
			<div className="main-header-openweather-container hidden md:block">
				{isFrenchBrowser ? "Chargement" : "Waiting"}...
			</div>
		);
	if (response.ok) {
		const { temperature, iconUrl, location } = OpenWeather.getDetails(
			response.data,
		);

		return (
			<div className="main-header-openweather-container hidden md:flex items-center gap-2">
				<span>{location}</span>
				<Image
					src={iconUrl}
					width={30}
					height={30}
					alt="icon details"
					className="main-header-openweather-icon w-[1.875rem] h-auto"
					priority={false}
				/>
				<span>{temperature}</span>
			</div>
		);
	} else
		return (
			<div className="main-header-openweather-container hidden md:block">
				{isFrenchBrowser
					? "Données non disponibles"
					: "No weather info avaible"}
			</div>
		);
};
