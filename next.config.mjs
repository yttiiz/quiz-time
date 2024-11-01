const { protocol, hostname, port } = new URL(
  process.env.OPENWEATHER_URL,
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
				protocol: protocol.slice(0, -1),
				hostname,
				port,
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
