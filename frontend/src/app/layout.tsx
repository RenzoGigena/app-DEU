import "@/app/globals.css"

import type { ReactNode } from "react"
import StickyNavbar from "@/components/stickynavbar"

export const metadata = {
	title: "Balnearios Río de la Plata",
	description: "Explora playas y zonas costeras del sur",
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="es" suppressHydrationWarning>
			<body className="bg-background text-foreground">
				<StickyNavbar />
				<main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
			</body>
		</html>
	)
}
