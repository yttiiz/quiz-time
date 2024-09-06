"use client";

import { ErrorResponseType, SuccessResponseType } from "@/utils/mod";
import { WeatherApiType } from "../mod";
import Image from "next/image";
import { OpenWeather } from "@/utils/mod";
import { useEffect, useState } from "react";

export const WeatherWidget = ({ host }: { host: string | undefined }) => {
	const [isFrenchBrowser, setIsFrenchBrowser] = useState(true);
	const [response, setResponse] = useState<
		SuccessResponseType | ErrorResponseType | null
	>(null);

	useEffect(() => {
		const body = new FormData();
		const retreiveDataFromApi = (body: FormData) => {
			fetch(host + "/api/weather", {
				method: "POST",
				body,
			})
				.then((res) => res.json())
				.then((data) => setResponse(data));
		};

		if (globalThis) {
			if (globalThis.navigator.language) {
				setIsFrenchBrowser(globalThis.navigator.language === "fr-FR");
			}

			if (globalThis.navigator.geolocation) {
				globalThis.navigator.geolocation.getCurrentPosition(
					(data) => {
						const { latitude, longitude } = data.coords;
						body.append("coords", JSON.stringify({ latitude, longitude }));
						retreiveDataFromApi(body);
					},
					(err) => {
						body.append("coords", JSON.stringify({ message: err.message }));
						retreiveDataFromApi(body);
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
			response.data as unknown as WeatherApiType,
		);

		return (
			<div className="main-header-openweather-container flex items-center gap-2">
				<span className="hidden md:block">{location}</span>
				<Image
					src={iconUrl}
					width={30}
					height={30}
					alt="icon details"
					className="main-header-openweather-icon w-[30px] h-auto"
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
