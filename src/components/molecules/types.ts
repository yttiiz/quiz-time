/**
 * OpenWeather api model.
 * see exemple here : https://openweathermap.org/current
 */

import { MouseEventHandler } from "react";

type WeatherType = {
	id: number;
	main: string;
	description: string;
	icon: string;
};

export type WeatherApiType = {
	coord: {
		lon: number;
		lat: number;
	};
	weather: WeatherType[];
	base: string;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
		sea_level: number;
		grnd_level: number;
	};
	visibility: number;
	wind: {
		speed: number;
		deg: number;
		gust: number;
	};
	rain: {
		"1h": number;
	};
	clouds: {
		all: number;
	};
	dt: number;
	sys: {
		type: number;
		id: number;
		country: string;
		sunrise: number;
		sunset: number;
	};
	timezone: number;
	id: number;
	name: string;
	cod: number;
};

export type DialogHeaderPropsType = {
	title: string;
	details?: string;
};

export type DialogMainPropsType = {
	paragraph: string;
	buttons?: string[];
};

export type DialogPropsType = {
	header: DialogHeaderPropsType;
	main: DialogMainPropsType;
	onClick: MouseEventHandler<HTMLButtonElement>;
};

export type QuizItemsPropsType = {
	questions: string[];
	name: string;
	message: string;
	formAction: (payload: FormData) => void;
}