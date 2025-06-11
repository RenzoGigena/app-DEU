import "@/app/globals.css"
import type { ReactNode } from "react"
import StickyNavbar from "@/components/stickynavbar"
import ClientProvider from "@/app/helpers/ClientProvider"

export const metadata = {
	title: "Balnearios Río de la Plata",
	description: "Explora playas y zonas costeras del sur",
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="es" suppressHydrationWarning>
			<body className="bg-background text-foreground">
				<StickyNavbar />
				<ClientProvider>{children}</ClientProvider>
			</body>
		</html>
	)
}
