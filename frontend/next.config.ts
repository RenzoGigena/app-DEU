const withPWA = require("next-pwa")({
	dest: "public",
	disable: process.env.NODE_ENV === "development",
	register: true,
	skipWaiting: true,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// Add Webpack alias for @
	webpack(config) {
		config.resolve.alias["@"] = require("path").resolve(__dirname, "src")
		return config
	},
}

module.exports = withPWA(nextConfig)
