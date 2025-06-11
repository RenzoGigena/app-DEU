import type { Config } from "tailwindcss"

const config: Config = {
	content: [
		"./src/app/**/*.{js,ts,jsx,tsx}", // 👈 agrega esta línea
		"./src/components/**/*.{js,ts,jsx,tsx}", // 👈 también esta
		"./src/pages/**/*.{js,ts,jsx,tsx}", // si usás alguna página allí
	],
	theme: {
		extend: {},
	},
	plugins: [],
}

export default config
