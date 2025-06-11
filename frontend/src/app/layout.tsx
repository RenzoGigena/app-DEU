import "./globals.css"

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import ModeToggle from "@/components/mode-toggle"

export const metadata = {
	title: "Balnearios Río de la Plata",
	description: "Información de playas y zonas costeras",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="es" suppressHydrationWarning>
			<body className="min-h-screen flex flex-col bg-background text-foreground">
				<header className="w-full border-b bg-card">
					<div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
						<h1 className="text-2xl font-semibold tracking-tight">
							Balnearios Río de la Plata
						</h1>
						<NavigationMenu>
							<NavigationMenuList className="flex gap-4">
								<NavigationMenuItem>
									<Link href="/" legacyBehavior passHref>
										<NavigationMenuLink className="text-sm font-medium hover:underline">
											Bienvenida
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<Link href="/balnearios" legacyBehavior passHref>
										<NavigationMenuLink className="text-sm font-medium hover:underline">
											Balnearios
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<Link href="/unirse" legacyBehavior passHref>
										<NavigationMenuLink className="text-sm font-medium hover:underline">
											Unirse
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>

						<div className="flex items-center gap-2">
							<ModeToggle />
							<Button variant="outline" size="sm">
								Contacto
							</Button>
						</div>
					</div>
				</header>

				<main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
					{children}
				</main>
			</body>
		</html>
	)
}
