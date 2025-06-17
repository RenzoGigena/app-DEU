import "@/app/globals.css"

import { AuthProvider } from "../helpers/AuthProvider"
import ClientProvider from "@/helpers/ClientProvider"
import type { ReactNode } from "react"
import StickyNavbar from "@/components/stickynavbar"
import { Toaster } from "@/components/ui/sonner"

export const metadata = {
	title: "Balnearios Río de la Plata",
	description: "Explora playas y zonas costeras del sur",
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="es" suppressHydrationWarning>
			<head>
				<link rel="manifest" href="/manifest.json" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<link rel="apple-touch-icon" href="/icons/icon-192.png" />
			</head>
			<body className="bg-background text-foreground">
				<AuthProvider>
					<ClientProvider>
						<StickyNavbar />
						{children}
						<Toaster richColors position="top-center" />
					</ClientProvider>
				</AuthProvider>

				<svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
					<filter id="daltonic-filter">
						<feColorMatrix
							type="matrix"
							values="
							0.625, 0.7,   0,   0, 0,
							0.375, 0.3,   0,   0, 0,
							0,     0,     1,   0, 0,
							0,     0,     0,   1, 0
						"
						/>
					</filter>
				</svg>
			</body>
		</html>
	)
}
