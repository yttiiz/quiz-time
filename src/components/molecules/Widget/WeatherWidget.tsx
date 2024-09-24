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

	useEffect(() => {
		const retreiveDataFromApi = (body: string | Record<string, string>) => {
			Fetcher.postData<SetStateAction<ResponseType>>(
				host + "/api/weather",
				body,
				"next",
			)
				.then((res) => (res.ok ? res.data : null))
				.then((res) => setResponse(res));
		};

		if (globalThis) {
			if (globalThis.navigator.language) {
				setIsFrenchBrowser(globalThis.navigator.language === "fr-FR");
			}

			if (globalThis.navigator.geolocation) {
				globalThis.navigator.geolocation.getCurrentPosition(
					(data) => {
						const { latitude, longitude } = data.coords;
						retreiveDataFromApi(JSON.stringify({ latitude, longitude }));
					},
					(err) => {
						retreiveDataFromApi(JSON.stringify({ message: err.message }));
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
			<div className="main-header-openweather-container flex items-center gap-2">
				<span className="hidden md:block">{location}</span>
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
