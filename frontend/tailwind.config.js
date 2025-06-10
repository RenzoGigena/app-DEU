/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx}", // Includes src/components/ui/
		"./pages/**/*.{js,ts,jsx,tsx}", // Includes pages/
	],
	theme: {
		extend: {}, // Extend Tailwind theme (optional, add customizations here)
	},
	plugins: [], // Add Tailwind plugins if needed
}
