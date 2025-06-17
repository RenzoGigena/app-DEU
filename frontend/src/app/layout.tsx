import "@/app/globals.css"

import { AuthProvider } from "@/helpers/AuthProvider"
import ClientProvider from "@/helpers/ClientProvider"
import type { ReactNode } from "react"
import StickyNavbar from "@/components/stickynavbar"
import { Toaster } from "@/components/ui/sonner"
import "leaflet/dist/leaflet.css";

/* --- metadatos opcionales (App Router) --- */
export const metadata = {
	title: "Balnearios Río de la Plata",
	description: "Explora playas y zonas costeras del sur",
	manifest: "/manifest.json",
	icons: {
		icon: [
			{ url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
			{ url: "/favicon.svg", type: "image/svg+xml" },
		],
		apple: "/icons/icon-192x192.png",
	},
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="es" suppressHydrationWarning>
			<head>
				{/* Manifest PWA */}
				<link rel="manifest" href="/manifest.json" />

				{/* Favicon (multi-formato) */}
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />

				{/* Ícono Apple / Android */}
				<link rel="apple-touch-icon" href="/icons/icon-192x192.png" />

				{/* Colores de tema / barra de estado */}
				<meta name="theme-color" content="#2B2645" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
			</head>

			<body className="bg-background text-foreground">
				<AuthProvider>
					<ClientProvider>
						<StickyNavbar />
						{children}
						<Toaster richColors position="top-center" />
					</ClientProvider>
				</AuthProvider>

				{/* Filtro daltónico opcional (no cambia) */}
				<svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
					<filter id="daltonic-filter">
						<feColorMatrix
							type="matrix"
							values="
                0.625 0.7   0   0 0
                0.375 0.3   0   0 0
                0      0    1   0 0
                0      0    0   1 0"
						/>
					</filter>
				</svg>
			</body>
		</html>
	)
}
