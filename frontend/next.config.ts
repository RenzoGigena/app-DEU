import { Configuration } from "webpack"
import path from "path"
import withPWA from "next-pwa"

const isDev = process.env.NODE_ENV === "development"

const nextConfig = {
	reactStrictMode: true,
	webpack(config: Configuration) {
		if (config.resolve) {
			config.resolve.alias = {
				...(config.resolve.alias || {}),
				"@": path.resolve(__dirname, "src"),
			}
			config.resolve.extensions = [".tsx", ".ts", ".js", ".jsx"]
		}
		return config
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "imgs.search.brave.com",
			},
		],
	},
}

export default withPWA({
	dest: "public",
	disable: isDev,
	register: true,
	skipWaiting: true,
})(nextConfig)
