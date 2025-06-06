declare module "next-pwa" {
	import type { NextConfig } from "next"

	type WithPwa = (
		config: NextConfig & {
			pwa?: {
				dest: string
				disable?: boolean
				register?: boolean
				skipWaiting?: boolean
				[key: string]: unknown
			}
		}
	) => NextConfig

	const withPWA: WithPwa
	export default withPWA
}
