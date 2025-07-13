"use client"

import {
	FontSize,
	ThemeColor,
	useAccessibilityStore,
} from "@/store/accesibilityStore"

import { useEffect } from "react"

export default function ConfigurationPage() {
	const {
		fontSize,
		daltonicMode,
		themeColor,
		setFontSize,
		setDaltonicMode,
		setThemeColor,
	} = useAccessibilityStore()

	const fontSizeMap = {
		small: "14px",
		medium: "16px",
		large: "18px",
	}

	useEffect(() => {
		const html = document.documentElement
		html.style.setProperty("--font-size", fontSizeMap[fontSize])
		html.classList.remove(
			"theme-blue",
			"theme-green",
			"theme-orange",
			"theme-daltonic"
		)
		html.classList.add(daltonicMode ? "theme-daltonic" : `theme-${themeColor}`)
	}, [fontSize, themeColor, daltonicMode])

	return (
		<main
			className="max-w-2xl mx-auto p-6 md:p-10"
			role="main"
			aria-labelledby="configuracion-heading"
		>
			<header className="text-center mb-8 space-y-2">
				<h1
					id="configuracion-heading"
					className="text-4xl font-bold text-primary"
				>
					Configuracion de accesibilidad
				</h1>
				<p
					className="text-muted-foreground text-base max-w-md mx-auto"
					id="configuracion-description"
				>
					Personaliza tu experiencia cambiando el tamaño del texto, el esquema
					de colores y el modo daltónico del sitio.
				</p>
			</header>

			<form className="space-y-8" aria-describedby="configuracion-description">
				{/* Tamaño de fuente */}
				<div>
					<label
						htmlFor="font-size-select"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Tamaño de fuente
					</label>
					<select
						id="font-size-select"
						value={fontSize}
						onChange={(e) => setFontSize(e.target.value as FontSize)}
						className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
					>
						<option value="small">Chico</option>
						<option value="medium">Mediano (recomendado)</option>
						<option value="large">Grande</option>
					</select>
				</div>

				{/* Modo daltónico */}
				<div>
					<label
						htmlFor="daltonic-checkbox"
						className="inline-flex items-center gap-2 text-sm font-medium text-gray-700"
					>
						<input
							id="daltonic-checkbox"
							type="checkbox"
							checked={daltonicMode}
							onChange={(e) => setDaltonicMode(e.target.checked)}
							className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
							aria-describedby="daltonic-description"
						/>
						<span>Activar modo daltónico</span>
					</label>
					<p id="daltonic-description" className="mt-1 text-sm text-gray-500">
						Colores adaptados para usuarios con daltonismo.
					</p>
				</div>

				{/* Selector de tema (solo si no está en modo daltónico) */}
				{!daltonicMode && (
					<div>
						<label
							htmlFor="theme-select"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Color del tema
						</label>
						<select
							id="theme-select"
							value={themeColor}
							onChange={(e) => setThemeColor(e.target.value as ThemeColor)}
							className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
						>
							<option value="blue">Azul</option>
							<option value="green">Verde</option>
							<option value="orange">Naranja</option>
						</select>
					</div>
				)}
			</form>
		</main>
	)
}
