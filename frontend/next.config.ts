import { Configuration } from "webpack"
import { RemotePattern } from "next/dist/shared/lib/image-config"
import path from "path"
import withPWA from "next-pwa"

const isDev = process.env.NODE_ENV === "development"

const remotePatterns: RemotePattern[] = [
	{
		protocol: "https",
		hostname: "**",
		pathname: "/**",
	},
	{
		protocol: "http",
		hostname: "**",
		pathname: "/**",
	},
]

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
		remotePatterns,
	},
}

export default withPWA({
	dest: "public",
	disable: isDev,
	register: true,
	skipWaiting: true,
})(nextConfig)
