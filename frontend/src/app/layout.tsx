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
			<body className="bg-background text-foreground">
				<AuthProvider>
					<ClientProvider>
						<StickyNavbar />
						{children}
						<Toaster richColors position="top-center" />
					</ClientProvider>
				</AuthProvider>
			</body>
		</html>
	)
}
