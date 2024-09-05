const { protocol, hostname, port } = new URL(
  process.env.OPENWEATHER_URL,
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
		remotePatterns: [
			{
				protocol: protocol.slice(0, -1),
				hostname,
				port,
			},
		],
	},
};

export default nextConfig;
