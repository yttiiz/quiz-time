const openWeather = new URL(
  process.env.OPENWEATHER_URL,
);

const news = new URL(
	process.env.RATTRAPAGE_ACTU_URL,
);

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		outputFileTracingIncludes: {
			"/api/json": ["src/data/**"],
			"/api/forgot-password": ["src/logs/**"]
		}
	},
	images: {
		remotePatterns: [
			{
				protocol: openWeather.protocol.slice(0, -1),
				hostname: openWeather.hostname,
				port: openWeather.port,
			},
			{
				protocol: news.protocol.slice(0, -1),
				hostname: news.hostname,
				port: news.port,
			},
		],
	},
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.module.rules.push({
				test: /\.html$/,
				use: "html-loader",
			});
		}

		return config;
	},
};

export default nextConfig;
