import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
		colors: {
			primary: {
				default: "rgb(var(--primary-default) / <alpha-value>)",
				content: "rgb(var(--primary-content) / <alpha-value>)",
				alt: "rgb(var(--primary-alt) / <alpha-value>)",
			},
			secondary: {
				default: "rgb(var(--secondary-default) / <alpha-value>)",
				content: "rgb(var(--secondary-content) / <alpha-value>)",
				alt: "rgb(var(--secondary-alt) / <alpha-value>)",
			},
			alert: {
				default: "rgb(var(--alert-default) / <alpha-value>)",
				content: "rgb(var(--alert-content) / <alpha-value>)",
				alt: "rgb(var(--alert-alt) / <alpha-value>)",
			},
		},
	},
	plugins: [],
};

export default config;
