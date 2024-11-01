import { MouseEventHandler } from "react";

type WeatherType = {
	id: number;
	main: string;
	description: string;
	icon: string;
};

/**
 * OpenWeather api model.
 * see exemple here : https://openweathermap.org/current
 */
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
	onCrossButtonClick: MouseEventHandler<HTMLButtonElement>;
	onMainButtonClick?: MouseEventHandler<HTMLButtonElement>;
};

export type QuizItemsPropsType = {
	questions: string[];
	name: string;
	message: string;
	formAction: (payload: FormData) => void;
};

export type FormLoginState = {
	email: string;
	password: string;
};

export type FormSignupState = FormLoginState & {
	firstname: string;
	lastname: string;
};

export type FormPasswordConfim = {
	password: string;
	confirmPassword: string;
};
 
export type FormModifyState = Omit<FormSignupState, "password">;