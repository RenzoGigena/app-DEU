const config = {
	content: [
		"./src/app/**/*.{js,ts,jsx,tsx}", // 👈 agrega esta línea
		"./src/components/**/*.{js,ts,jsx,tsx}", // 👈 también esta
		"./src/pages/**/*.{js,ts,jsx,tsx}", // si usás alguna página allí
		"./src/components/*.{js,ts,jsx,tsx}", // 👈 y esta si tenés componentes
	],
	theme: {
		extend: {},
	},
	plugins: [],
}

export default config
