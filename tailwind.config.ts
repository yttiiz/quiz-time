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
				content: "#FFFFFF",
				default: "#881600",
				alt: "#701401",
			},
			secondary: {
				content: "#000000",
				default: "#E3E36A",
				alt: "#C7C760",
			},
			alert: {
				content: "#000000",
				default: "#CBFF8C",
				alt: "#B8E680",
			},
		},
	},
	plugins: [],
};
export default config;
